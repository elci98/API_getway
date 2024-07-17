/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

export class ApiService{

	instance: AxiosInstance;
    
	constructor(){
		this.instance = axios.create({
			baseURL: process.env.DB_REST_URL,
			timeout: 10000,
			// headers: {'X-Custom-Header': 'foobar'}
		});
	}

	getRequest(path:string , config?: AxiosRequestConfig<any>):Promise<any>{
		return this.instance.get(path, config);
	}
    
	postRequest(path:string , data:any, config?: AxiosRequestConfig<any>):Promise<any>{
		return this.instance.post(path, data, config);
	}

	putRequest(path:string , data:any, config?: AxiosRequestConfig<any>):Promise<any>{
		return this.instance.put(path, data, config);
	}

	deleteRequest(path:string , config?: AxiosRequestConfig<any>):Promise<any>{
		return this.instance.delete(path, config);
	}


}

export const api = new ApiService();