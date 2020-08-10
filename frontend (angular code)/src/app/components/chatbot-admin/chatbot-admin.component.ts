import { Component, OnInit } from '@angular/core';
import { ChatbotModel } from '../../models/chatbotmodel';
import { ChatbotModelQuestion } from '../../models/chatbotquestionmodel';
import { ChatBotService } from '../../services/chatbot.service';

@Component({
  selector: 'app-chatbot-admin',
  templateUrl: './chatbot-admin.component.html',
  styleUrls: ['./chatbot-admin.component.scss'],
  providers: [ChatBotService]
})
export class ChatbotAdminComponent implements OnInit {


// START CHATBOT
	public newchatbotCategory:ChatbotModel;
    public newchatbotQuestion: ChatbotModelQuestion;
    // DOM
    public CategoryName_DOM:string;
   	public Icono_DOM:string;
    public Pregunta_DOM:string;
    public Respuesta_DOM:string;
    public chatbotNewQuestion_DOM;
    public chatbotNewAnswer_DOM;
    public chatbotCategoryName_DOM;
    // Booleans
    public CategoryName_DOM_Completed:boolean;
    public CategoryIcon_DOM_Completed:boolean;
    public newQuestionCompleted:boolean;
    public newAnswerCompleted:boolean;
    public editNameCompleted:boolean;
    public createdCategory:boolean;
    public newPanel:boolean;
    public ModifyPanel:boolean;
    public modifyOne:boolean;
    public popup:boolean;
    public popupNew:boolean;
    public popupEdit:boolean;
    public popupDelete:boolean;
    public changeSelect:boolean;
    public editfrequent:boolean;
    public frequentError:boolean;
    public newCategoryVar:boolean;
    // Vars 
    public responseCreatedCategory;
    public categories;
    public category;
    public question;
    public indexQuestion;
    public editCategoryJSON;
    public frequentCount:number;
// END CHATBOT
	constructor(private _chatbotService:ChatBotService) 
	{ 
		this.newchatbotCategory = new ChatbotModel("","",[],"NO");
	}

	ngOnInit(): void 
	{
// START CHATBOT
		this.newCategoryVar = false;
		this.createdCategory = false;
		this.CategoryName_DOM_Completed = false;
      	this.CategoryIcon_DOM_Completed = false;
      	this.newQuestionCompleted = false;
      	this.newAnswerCompleted = false;
      	this.editNameCompleted = false;
      	this.newPanel = true;
      	this.ModifyPanel = false;
      	this.modifyOne = false;
      	this.categories = [];
      	this.category = [];
      	this.question = "";
      	this.changeSelect = false;
      	this.frequentError = false;
      	this.popupNew = false;
      	this.popupEdit = false;
      	this.popupDelete = false;
      	this.popup = false;
      	this.editCategoryJSON =
      	{
      		icon: null,
      		name: null
      	};
      	this.frequentCount = 0;
      	this.editfrequent = false;
// END CHATBOT
	}

// START CHATBOT
	changePanel(panel:string)
	{
		let hidepanel = document.getElementById("modifyOneCategory");
		if(panel == 'new') 
		{
			if(this.modifyOne)
			{
				hidepanel.style.display = "none";
			} 
			this.ModifyPanel = false;
			this.newPanel = true;
		}
		else if(panel == 'modify')
		{ 
			this.frequentCount = 0;
			if(!this.modifyOne) this.ModifyPanel = true;
			else
			{
				hidepanel.style.display = "flex";
			}
			this.newPanel = false;
			this.categories = [];
			this._chatbotService.getCategories().subscribe(
				(response : any) =>
				{
					if(response.message != 'No Hay Proyectos Para Mostrar')
					{
						response.categories.forEach((Element, Index) =>
						{
							this.categories.push(Element);
							if(Element.frequent == 'SI') this.frequentCount++;
						});
					}
				},
				error =>
				{
					console.log(error);
				});	
		}
	}
	/*------------------------------------------------------------------------------------------------
	----------------------------------- CREATE PANEL -------------------------------------------------
	------------------------------------------------------------------------------------------------*/
	createCategory()
	{
		this.checkEmptyInputs();
		this.checkValidations();
	}
	checkValidations()
	{
		if
		(
			this.CategoryName_DOM_Completed &&
			this.CategoryIcon_DOM_Completed
		)
		{
			let name = <HTMLInputElement>document.getElementById("CategoryName");
			this.newchatbotCategory.category_name = name.value;
			this._chatbotService.newCategory(this.newchatbotCategory).subscribe(
				response =>
				{
					this.createdCategory = true;
					this.newchatbotCategory.category_name = "";
					this.newchatbotCategory.icon = "";
					let name = <HTMLInputElement>document.getElementById("CategoryName");
					name.value = "";

					setTimeout(() =>
					{
						this.createdCategory = false;
					}, 2000);
				},
				error =>
				{
					console.log(error);
				}
			);
		}
	}
	checkEmptyInputs()
	{
		this.setAllFalseValidations();
		let name = <HTMLInputElement>document.getElementById("CategoryName");
		name.classList.remove("incompledFormChatbot");
      	if(this.CategoryName_DOM != undefined && this.CategoryName_DOM != '')this.CategoryName_DOM_Completed = true;
      	else name.classList.add("incompledFormChatbot");
      	if(this.newchatbotCategory.icon != undefined && this.newchatbotCategory.icon != '')this.CategoryIcon_DOM_Completed = true;
	}
	setAllFalseValidations()
    {
      this.CategoryName_DOM_Completed = false;
      this.CategoryIcon_DOM_Completed = false;
    }
	newCategory()
	{
		this.newCategoryVar = true;
	}
	selectedIcon(icon:string)
	{
		this.newchatbotCategory.icon = icon;
	}
	/*------------------------------------------------------------------------------------------------
	----------------------------------- MODIFY PANEL -------------------------------------------------
	------------------------------------------------------------------------------------------------*/
	modifyCategory(category)
	{
		this.category = category;

		this.ModifyPanel = false;
		this.modifyOne = true;
	}
	backtoCategories()
	{
		this.modifyOne = false;
		this.ModifyPanel = true;
	}
	/*------------------------------------------------------------------------------------------------
	----------------------------------- MODIFY PANEL -------------------------------------------------
	------------------------------------------------------------------------------------------------*/
	modifyQuestion(question, index)
	{
		this.popup = true;
		this.question = question;
		this.indexQuestion = index;
		setTimeout(()=>
		{
			let questionDOM = <HTMLInputElement>document.getElementById("question");
			let answerDOM = <HTMLInputElement>document.getElementById("answer");
			questionDOM.value = this.question.question;
			answerDOM.value = this.question.answer;
		},100);
	}
	hidepopupNew(popup:string, event)
	{
		if (event.currentTarget == event.target)
		{
			this.chatbotNewQuestion_DOM = '';
			this.chatbotNewAnswer_DOM = '';
			this.popupNew = false;
		}
	}
	hidepopupDelete(popup:string, event)
	{
		if (event.currentTarget == event.target) this.popupDelete = false;
	}
	hidepopupEdit(popup:string, event)
	{
		if (event.currentTarget == event.target) this.popupEdit = false;
	}
	hidepopup(popup:string, event)
	{
		if (event.currentTarget == event.target) this.popup = false;
	}
	newQuestions(form)
	{
		this.checkEmptyInputsNew();
		this.checkValidationsNew();
	}
    checkEmptyInputsNew()
    {
      	this.setAllFalseValidationsNew();
		this.setAllFalseValidations();
		let question = <HTMLInputElement>document.getElementById("new-question");
		let answer = <HTMLInputElement>document.getElementById("new-answer");
		question.classList.remove("incompledFormChatbot");
		answer.classList.remove("incompledFormChatbot");
  		if(this.chatbotNewQuestion_DOM != undefined && this.chatbotNewQuestion_DOM != '')this.newQuestionCompleted = true;
  		else question.classList.add("incompledFormChatbot");
  		if(this.chatbotNewAnswer_DOM != undefined && this.chatbotNewAnswer_DOM != '')this.newAnswerCompleted = true;
  		else answer.classList.add("incompledFormChatbot");
    }
    setAllFalseValidationsNew()
    {
      this.newQuestionCompleted = false;
      this.newAnswerCompleted = false;
    }
	checkValidationsNew()
	{
		if
		(
			this.newQuestionCompleted &&
			this.newAnswerCompleted
		)
		{
			this.newchatbotQuestion = new ChatbotModelQuestion(this.chatbotNewQuestion_DOM, this.chatbotNewAnswer_DOM);
			this.category.questions.push(this.newchatbotQuestion);
			this._chatbotService.updateCategory(this.category).subscribe(
			response =>
			{
				this.chatbotNewQuestion_DOM = '';
				this.chatbotNewAnswer_DOM = '';
				this.popupNew = false;
			},
			error =>
			{
				console.log(error);
			});
		}
	}
	updateQuestions()
	{
		let questionDOM = <HTMLInputElement>document.getElementById("question");
		let answerDOM = <HTMLInputElement>document.getElementById("answer");
		this.category.questions[this.indexQuestion].question = questionDOM.value;
		this.category.questions[this.indexQuestion].answer = answerDOM.value;
		this._chatbotService.updateCategory(this.category).subscribe(
			response =>
			{
				this.popup = false;
			},
			error =>
			{
				console.log(error);
			})
	}
	selectedIconEdit(icon:string)
	{
		this.editCategoryJSON.icon = icon;
	}
	EditCategoryData()
	{
		this.checkEmptyInputsEdit();
		this.checkValidationsEdit();
	}
    checkEmptyInputsEdit()
    {
      	this.setAllFalseValidationsEdit();
		this.checkValidationsEdit();
		let name = <HTMLInputElement>document.getElementById("edit-category-name");
		name.classList.remove("incompledFormChatbot");
      	if(this.chatbotCategoryName_DOM != undefined && this.chatbotCategoryName_DOM != '')this.editNameCompleted = true;
      	else name.classList.add("incompledFormChatbot");


      	let select = <HTMLInputElement>document.getElementById("mySelect");
      	if(this.changeSelect)
      	{
      		if(select.value == 'SI')
      		{
      			if(this.category.frequent == "NO")
      			{
      				if(this.frequentCount == 2)
      				{
      					// ERROR
      					this.frequentError = true;
      				}
      				else if(this.frequentCount < 2)
      				{
      					// EDIT
      					this.editfrequent = true;
      					this.frequentCount++;
      				}
      			}
      			else if(this.category.frequent == 'SI')
      			{
      				this.editfrequent = false;
      			}
      		}
      		else if(select.value == 'NO')
      		{
      			if(this.category.frequent == 'SI')
      			{
      				this.editfrequent = true;
      				this.frequentCount--;
      			}
      			else if(this.category.frequent == 'NO')
      			{
  					this.editfrequent = false;
      			}
      		}
      	}
    }
    setAllFalseValidationsEdit()
    {
      this.frequentError = false;
      this.editNameCompleted = false;
      this.editfrequent = false;
    }
	checkValidationsEdit()
	{
		if
		(
			this.editNameCompleted
		)
		{
			if(!this.frequentError)
			{
				if(this.editfrequent)
				{
	      			let select = <HTMLInputElement>document.getElementById("mySelect");
	      			this.category.frequent = select.value;
				}

				this.editCategoryJSON.name = this.chatbotCategoryName_DOM;
				this.category.category_name = this.editCategoryJSON.name;
				if(this.editCategoryJSON.icon != null) this.category.icon = this.editCategoryJSON.icon;
				this._chatbotService.updateCategory(this.category).subscribe(
					response =>
					{
						this.popupEdit = false;
					},
					error =>
					{
						console.log(error);
					})
			}
		}
	}
	newQuestion()
	{
		this.popupNew = true;
	}
	editCategory()
	{
		this.popupEdit = true;
		this.changeSelect = false;
		this.chatbotCategoryName_DOM = this.category.category_name;
		this.editCategoryJSON.icon = null;
		this.editCategoryJSON.name = null;
	}
	delete()
	{
		this.popupDelete = true;
	}
	deleteConfirm()
	{
		this._chatbotService.deleteCategory(this.category._id).subscribe(
			response =>
			{
				this.popupDelete = false;
				this.modifyOne = false;
				this.changePanel('modify');
			},
			error =>
			{
				console.log(error);
			});
	}
	deleteQuestions()
	{
		this.category.questions.splice(this.indexQuestion, 1);
		this._chatbotService.updateCategory(this.category).subscribe(
			response =>
			{
				this.popup = false;
			},
			error =>
			{
				console.log(error);
			});
	}
	onChange(event)
	{
		this.changeSelect = true;
	}
}
// END CHATBOT