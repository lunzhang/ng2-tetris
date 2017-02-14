import { Component,ViewChildren,QueryList,HostListener } from '@angular/core';
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
  public gameInProgress = false;
  public inRestart = false;
  public inRotation = false;
  public timer;

  initCells(){
      var area = this.width * this.height;
      for(let i = 0;i<area;i++){
        this.grid.push(i);
      }
  }

  constructor(){
    this.initCells();
  }

  start(){
    if(!this.gameInProgress){
      this.gameInProgress = true;
      this.updateGrid();
    }
  }

  end(){
    clearTimeout(this.timer);
    this.gameInProgress = false;
    this.inRotation = false;
    this.inRestart = false;
    this.cells.forEach((elem)=>{
      elem.unfill();
    });
    this.piece.restart();
  }

  checkLoss(){
    var cells = this.cells.toArray();
    for(let i = 0;i<9;i++){
      if(cells[i].filled){
        return true;
      }
    }
    return false;
  }

  updateGrid(){
    if(this.gameInProgress){
      this.timer = setTimeout(()=>{
        this.updateGrid();
      },500);
      this.updatePiece(10);
    }
  }

  updatePiece(amount){
    var cells = this.cells.toArray();
    this.unfillPiece(cells);
    for(let i = 0;i<this.piece.coordinates.length;i++){
        this.piece.coordinates[i]+=amount;
    }
    this.fillPiece(cells);
    this.checkCollision();
  }

  unfillPiece(cells){
    for(let i = 0;i<this.piece.coordinates.length;i++){
      if(this.piece.coordinates[i] > -1)cells[this.piece.coordinates[i]].unfill();
    }
  }

  fillPiece(cells){
    for(let i = 0;i<this.piece.coordinates.length;i++){
        if(this.piece.coordinates[i] > -1)cells[this.piece.coordinates[i]].fill(this.piece.type);
    }
  }

  checkCollision(){
      for(let i = 0;i<this.piece.coordinates.length;i++){
        if(this.piece.coordinates[i] < 0) break;
        var cell = this.cells.find((element,index,array)=>{
          return index == this.piece.coordinates[i]+10;
        });
        if(this.piece.coordinates[i] >= 190 || (cell.filled
          && this.piece.coordinates.indexOf(cell.index) == -1 ) ){
            if(!this.inRestart){
              clearTimeout(this.timer);
              this.inRestart = true;
              setTimeout(()=>{
                if(this.checkLoss() && !this.inRotation){
                  this.end();
                  return;
                }
                this.inRotation = false;
                this.inRestart = false;
                this.piece.restart();
                this.updateGrid();
              },300);
            }
        }
      }
  }

  rotate(){
    if(this.gameInProgress && !this.inRestart && !this.inRotation) {
      this.inRotation = true;
      setTimeout(()=>{
        this.inRotation = false;
      },100);
      var cells = this.cells.toArray();
      var newCords = this.piece.rotate();
      for(let i = 0;i<newCords.length;i++){
        if(cells[newCords[i]] == undefined || Math.abs((newCords[i]%10) - (this.piece.coordinates[i]%10)) > 6 ||
          (cells[newCords[i]].filled && this.piece.coordinates.indexOf(newCords[i]) == -1) ) return false;
      }
      this.piece.rotationCount++;
      this.unfillPiece(cells);
      this.piece.coordinates = newCords;
      this.fillPiece(cells);
      this.checkCollision();
    }
  }

  moveLeft(){
    if(this.gameInProgress && !this.leftEnd()) this.updatePiece(-1);
  }

  moveRight(){
    if(this.gameInProgress && !this.rightEnd()) this.updatePiece(1);
  }

  moveDown(){
    if(this.gameInProgress && !this.inRestart)this.updatePiece(10);
  }

  leftEnd(){
    for(let i = 0;i<this.piece.coordinates.length;i++){
      var cell = this.cells.find((element,index,array)=>{
        return index == this.piece.coordinates[i]-1;
      });
      if(Math.abs(this.piece.coordinates[i])%10 == 0 || (cell != undefined && cell.filled
        && this.piece.coordinates.indexOf(cell.index) == -1) ){
        return true;
      }
    }
    return false;
  }

  rightEnd(){
    for(let i = 0;i<this.piece.coordinates.length;i++){
      var cell = this.cells.find((element,index,array)=>{
        return index == this.piece.coordinates[i]+1;
      });
      if(this.piece.coordinates[i]%10 == 9 || (cell != undefined && cell.filled)
      && this.piece.coordinates.indexOf(cell.index) == -1 ){
        return true;
      }
      else if(this.piece.coordinates[i] < 0 && Math.abs(this.piece.coordinates[i])%10 == 1) return true;
    }
    return false;
  }

}
