import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule} from '@angular/material/toolbar';
import { MatIconModule} from '@angular/material/icon'
import { RouterLink } from '@angular/router';
import { NgClass, NgIf } from '@angular/common';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatToolbarModule, RouterLink, MatButtonModule, MatIconModule, NgIf, NgClass],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  showSidebar = false;

  toggleSidebar() {
    console.log('Toggle sidebar!');
    this.showSidebar = !this.showSidebar;
    console.log('showSidebar:', this.showSidebar);
  }
}
