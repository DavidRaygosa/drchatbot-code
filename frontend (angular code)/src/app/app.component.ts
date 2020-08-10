import { Component, OnInit } from '@angular/core';
import { ChatBotService } from './services/chatbot.service';
import { ChatbotModel } from './models/chatbotmodel';

declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ChatBotService]
})
export class AppComponent {
	title = 'ChatBot';

	// START CHATBOT
    public chatbot;
    public loadingChatBotData:boolean;
    public chatbot_category;
    public chatbot_questions;
    public chatbot_questions_frecuent:Array<ChatbotModel>
    public outputChatbot;
    public PanelChatBot:boolean;
    public PanelEmailChatbot:boolean;
    public frequent:boolean;
    public PanelCategoriesChatBot:boolean;
    public PanelQuestionesChatbot:boolean;
    public PanelAnswerChatbot:boolean;
    public enableChatBotSearch:boolean;
    public enableChatBotSearchAnswer:boolean;
    public cancelSearchChatBot:boolean;
    public PanelSearchChatbot:boolean;
    public searchActiveChatBot:boolean;
    public chatbotFormSent:boolean;
    public midFrequent:boolean
    public fullFrequent:boolean
    // DOM CHATBOT
    public clearSearchChatBot;
    public inputChatBotSearch;
    public ChatbotName_DOM;
    public ChatbotLastname_DOM;
    public ChatbotEmail_DOM;
    public ChatbotMessage_DOM;
    public ChatbotName_DOM_Completed = false;
    public ChatbotLastName_DOM_Completed = false;
    public ChatbotEmail_DOM_Completed = false;
    public ChatbotMessage_DOM_Completed = false;
    public frequentCount:number;
  // END CHATBOT

    constructor(private _chatbotService:ChatBotService)
  	{    
  	}

  	ngOnInit()
  	{
  	// START CHATBOT
      this.chatbot = null;
      this.loadingChatBotData = true;
      this.chatbot_category = null;
      this.chatbot_questions =
      {
        "category": null,
        "question": null,
        "answer": null
      };
      this.chatbot_questions_frecuent = [];
      this.outputChatbot = [];
      this.PanelChatBot = true;
      this.PanelEmailChatbot = false;
      this.frequent = false;
      this.PanelCategoriesChatBot = false;
      this.PanelQuestionesChatbot = false;
      this.PanelAnswerChatbot = false;
      this.enableChatBotSearch = false;
      this.enableChatBotSearchAnswer = false;
      this.cancelSearchChatBot = false;
      this.PanelSearchChatbot = false;
      this.searchActiveChatBot = false;
      this.chatbotFormSent = false;
      this.getChatbotCategories();
    // END CHATBOT
  	}

  	// START CHATBOT  
    getChatbotCategories()
    {
      this._chatbotService.getCategories().subscribe(
        (response : any) =>
        {
          this.chatbot = response;
          this.frequentCount = 0;
          this.midFrequent = false;
          this.fullFrequent = false;
          if(response.message != 'No Hay Proyectos Para Mostrar')
          {
            this.chatbot.categories.forEach((Element, Index) =>
            {
               if(Element.frequent == "SI")
                {
                  this.frequentCount++;
                  if(this.frequentCount == 1) 
                  {
                    this.chatbot_questions_frecuent.push(Element);
                    this.midFrequent = true;
                  }
                  else if(this.frequentCount == 2) 
                  {
                    this.midFrequent = true;
                    this.fullFrequent = true;
                    this.chatbot_questions_frecuent.push(Element);
                  }
                }
            });
          }
          this.loadingChatBotData = false;
        },
        error =>
        {
          console.log(error);
        })
    }
    appearchatbot(command:string)
    {
      let button_chatbot = document.getElementById("button-chatbot");
      let chatbot_container = document.getElementById("chatbot-container");
      let logo = document.getElementById("logoChatbot-principal");
      let options_header = document.getElementById("contact-us");
      let options_questions = document.getElementById("common-questions");
      if(command=="appear")
      {
        button_chatbot.style.display = "none";
        chatbot_container.style.display = "grid";
        setTimeout(()=>
        {
          logo.style.display = "block";
          options_header.style.display = "block";
          options_questions.style.display = "block";
        }, 300);
      }
      else if(command="close")
      {
        button_chatbot.style.display = "block";
        chatbot_container.style.display = "none";
        logo.style.display = "none";
        options_header.style.display = "none";
        options_questions.style.display = "none";
      }
    }
    backPanelChatBot(event:string)
    {
      let header = document.getElementById("chatbot-container");
      let header_objects = document.getElementById("chatbot-header");
      let logo = document.getElementById("logoChatbot-principal");
      let close = document.getElementById("button-right");
      if(event == 'toPrincipal')
      {
        this.PanelCategoriesChatBot = false;
        this.PanelQuestionesChatbot = false;
        this.PanelAnswerChatbot = false;
        this.PanelChatBot = true;
        this.PanelEmailChatbot = false;
        this.PanelEmailChatbot = false;
        this.frequent = false;
        this.enableChatBotSearch = false;
        this.enableChatBotSearchAnswer = false;
        header.style.gridTemplateRows = "20% 80%";
        logo.classList.remove("logoToCenter");
        logo.classList.add("logoToLeft");
        logo.classList.remove("logoToLeft");
        close.style.marginTop = "-145%";
      }
      else if(event == 'toCategories')
      {
        this.clearSearchChatBot = <HTMLInputElement>document.getElementById("searchChatBotInput");
        this.clearSearchChatBot.value = "";
        this.cancelSearchChatBot = false;
        this.PanelQuestionesChatbot = false;
        this.PanelSearchChatbot = false;
        this.PanelAnswerChatbot = false;
        this.PanelCategoriesChatBot = true;
        header.style.gridTemplateRows = "30% 70%";
        header_objects.style.gridTemplateRows = "50% 50%";
      }  
      else if(event == 'toQuestions')
      {
        this.PanelAnswerChatbot = false;
        this.enableChatBotSearchAnswer = true;
        if(this.searchActiveChatBot)
        { 
          this.PanelSearchChatbot = true;
          setTimeout(()=>
          {
            this.clearSearchChatBot = <HTMLInputElement>document.getElementById("searchChatBotInput");
            this.clearSearchChatBot.value = this.inputChatBotSearch;
          },1);
          header.style.gridTemplateRows = "30% 70%";
          header_objects.style.gridTemplateRows = "50% 50%";
          logo.classList.remove("logoToMidLeft");
          logo.classList.add("logoToCenter");
        }
        else
        {
          this.PanelQuestionesChatbot = true;
          if(this.frequent)
          {
            let frequentButton = document.getElementById("chatbot-frequent-button");
            frequentButton.classList.remove("hideChatbotElement");
            frequentButton.classList.add("showChatbotElement");
          }
          header.style.gridTemplateRows = "32% 63%";
          header_objects.style.gridTemplateRows = "45.5% 50%";
          logo.classList.remove("logoToMidLeft");
          logo.classList.add("logoToCenter");
        }
      }
    }
    focusChatBotSearch()
    {
      let divSearch = document.getElementById("searchChatBot");
      let search = document.getElementById("searchChatBotInput");
      let button = document.getElementById("searchChatBotButton");
      let logo = document.getElementById("searchChatBotLogo");
      divSearch.style.backgroundColor = "white";
      logo.style.color = "#444";
      search.style.color = "#444";
      search.classList.add("onFocusSearchChatBot");
    }
    focusOutChatBotSearch()
    {
      let divSearch = document.getElementById("searchChatBot");
      let search = document.getElementById("searchChatBotInput");
      let button = document.getElementById("searchChatBotButton");
      let logo = document.getElementById("searchChatBotLogo");

      divSearch.style.backgroundColor = "#3385C9";
      logo.style.color = "white";
      search.style.color = "#e5e5e5"
      search.classList.remove("onFocusSearchChatBot");
    }
    keyupSearchChatBot(event:any)
    {
      let length;
      this.clearSearchChatBot = <HTMLInputElement>document.getElementById("searchChatBotInput");
      if(event == 'clear')
      {
        length = 0;
        this.clearSearchChatBot.value = "";
      }
      else length = event.value.length;
      this.inputChatBotSearch = event.value;
      this.outputChatbot = [];
      if(length > 0) 
      {
        this.PanelCategoriesChatBot = false;
        this.PanelAnswerChatbot = false;
        this.PanelQuestionesChatbot = false;
        this.cancelSearchChatBot = true;
        this.PanelSearchChatbot = true;
        if(this.chatbot.message != 'No Hay Proyectos Para Mostrar')
        {
          this.chatbot.categories.forEach((ElementI, Index) =>
          {
            ElementI.questions.forEach((Element, Index) =>
            { 
              let indexOfQuestions = Element.question.toLowerCase();
              let indexOfAnswers = Element.answer.toLowerCase();
              if(indexOfQuestions.indexOf(this.inputChatBotSearch.toLowerCase()) > -1 || indexOfAnswers.indexOf(this.inputChatBotSearch.toLowerCase()) > -1)
              {
                this.outputChatbot.push(ElementI.questions[Index]);
              }
            });
          });
        }
      }
      else if(length == 0) 
      {
        this.cancelSearchChatBot = false;
        this.PanelSearchChatbot = false;
        this.PanelCategoriesChatBot = true;
      }
    }
    chatbotCategories(frequent:boolean = false, index:number = null)
    {
      this.PanelChatBot = false;
      if(!frequent) this.PanelCategoriesChatBot = true;
      this.enableChatBotSearch = true;
      this.enableChatBotSearchAnswer = true;
      let header = document.getElementById("chatbot-container");
      let logo = document.getElementById("logoChatbot-principal");
      let close = document.getElementById("button-right");
      header.style.gridTemplateRows = "35% 65%";
      logo.classList.add("logoToCenter");
      close.style.marginTop = "-178%";
      if(frequent) {this.chatbotCategory(this.chatbot_questions_frecuent[index]);this.frequent = true;}
    }
    chatbotCategory(chatbot_category)
    {
      this.chatbot_category = chatbot_category;
      this.PanelCategoriesChatBot = false;
      this.PanelQuestionesChatbot = true;
      let header = document.getElementById("chatbot-container");
      let header_objects = document.getElementById("chatbot-header");
      header.style.gridTemplateRows = "32% 63%";
      header_objects.style.gridTemplateRows = "45.5% 50%";
    }
    chatbotQuestion(category: string, question: string, answer:string, search:boolean = false)
    {
      this.searchActiveChatBot = search;
      if(this.searchActiveChatBot) this.PanelSearchChatbot = false;
      if(this.frequent)
      {
        let frequentButton = document.getElementById("chatbot-frequent-button");
        frequentButton.classList.remove("showChatbotElement");
        frequentButton.classList.add("hideChatbotElement");
      }
      this.chatbot_questions.category = category;
      this.chatbot_questions.question = question;
      this.chatbot_questions.answer = answer;
      let header = document.getElementById("chatbot-container");
      let header_objects = document.getElementById("chatbot-header");
      let logo = document.getElementById("logoChatbot-principal");
      this.PanelQuestionesChatbot = false;
      this.enableChatBotSearchAnswer = false;
      this.PanelAnswerChatbot = true;
      header.style.gridTemplateRows = "20% 80%";
      header_objects.style.gridTemplateRows = "93% 50%";
      logo.classList.remove("logoToCenter");
      logo.classList.add("logoToMidLeft");
    }
    chatbotEmail()
    {
      this.PanelEmailChatbot = true;
      this.PanelChatBot = false;
      this.enableChatBotSearch = true;
      let header = document.getElementById("chatbot-container");
      let logo = document.getElementById("logoChatbot-principal");
      let close = document.getElementById("button-right");
      header.style.gridTemplateRows = "30% 70%";
      logo.classList.add("logoToCenter");
      close.style.marginTop = "-178%";
    }
    OnsubmitChatbotEmail(form)
    {
      this.checkEmptyInputs();
      this.checkValidations(form);
    }
    checkValidations(form)
    {
      if
      (
        this.ChatbotName_DOM_Completed &&
        this.ChatbotLastName_DOM_Completed &&
        this.ChatbotEmail_DOM_Completed &&
        this.ChatbotMessage_DOM_Completed
      ) 
      {
        this._chatbotService.sendMessage(form.value).subscribe(
          response =>
          {
             form.resetForm();
             this.chatbotFormSent = true;
             setTimeout(()=>
             {
               this.chatbotFormSent = false;
             },2000);
          },
          error =>
          { 
            console.log(error);
          });
      }
    }
    checkEmptyInputs()
    {
      this.setAllFalseValidations();
      let name = document.getElementById("form-chatbot-email-name");
      name.classList.remove("incompledFormChatbot");
      let lastname = document.getElementById("form-chatbot-email-lastname");
      lastname.classList.remove("incompledFormChatbot");
      let email = document.getElementById("form-chatbot-email-email");
      email.classList.remove("incompledFormChatbot");
      let message = document.getElementById("form-chatbot-email-message");
      message.classList.remove("incompledFormChatbot");
      if(this.ChatbotName_DOM != undefined && this.ChatbotName_DOM != '')this.ChatbotName_DOM_Completed = true;
      else name.classList.add("incompledFormChatbot");
      if(this.ChatbotLastname_DOM != undefined && this.ChatbotLastname_DOM != '') this.ChatbotLastName_DOM_Completed = true;
      else lastname.classList.add("incompledFormChatbot");
      if(this.ChatbotEmail_DOM != undefined && this.ChatbotEmail_DOM != '') this.ChatbotEmail_DOM_Completed = true;
      else email.classList.add("incompledFormChatbot");
      if(this.ChatbotMessage_DOM != undefined && this.ChatbotMessage_DOM != '') this.ChatbotMessage_DOM_Completed = true;
      else message.classList.add("incompledFormChatbot");
    }
    setAllFalseValidations()
    {
      this.ChatbotName_DOM_Completed = false;
      this.ChatbotLastName_DOM_Completed = false;
      this.ChatbotEmail_DOM_Completed = false;
      this.ChatbotMessage_DOM_Completed = false;
    }
    // END CHATBOT
}
