/**
 * @module
 */
this.CancelationTest = this.CancelationTest || {}

/**
 * @constructor
 */
function RandomGrid(size,resolution, nGoals, nDistractors, goal, distractors, aligned) {
    
   //start parameters
   this.size = size || 3;
   this.resolution = resolution || {};
   this.nGoals = nGoals || 3;
   this.nDistractors = nDistractors || 0;
   this.goal = goal || { id:1 };
   this.distractors = distractors || [];
   this.aligned = aligned || false;
   this.automaticDistractors = !this.nDistractors || this.nDistractors == 0

   //generated parameters
   this.cell_width =  0;
   this.cell_height =  0;
   this.width = 0;
   this.height = 0;  
   this.cell_map = [];
   this.board = {};

   //aux generating parameters
   this.goalList = [];
   this.distractorsList = [];
}

RandomGrid.prototype.setupParameters = function () {
  //generated parameters
  this.cell_width =  0;
  this.cell_height =  0;
  this.width = 0;
  this.height = 0;  
  this.cell_map = [];
  this.board = {};
  this.automaticDistractors = !this.nDistractors || this.nDistractors == 0

  //aux generating parameters
  this.goalList = [];
  this.distractorsList = [];
}

RandomGrid.prototype.getCellSize = function () {
  if (this.automaticDistractors) {
    var distractors = Math.pow(this.nGoals,2);
    this.cell_height = this.findCellHeight(this.nGoals,distractors);
  } else {
    this.cell_height = this.findCellHeight(this.nGoals,this.nDistractors);
  }
  this.cell_width = this.cell_height + Math.ceil((this.cell_height/2));
}

RandomGrid.prototype.findCellHeight = function (nGoals,nDistractors) {
  var height = -1.1;
  var sum = nGoals + nDistractors ;
  var incrementer = -1;
  while (!(Number.isInteger(height) && height < (sum + incrementer))) {
    incrementer ++;
    height = Math.sqrt((sum + incrementer));
  }
  height = Math.max(height,4); 
  return height;
}

RandomGrid.prototype.getCellResolution = function() {
  this.width = this.resolution.width / this.size;
  this.height = this.resolution.height / this.size;
}

RandomGrid.prototype.checkIfVoid = function(x,y) {
  return this.cell_map[x][y] == undefined;
}

RandomGrid.prototype.putObj = function (obj,x,y) {
  if (this.checkIfVoid(x,y)) {
    this.cell_map[x][y] = obj;
      if (obj.id == this.goal.id) {
        this.goalList.push({ item : obj, position : [x,y]});
      }
      else {
        this.distractorsList.push({ item : obj, position : [x,y]});
      }
      return true;
  }
  return false;
}

RandomGrid.prototype.getRandomPos = function() {
  var x = Math.floor(Math.random() * this.cell_width);
  var y = Math.floor(Math.random() * this.cell_height);
  return new Array(x,y);
}

RandomGrid.prototype.putObjects = function(id = 0) {
  while (this.goalList.length < this.nGoals) {
  var pos = this.getRandomPos();
  var b_id = id.toString() + pos[0].toString() + pos[1].toString();
  this.putObj({board_id: b_id, id: this.goal.id, name: this.goal.name, item: this.goal },pos[0],pos[1]);
  }

  //if the number of distractors is default, fill all empty spaces.
  if (this.automaticDistractors) {
    for (let i = 0; i < this.cell_width; i++) {
      for (let j = 0; j < this.cell_height; j++) {
        if (this.cell_map[i][j] == undefined) {
          var b_id = id.toString() + i.toString() + j.toString();
          var distractor = this.distractors[Math.floor(Math.random() * this.distractors.length)];
          this.cell_map[i][j] = {board_id: b_id, id: distractor.id, name: distractor.name, item: distractor};
        }
      }
    }
    return;
  }

  while (this.distractorsList.length < this.nDistractors) {
  var pos = this.getRandomPos();
  var b_id = id.toString() + pos[0].toString() + pos[1].toString();
  var distractor = this.distractors[Math.floor(Math.random() * this.distractors.length)];
  this.putObj({board_id: b_id, id: distractor.id, name: distractor.name, item: distractor},pos[0],pos[1]);
  }

} 

RandomGrid.prototype.setObjPosition = function() {
  var objWidth = this.width/this.cell_width;
  var objHeight = this.height/this.cell_height; 
  this.cell_map.forEach((element,i) => {
    element.forEach((item,j) => {
        if (item) {
        //console.log("item coluna " + i + " linha " + j + " objeto " + item.name);
          item.width = objWidth/2;
          item.height = objHeight/2;
          item.objWidth = objWidth;
          item.objHeight = objHeight;
          item.objX = objWidth * i;
          item.objY = objHeight  * j;

          if (this.aligned) {
            item.x = (objWidth * i) + (objWidth/4);
            item.y = (objHeight  * j) + (objHeight/4);
            
          } else {
            item.x = (objWidth * i);
            item.y = (objHeight  * j);
            this.randomPosition(item,objWidth,objHeight);
          }
          
        }
    })
  });
}

RandomGrid.prototype.randomPosition = function (item,objWidth,objHeight) {
  var maxVariationX = objWidth/2;
  var maxVariationY = objHeight/2;
  var variationX = Math.random() * maxVariationX;
  var variationY = Math.random() * maxVariationY;
  item.x += variationX;
  item.y += variationY;
}

// RandomGrid.prototype.getRandomElementIndex = function (cellMap,filterByUndefined = false) {
//   var filteredList = array
//   if (filterByUndefined)
// }

RandomGrid.prototype.generateCell = function(id = 0) {
  //starting parameters 
  this.distractorsList = [];
  this.goalList = [];
  this.cell_map = Array(this.cell_width);
  for (var i = 0; i < this.cell_width; i++) {
    this.cell_map[i] = Array(this.cell_height);
  }
    
  this.putObjects(id);
  this.setObjPosition();
  return { 
    id : id,
    width: this.width,
    height: this.height,
    cell_width: this.cell_width,
    cell_heigth: this.cell_height,
    map: this.cell_map 
  };
}

RandomGrid.prototype.generateBoard = function() {
  this.setupParameters();
  this.getCellSize();
  this.getCellResolution();

  this.board = {
    size: this.size,
    ngoals: this.nGoals,
    nDistractors: this.nDistractors,
    goal: this.goal,
    aligned: this.aligned,
    resolution : this.resolution,
    cells : [
      Array(this.size),
      Array(this.size),
      Array(this.size),
    ]
  };
  var id = 1
  for (var i = 0; i < this.size; i++)
    for (var j = 0; j < this.size; j++) {
        this.board.cells[i][j] = this.generateCell(id);
        id++;
    }
  return this.board;
}
