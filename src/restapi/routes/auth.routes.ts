/* eslint-disable indent */
import { Router } from 'express';
export const authRouter = Router();
import { api } from '../api.service';
import * as jwt from 'jsonwebtoken';
import { v4 } from 'uuid';
import { verifyGoogleToken } from '../middlewares/auth.middleware';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require('bcrypt');

const saltRounds = 10;

authRouter.post('/login',  async(req, res)=>{
    
	try {
        
		const user = req.body;
		const id = req.query['id'];
		console.log('[API Getway]  Server recieved POST /auth/login request');
        
		const result = await api.postRequest('/auth/login', {username:user['username']});
		if(result.status === 201){
			const match = await bcrypt.compare(user['password'], result.data.password);
			return match ?
			res.status(200).send(result?.data) :
			res.status(401).send(result?.data);
		}
		res.status(result?.status).send(result?.data);
		console.log(`[API Getway]  Server responde with ${result?.status} for /auth?id=${id} POST request`);
        
	} catch (error) {
		res.status(error?.response?.status || 500).send(`[API Getway]  error: ${error.response?.data}`);
		console.log(`[API Getway]  Server responde ${error?.response?.status}.  ${error.response?.data} for ${error?.request?.path} POST request`);
	}
});

authRouter.post('/login/google',  verifyGoogleToken, async(req, res)=>{
    
	try {
        
		let user = req.body;
		const _id = req.query['id'];
		console.log(`[API Getway]  Server recieved POST /login/google?id=${_id} request`);

		const access_token = user.idToken;
		delete user['idToken'];
		const refresh_token = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '3d'});
		user = {
			...user,
			access_token,
			refresh_token,
			id: _id,
		};
		const result = await api.postRequest(`auth/login/google?id=${_id}`, user);
		console.log(`[API Getway]  Server responde with ${result?.status} for /login/google?id=${_id} POST request`);
		return result.status === 201 ?
				res.status(201).send(user):
				res.status(result.status).send({data:result.data});
        
	} catch (error) {
		res.status(error?.response?.status || 500).send(`[API Getway]  error: ${error.response?.data}`);
		console.log(`[API Getway]  Server responde ${error?.response?.status}.  ${error.response?.data} for ${error?.request?.path} POST request`);
	}
});

authRouter.post('/register',  async(req, res)=>{
    
	try {
        
		const user = req.body;
		console.log('[API Getway]  Server recieved POST /auth/register request');
		const refresh_token = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '3d'});
		const access_token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '15m'});
		const _id=v4();
		user['password'] = await bcrypt.hash(user['password'], saltRounds);
		const result = await api.postRequest(`/auth/register?id=${_id}`, {
			...user,
			access_token,
			refresh_token,
			_id
		});

		console.log(`[API Getway] Server responde with ${result?.status} for /auth?id=${_id} POST request`);
		res.status(result?.status).send({message: `[API Getway]: user ${_id} logged in successfully`,
			access_token,
			refresh_token
		});
        
	} catch (error) {
		res.status(error?.response?.status || 500).send(`[API Getway]  error: ${error.response?.data}`);
		console.log(`[API Getway]  Server responde ${error?.response?.status}.  ${error.response?.data} for ${error?.request?.path} POST request`);
	}
});
