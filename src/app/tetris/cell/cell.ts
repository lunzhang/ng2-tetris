import { Component,Input } from '@angular/core';

@Component({
  selector: 'cell',
  templateUrl: './cell.html',
  styleUrls: ['./cell.css']
})
export class Cell {

  @Input() index;
  public filled:boolean = false;

  constructor(){}

  classTypes={
    'i-piece':false,
    'j-piece':false,
    'l-piece':false,
    'o-piece' : false,
    's-piece':false,
    't-piece':false,
    'z-piece':false
  }

  fill(type){
    this.classTypes[type] = true;
    this.filled = true;
  }

  unfill(){
    for(var type in this.classTypes){
      this.classTypes[type] = false;
    }
    this.filled = false;
  }

}
