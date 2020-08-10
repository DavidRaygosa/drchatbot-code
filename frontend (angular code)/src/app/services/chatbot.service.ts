import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Global } from './global';

@Injectable({
  providedIn: 'root'
})
export class ChatBotService {

	public url:string;

	constructor(private _http: HttpClient) 
	{
		this.url = Global.url;
	}

	getCategories()
	{
		let headers = new HttpHeaders().set('Content-Type','application/json');
		return this._http.get(this.url+'get-chatbot-categories', {headers: headers});
	}

	newCategory(Category)
	{
		let headers = new HttpHeaders().set('Content-Type','application/json');
		return this._http.post(this.url+'new-chatbot-category',Category, {headers: headers});
 	}

 	updateCategory(project)
 	{
		let params = JSON.stringify(project);
		let headers = new HttpHeaders().set('Content-Type', 'application/json');
		return this._http.put(this.url+'update-chatbot-questions/'+project._id, params, {headers: headers});
 	}

	deleteCategory(id)
	{
		let headers = new HttpHeaders().set('Content-Type', 'application/json');
		return this._http.delete(this.url+'delete-chatbot-category/'+id, {headers:headers});
	}

 	sendMessage(email)
	{
		let headers = new HttpHeaders().set('Content-Type','application/json');
		return this._http.post(this.url+'send-email-chatbot',email, {headers: headers});
 	}
}