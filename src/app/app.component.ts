import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TestDemoComponent } from './test-demo/test-demo.component';

@Component({
  standalone: true,
  imports: [ RouterModule, TestDemoComponent ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'test-app';
}
