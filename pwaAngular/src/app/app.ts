import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Home } from "./page/home/home";
import { Toast } from "./components/toast/toast";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Home, Toast],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('pwaAngular');
}
