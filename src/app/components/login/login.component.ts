import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  passwordFieldType = 'password';

  togglePasswordVisibility(input: any): void {
    input.type = input.type === 'password' ? 'text' : 'password';
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }
}
