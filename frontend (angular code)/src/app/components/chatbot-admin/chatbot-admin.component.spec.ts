import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatbotAdminComponent } from './chatbot-admin.component';

describe('ChatbotAdminComponent', () => {
  let component: ChatbotAdminComponent;
  let fixture: ComponentFixture<ChatbotAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatbotAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatbotAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
