import { Component } from '@angular/core';

@Component({
  selector: 'cell',
  templateUrl: './cell.html',
  styleUrls: ['./cell.css']
})
export class Cell {

  classTypes={
    'o-piece' : false
  }

  fill(type){
    this.classTypes[type] = true;
  }

  constructor(){
  
  }

}
