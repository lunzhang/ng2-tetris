import { Component,ViewChild } from '@angular/core';
import { Board } from './tetris/board/board';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  @ViewChild(Board) gameboard:Board;

  constructor(){

  }

  start(){
    this.gameboard.start();
  }

}
