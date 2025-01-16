import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeDemoComponent } from './recipe-demo.component';

describe('RecipeDemoComponent', () => {
  let component: RecipeDemoComponent;
  let fixture: ComponentFixture<RecipeDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecipeDemoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecipeDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
