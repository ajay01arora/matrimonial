import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateListMenComponent } from './candidate-list-men.component';

describe('CandidateListMenComponent', () => {
  let component: CandidateListMenComponent;
  let fixture: ComponentFixture<CandidateListMenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CandidateListMenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateListMenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
