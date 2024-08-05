import { OAuth2Client } from 'google-auth-library';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';


const client = new OAuth2Client();
export const verifyGoogleToken = async (req: Request, res:Response, next: NextFunction) => {
	try {
		const token = req.body['idToken'];
		const ticket = await client.verifyIdToken({
			idToken: token,
			audience: process.env.GOOGLE_ID,
		});
		const payload = ticket.getPayload();
		if(payload){
			console.log(`[API Getway] Authentication Succeed. token ${token.slice(0,10)}...`);
			return next();
		}
		res.status(401).send('[API Getway] Unable to Authenticate token');
	} catch (error) {
		console.log(`[API Getway] Authenticate Failed. token ${req.body['idToken']?.slice(0,10)}...`);
		res.status(500).send('[API Getway] Something Went Wrong Authenticate failed');
	}
};


export const verifyJWTToken = async (req: Request, res:Response, next: NextFunction) => {
	try {
		const token = req.body['access_token'];
		const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
		if(decoded){
			console.log(`[API Getway] JWT Token verified successfully. token ${token.slice(0,10)}...`);
			return next();
		}
		res.status(401).send('[API Getway] Unable to verify token');
	} catch (error) {
		console.log(`[API Getway] Token verification Failed. token ${req.body['idToken']?.slice(0,10)}...`);
		res.status(500).send('[API Getway] Something Went Wrong. Token Verification failed');
	}
};
