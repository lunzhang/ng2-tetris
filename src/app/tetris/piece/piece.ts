export class Piece {

  public coordinates;
  public type;
  public rotation;
  public rotationCount;

  private defaultRotations = [[[2,11,20,29],[-2,-11,-20,-29]], //i-piece
  [[-9,0,9,-2],[11,0,-11,-20],[9,0,-9,2],[-11,0,11,20]], //j-piece
  [[9,0,-9,-20],[-11,0,11,2],[-9,0,9,20],[11,0,-11,-2]], //l-piece
  [[0,0,0,0]], //o-piece
  [[-11,0,-9,2],[11,0,9,-2]], //s-piece
  [[-9,0,9,-11],[9,0,-9,-9],[-9,0,9,11],[9,0,-9,9]], //t-piece
  [[-9,0,-11,-2],[9,0,11,2]]]; //z-piece
  private defaultTypes = ['i-piece','j-piece','l-piece','o-piece','s-piece','t-piece','z-piece'];
  private defaultCords = [[-7,-6,-5,-4], //i-piece
  [-6,-5,-4,6], //j-piece
  [-4,-5,-6,4], //l-piece
  [-6,-5,5,4], //o-piece
  [-4,-5,5,4], //s-piece
  [-6,-5,-4,5], //t-piece
  [-6,-5,5,6]]; //z-piece

  constructor(){
      this.restart();
  }

  /** assigns a new shape to piece
  reassigns coordinates,shapes,rotation
  resets rotationCount
  **/
  restart(){
    var shape = Math.floor(Math.random()*7);
    this.coordinates = this.defaultCords[shape].slice();
    this.type = this.defaultTypes[shape];
    this.rotation = this.defaultRotations[shape];
    this.rotationCount = 0;
  }

  /** rotates piece
  returns new rotated Cordinates
  **/
  rotate(){
    var rotation;
    rotation = this.rotation[Math.abs(this.rotationCount)%this.rotation.length];
    var newCords = [];
    for(let i = 0;i<this.coordinates.length;i++){
      newCords.push(this.coordinates[i] + rotation[i]);
    }
    return newCords;
  }

}