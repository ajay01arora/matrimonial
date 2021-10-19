import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactQueriesComponent } from './contact-queries.component';

describe('ContactQueriesComponent', () => {
  let component: ContactQueriesComponent;
  let fixture: ComponentFixture<ContactQueriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactQueriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactQueriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
