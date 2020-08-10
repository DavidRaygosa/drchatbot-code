import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Components

import { ChatbotAdminComponent } from './components/chatbot-admin/chatbot-admin.component';

//Routes

const appRoutes: Routes = 
[
	{path: '', component: ChatbotAdminComponent},
	{path: '**', component: ChatbotAdminComponent}
]

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);