import { Component } from '@angular/core';

@Component({
  selector: 'cell',
  templateUrl: './cell.html',
  styleUrls: ['./cell.css']
})
export class Cell {

  public filled:boolean = false;

  constructor(){

  }

  classTypes={
    'o-piece' : false
  }

  fill(type){
    this.classTypes[type] = true;
    this.filled = true;
  }



}
