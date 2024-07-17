import { Router } from 'express';
export const listsRouter = Router();
import { api } from '../api.service';



listsRouter.get('/', async (req, res)=>{

	try {

		const id = req.query['id'];
		console.log(`[API Getway]  Server recieved GET /lists?id=${id} request`);

		const result = await api.getRequest(`/lists?id=${id}`);
		res.status(result?.status).send(result?.data);
		console.log(`[API Getway]  Server responde with ${result?.status} for /lists?id=${id} GET request`);

	} catch (error) {
		res.status(error?.response?.status || 500).send(`[API Getway]  src/restapi/routes/lists.routes.tserror: ${error.response?.data}`);
		console.log(`[API Getway]  Server responde ${error?.response?.status}.  ${error.response?.data} for ${error?.request?.path} GET request`);
	}
});

listsRouter.post('/',  async(req, res)=>{
    
	try {
        
		const body = req.body;
		const id = req.query['id'];
		console.log(`[API Getway]  Server recieved POST /lists?id=${id} request`);
        
		const result = await api.postRequest(`/lists?id=${id}`, body);
		res.status(result?.status).send(result?.data);
		console.log(`[API Getway]  Server responde with ${result?.status} for /lists?id=${id} POST request`);
        
	} catch (error) {
		res.status(error?.response?.status || 500).send(`[API Getway]  error: ${error.response?.data}`);
		console.log(`[API Getway]  Server responde ${error?.response?.status}.  ${error.response?.data} for ${error?.request?.path} POST request`);
	}
});

listsRouter.put('/',  async (req, res)=>{
    
	try {
		const body = req.body;
		const id = req.query['id'];
		console.log(`[API Getway]  Server recieved PUT /lists?id=${id} request`);

		const result = await api.putRequest(`/lists?id=${id}`, body);
		res.status(result?.status).send(result?.data);
		console.log(`[API Getway]  Server responde with ${result?.status} for /lists?id=${id} PUT request`);
        
	} catch (error) {
		res.status(error?.response?.status || 500).send(`[API Getway]  error: ${error.response?.data}`);
		console.log(`[API Getway]  Server responde ${error?.response?.status}.  ${error.response?.data} for ${error?.request?.path} PUT request`);
	}
});

listsRouter.delete('/', async (req, res)=>{
	try {
        
		const id = req.query['id'];
		console.log(`[API Getway]  Server recieved DELETE /lists?id=${id} request`);
        
		const result = await api.deleteRequest(`/lists?id=${id}`);
		res.status(result?.status).send(result?.data);
		console.log(`[API Getway]  Server responde with ${result?.status} for /lists?id=${id} DELETE request`);

	} catch (error) {
		res.status(error?.response?.status || 500).send(`[API Getway]  error: ${error.response?.data}`);
		console.log(`[API Getway]  Server responde ${error?.response?.status}.  ${error.response?.data} for ${error?.request?.path} DELETE request`);
	}

});