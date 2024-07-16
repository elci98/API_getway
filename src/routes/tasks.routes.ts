import { Router } from 'express';
export const tasksRouter = Router();
import { api } from './api.service'



tasksRouter.get('/', async (req, res)=>{

    try {

        const id = req.query['id'];
        console.log(`[API Getway]  Server recieved GET /tasks?id=${id} request`);

        const result = await api.getRequest(`/tasks?id=${id}`);
        res.status(result?.status).send(result?.data);
        console.log(`[API Getway]  Server responde with ${result?.status} for /tasks?id=${id} GET request`);

    } catch (error) {
        res.status(error?.response?.status || 500).send(`[API Getway]  error: ${error.response?.data}`)
        console.log(`[API Getway]  Server responde ${error?.response?.status}.  ${error.response?.data} for ${error?.request?.path} GET request`);
    }
})

tasksRouter.post('/',  async(req, res)=>{
    
    try {
        
        const body = req.body;
        const id = req.query['id'];
        console.log(`[API Getway]  Server recieved POST /tasks?id=${id} request`);
        
        const result = await api.postRequest(`/tasks?id=${id}`, body);
        res.status(result?.status).send(result?.data);
        console.log(`[API Getway]  Server responde with ${result?.status} for /tasks?id=${id} POST request`);
        
    } catch (error) {
        res.status(error?.response?.status || 500).send(`[API Getway]  error: ${error.response?.data}`)
        console.log(`[API Getway]  Server responde ${error?.response?.status}.  ${error.response?.data} for ${error?.request?.path} POST request`);
    }
})

tasksRouter.put('/',  async (req, res)=>{
    
    try {
        const body = req.body;
        const id = req.query['id'];
        console.log(`[API Getway]  Server recieved PUT /tasks?id=${id} request`);

        const result = await api.putRequest(`/tasks?id=${id}`, body);
        res.status(result?.status).send(result?.data);
        console.log(`[API Getway]  Server responde with ${result?.status} for /tasks?id=${id} PUT request`);
        
    } catch (error) {
        res.status(error?.response?.status || 500).send(`[API Getway]  error: ${error.response?.data}`)
        console.log(`[API Getway]  Server responde ${error?.response?.status}.  ${error.response?.data} for ${error?.request?.path} PUT request`);
    }
})

tasksRouter.delete('/', async (req, res)=>{
    try {
        
        const id = req.query['id'];
        console.log(`[API Getway]  Server recieved DELETE /tasks?id=${id} request`);
        
        const result = await api.deleteRequest(`/tasks?id=${id}`);
        res.status(result?.status).send(result?.data);
        console.log(`[API Getway]  Server responde with ${result?.status} for /tasks?id=${id} DELETE request`);

    } catch (error) {
        res.status(error?.response?.status || 500).send(`[API Getway]  error: ${error.response?.data}`)
        console.log(`[API Getway]  Server responde ${error?.response?.status}.  ${error.response?.data} for ${error?.request?.path} DELETE request`);
    }

})