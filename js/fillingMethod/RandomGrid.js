/**
 * @module
 */
this.CancelationTest = this.CancelationTest || {}

/**
 * @constructor
 */
function RandomGrid(resolution, nGoals, nDistractors, goal, distractors, aligned) {
    
   //private methods
   this.distractors = distractors || [{id : 2},{ id : 3},{ id : 4},{ id: 5}],
   this.nGoal = nGoals || 3,
   this.nDistractors = nDistractors || 0;
   
   this.cell_width =  0;
   this.cell_height =  0;
   this.width = 0;
   this.height = 0;  
   this.goal = goal || { id:1 };
   this.cell_map = [];
   this.goalList = [];
   this.distractorsList = [];
   this.resolution = resolution || {};
   this.aligned = aligned || false;
   
}

RandomGrid.prototype = {

  getCellSize: function() {
    if (this.nDistractors == 0) {
      this.cell_height = Math.ceil(Math.sqrt(this.nGoal + 20));
    } else {
      this.cell_height = Math.ceil(Math.sqrt(this.nGoal + this.nDistractors));
    }
    
    this.cell_width = this.cell_height + Math.ceil(this.cell_height/2);
  },

  getCellResolution: function() {
    this.width = this.resolution.width / 3;
    this.height = this.resolution.height / 3;
  },

  checkIfVoid: function(x,y) {
    return this.cell_map[x][y] == undefined;
  },

  putObj: function (obj,x,y) {
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
  },

  getRandomPos: function() {
      var x = Math.floor(Math.random() * this.cell_width);
      var y = Math.floor(Math.random() * this.cell_height);
      return new Array(x,y);
  },

  putObjects: function() {
    while (this.goalList.length < this.nGoal) {
    var pos = this.getRandomPos();
    this.putObj({id: this.goal.id, name: this.goal.name, item: this.goal },pos[0],pos[1]);
    }

    //if the number of distractors is default, fill all empty spaces.
    if (this.nDistractors == 0) {
      for (let i = 0; i < this.cell_width; i++) {
        for (let j = 0; j < this.cell_height; j++) {
          if (this.cell_map[i][j] == undefined) {
            var distractor = this.distractors[Math.floor(Math.random() * this.distractors.length)];
            this.cell_map[i][j] = {id: distractor.id, name: distractor.name, item: distractor};
          }
        }
      }
      return;
    }

    while (this.distractorsList.length < this.nDistractors) {
    var pos = this.getRandomPos();
    var distractor = this.distractors[Math.floor(Math.random() * this.distractors.length)];
    this.putObj({id: distractor.id, name: distractor.name, item: distractor},pos[0],pos[1]);
    }

  },

  setObjPosition: function() {
  var objWidth = this.width/this.cell_width;
  var objHeight = this.height/this.cell_height; 
  this.cell_map.forEach((element,i) => {
    element.forEach((item,j) => {
        if (item) {
        console.log("item coluna " + i + " linha " + j + " objeto " + item.name);
          item.width = objWidth/2;
          item.height = objHeight/2;

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
  },

  randomPosition: function (item,objWidth,objHeight) {
    var maxVariationX = objWidth/2;
    var maxVariationY = objHeight/2;
    var variationX = Math.random() * maxVariationX;
    var variationY = Math.random() * maxVariationY;
    item.x += variationX;
    item.y += variationY;
  },


  //starter function
  start: function() { 
    this.getCellSize();
    this.getCellResolution();
    this.cell_map = Array(this.cell_width).fill().map(() => Array(this.cell_height).fill());
    this.putObjects();
    this.setObjPosition();
    return this;
  }

}