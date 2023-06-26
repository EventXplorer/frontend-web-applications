import { Component,OnInit } from '@angular/core';
import { AssistService } from 'src/app/services/assist.service';
import { UserService } from 'src/app/services/user.service';
import { UserDataService
 } from 'src/app/services/user-data.service';
@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.css']
})
export class ResumeComponent{

  ngOnInit(): void {
  this.getAssist();
  }
  
  constructor(private assistService: AssistService,private UserService: UserService,private userDataService: UserDataService,) { }
  
  assist: any[] = [];

  getAssist() {
    const userId= this.UserService.getCurrentUser()?.id;

    if (userId) {
      this.assistService.getAssistsByUser(userId).subscribe(
        res => {
          this.assist = res;
        },
        err => {
          console.error('Error al obtener los asistentes:', err);
        }
      );
    }
  }
}
  
