import { Component,OnInit } from '@angular/core';
import { AssistService } from 'src/app/services/assist.service';
import { UserService } from 'src/app/services/user.service';
import { UserDataService} from 'src/app/services/user-data.service';
import{ Assist } from 'src/app/models/assist.model';

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.css']
})
export class ResumeComponent{

  dataassist: Assist={
    id: null,
    user: {
        id: null,
    },
    event: {
        id: null,
    },
    confirmedDate: null,
    confirmedTime: null,

  }

  constructor(private assistService: AssistService,private UserService: UserService,private userDataService: UserDataService,) { }

  ngOnInit(): void {
    this.dataassist.user.id=this.UserService.getCurrentUser()?.id;
  this.getAssist();

  }
  
  
  
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
  
