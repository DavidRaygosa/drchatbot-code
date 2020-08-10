import { ChatbotModelQuestion } from './chatbotquestionmodel';
 
export class ChatbotModel
{
	constructor
	(
		// Group Data Info

		public category_name: string,
		public icon: string,
		public questions: Array<ChatbotModelQuestion>,
		public frequent:string
	)
	{
	}
}