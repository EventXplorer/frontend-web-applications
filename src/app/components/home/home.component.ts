import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private userService: UserService, private router:Router){}

  ngOnInit(): void{

  }

  onClick(){
    this.userService.logout()
    .then(()=>{
        this.router.navigate(['/login']);
    })
    .catch(e=>console.log(e))
  }

}
