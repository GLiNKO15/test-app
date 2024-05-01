import { Component } from '@angular/core';
import { LoginComponent } from '../core/login/login.component';

@Component({
  standalone: true,
  imports: [ LoginComponent ],
  selector: 'test-demo',
  templateUrl: './test-demo.component.html',
})
export class TestDemoComponent {

}
