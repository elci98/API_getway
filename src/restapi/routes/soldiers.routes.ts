import { Router } from 'express';
export const soldiersRouter = Router();
import { api } from '../api.service';



soldiersRouter.get('/', async (req, res)=>{

	try {

		const id = req.query['id'];
		console.log(`[API Getway]  Server recieved GET /soldiers?id=${id} request`);

		const result = await api.getRequest(`/soldiers?id=${id}`);
		res.status(result?.status).send(result?.data);
		console.log(`[API Getway]  Server responde with ${result?.status} for /soldiers?id=${id} GET request`);

	} catch (error) {
		res.status(error?.response?.status || 500).send(`[API Getway]  src/restapi/routes/soldiers.routes.tserror: ${error.response?.data}`);
		console.log(`[API Getway]  Server responde ${error?.response?.status}.  ${error.response?.data} for ${error?.request?.path} GET request`);
	}
});

soldiersRouter.post('/',  async(req, res)=>{
    
	try {
        
		const body = req.body;
		const id = req.query['id'];
		console.log(`[API Getway]  Server recieved POST /soldiers?id=${id} request`);
        
		const result = await api.postRequest(`/soldiers?id=${id}`, body);
		res.status(result?.status).send(result?.data);
		console.log(`[API Getway]  Server responde with ${result?.status} for /soldiers?id=${id} POST request`);
        
	} catch (error) {
		res.status(error?.response?.status || 500).send(`[API Getway]  error: ${error.response?.data}`);
		console.log(`[API Getway]  Server responde ${error?.response?.status}.  ${error.response?.data} for ${error?.request?.path} POST request`);
	}
});

soldiersRouter.put('/',  async (req, res)=>{
    
	try {
		const body = req.body;
		const id = req.query['id'];
		console.log(`[API Getway]  Server recieved PUT /soldiers?id=${id} request`);

		const result = await api.putRequest(`/soldiers?id=${id}`, body);
		res.status(result?.status).send(result?.data);
		console.log(`[API Getway]  Server responde with ${result?.status} for /soldiers?id=${id} PUT request`);
        
	} catch (error) {
		res.status(error?.response?.status || 500).send(`[API Getway]  error: ${error.response?.data}`);
		console.log(`[API Getway]  Server responde ${error?.response?.status}.  ${error.response?.data} for ${error?.request?.path} PUT request`);
	}
});

soldiersRouter.delete('/', async (req, res)=>{
	try {
        
		const id = req.query['id'];
		console.log(`[API Getway]  Server recieved DELETE /soldiers?id=${id} request`);
        
		const result = await api.deleteRequest(`/soldiers?id=${id}`);
		res.status(result?.status).send(result?.data);
		console.log(`[API Getway]  Server responde with ${result?.status} for /soldiers?id=${id} DELETE request`);

	} catch (error) {
		res.status(error?.response?.status || 500).send(`[API Getway]  error: ${error.response?.data}`);
		console.log(`[API Getway]  Server responde ${error?.response?.status}.  ${error.response?.data} for ${error?.request?.path} DELETE request`);
	}

});