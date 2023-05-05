import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProjectDialogComponent } from './already-assigned-error.component';

describe('UserProjectDialogComponent', () => {
  let component: UserProjectDialogComponent;
  let fixture: ComponentFixture<UserProjectDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserProjectDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserProjectDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
