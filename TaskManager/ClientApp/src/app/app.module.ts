import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { TasksListComponent } from './tasks-list/tasks-list.component';
import { AddTaskComponent } from './add-task/add-task.component';
//dialog 
import { MatDialogModule } from '@angular/material';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { RegisterUserComponent } from './register-user/register-user.component';
import { EditTaskComponent } from './edit-task/edit-task.component';
import { ProjectsComponent } from './projects/projects.component';
import { LoginComponent } from './login/login.component';
import { CreateProjectComponent } from './create-project/create-project.component';
import { TestingDialogComponent } from './testing-dialog/testing-dialog.component';
import { AssignUserProjectComponent } from './assign-user-project/assign-user-project.component';
import { UserProjectDialogComponent } from './dialog/error-dialogs/already-assigned-error/already-assigned-error.component';
import { SuccessComponent } from './dialog/success/success.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    TasksListComponent,
    AddTaskComponent,
    RegisterUserComponent,
    EditTaskComponent,
    ProjectsComponent,
    LoginComponent,
    CreateProjectComponent,
    TestingDialogComponent,
    AssignUserProjectComponent,
    UserProjectDialogComponent,
    SuccessComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatSelectModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'tasks', component: TasksListComponent },
      { path: 'add-task', component: AddTaskComponent },
      { path: 'register-user', component: RegisterUserComponent },
      { path: 'project', component: ProjectsComponent },
      { path: 'create-project', component: CreateProjectComponent },
      { path: 'login', component: LoginComponent },
      { path: 'assign-user-project', component: AssignUserProjectComponent }

    ])
  ],
  providers: [
    //TasksListComponent
  ],
  bootstrap: [AppComponent]
  //,entryComponents: [TestingDialogComponent]
})
export class AppModule { }
