import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';
import { PagebookComponent } from '../../pages/pagebook/pagebook.component';
@Component({
  selector: 'app-main',
  standalone: true,
  imports: [RouterOutlet, RouterLink,],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

}
