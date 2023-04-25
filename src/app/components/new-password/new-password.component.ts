import { Component } from '@angular/core';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.css']
})
export class NewPasswordComponent {
  passwordFieldType: string = 'password';
  passwordFieldType2: string = 'password';

  togglePasswordVisibility(input: any): void {
    input.type = input.type === 'password' ? 'text' : 'password';
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }

  togglePasswordVisibility2(input: any): void {
    input.type = input.type === 'password' ? 'text' : 'password';
    this.passwordFieldType2 = this.passwordFieldType2 === 'password' ? 'text' : 'password';
  }
}
