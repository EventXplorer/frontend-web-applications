import { Component,OnInit } from '@angular/core';
import { AssistService } from 'src/app/services/assist.service';

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.css']
})
export class ResumeComponent{

  ngOnInit(): void {
  this.getAssist();
  }
  
  constructor(private assistService: AssistService) { }
  
  assist: any[] = [];

  getAssist() {
    this.assistService.getAllAssists().subscribe(
      res => {
        this.assist = res;
      },
      err =>{
        console.error('Error al obtener los asistentes', err);
      } 
    );
  }


}
