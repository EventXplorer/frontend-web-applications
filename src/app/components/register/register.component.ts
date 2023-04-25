import { Component,ViewChild  } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  passwordFieldType = 'password';

  togglePasswordVisibility(input: any): void {
    input.type = input.type === 'password' ? 'text' : 'password';
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }
}

