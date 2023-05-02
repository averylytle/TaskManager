import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignUserProjectComponent } from './assign-user-project.component';

describe('AssignUserProjectComponent', () => {
  let component: AssignUserProjectComponent;
  let fixture: ComponentFixture<AssignUserProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignUserProjectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignUserProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
