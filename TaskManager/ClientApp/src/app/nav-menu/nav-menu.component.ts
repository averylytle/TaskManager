import { MatMenuModule } from '@angular/material/menu';
import { Component } from '@angular/core';
import { AssignUserProjectComponent } from '../assign-user-project/assign-user-project.component';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  isExpanded = false;


  constructor(
  ) { }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
}
