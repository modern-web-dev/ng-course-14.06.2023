import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardPanelComponent } from './card-panel.component';

describe('CardPanelComponent', () => {
  let component: CardPanelComponent;
  let fixture: ComponentFixture<CardPanelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CardPanelComponent]
    });
    fixture = TestBed.createComponent(CardPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
