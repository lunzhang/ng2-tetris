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
    setInterval(()=>{
      this.updatePiece();
      this.checkCollision();
    },1000);
  }

  updatePiece(){
    var cells = this.cells.toArray();
    for(let i = 0;i<this.piece.coordinates.length;i++){
        cells[this.piece.coordinates[i]].classTypes[this.piece.type] = false;
    }
    for(let i = 0;i<this.piece.coordinates.length;i++){
        this.piece.coordinates[i]+=10;
    }
    for(let i = 0;i<this.piece.coordinates.length;i++){
        cells[this.piece.coordinates[i]].classTypes[this.piece.type] = true;
    }
  }

  checkCollision(){
      for(let i = 0;i<this.piece.coordinates.length;i++){
        if(this.piece.coordinates[i] >= 190 ){
            this.restartPiece();
        }
      }
  }

  restartPiece(){

  }

}
