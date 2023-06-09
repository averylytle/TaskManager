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
//used for mat-form-field datepicker stuff
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatNativeDateModule } from '@angular/material/core';
import { RegisterUserComponent } from './register-user/register-user.component';
import { EditTaskComponent } from './edit-task/edit-task.component';
import { ProjectsComponent } from './projects/projects.component';
import { LoginComponent } from './login/login.component';
import { CreateProjectComponent } from './create-project/create-project.component';

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
    CreateProjectComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatNativeDateModule,
    MatFormFieldModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'tasks', component: TasksListComponent },
      { path: 'add-task', component: AddTaskComponent },
      { path: 'register-user', component: RegisterUserComponent },
      { path: 'project', component: ProjectsComponent },
      { path: 'create-project', component: CreateProjectComponent },
      { path: 'login', component: LoginComponent }

    ])
  ],
  providers: [
    //TasksListComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
