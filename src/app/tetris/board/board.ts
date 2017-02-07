import { Component,ViewChildren,QueryList } from '@angular/core';
import { Cell } from '../cell/cell';
import { Piece } from '../piece/piece';

@Component({
  selector: 'board',
  templateUrl: './board.html',
  styleUrls: ['./board.css']
})
export class Board {

  @ViewChildren(Cell) cells:QueryList<Cell>;

  public grid = [];
  public width = 10;
  public height = 20;
  public piece = new Piece();

  initCells(){
      var area = this.width * this.height;
      for(let i = 0;i<area;i++){
        var cell = new Cell();
        this.grid.push(cell);
      }
  }

  constructor(){
    this.initCells();
  }

  start(){
    console.log('game start');
  }

}
