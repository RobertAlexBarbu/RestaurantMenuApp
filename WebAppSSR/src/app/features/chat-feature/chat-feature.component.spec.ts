import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatFeatureComponent } from './chat-feature.component';

describe('ChatFeatureComponent', () => {
  let component: ChatFeatureComponent;
  let fixture: ComponentFixture<ChatFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatFeatureComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
