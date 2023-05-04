import { Component } from '@angular/core';
import {ThemePalette} from '@angular/material/core';

export interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
}

@Component({
  selector: 'app-publishdos',
  templateUrl: './publishdos.component.html',
  styleUrls: ['./publishdos.component.css']
})
export class PublishdosComponent {
}
