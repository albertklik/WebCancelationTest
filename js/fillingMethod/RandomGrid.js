/**
 * @module
 */
this.CancelationTest = this.CancelationTest || {}

/**
 * @constructor
 */
function RandomGrid(resolution, nGoals, nDistractors, goal, distractors) {
    
   //private methods
   var _distractors = distractors || [{id : 2},{ id : 3},{ id : 4},{ id: 5}],
       _nGoal = nGoals || 3,
       _nDistractors = nDistractors || 30;
   
   _cell_width =  0;
   _cell_height =  0;
   _width = 0;
   _height = 0;  
   _goal = goal || { id:1 };
   _cell_map = [];
   _goalList = [];
   _distractorsList = [];


   this.getCellMap = function() {
     return _cell_map;
   }

   //private methods
   this.getCellSize = function() {
     _cell_height = Math.ceil(Math.sqrt(_nGoal+_nDistractors));
     _cell_width = _cell_height + Math.ceil(_cell_height/2);
   };

   this.getCellResolution = function() {
       _width = resolution.width / 3;
       _height = resolution.height / 3;
   };

   this.checkIfVoid = function(x,y) {
    return _cell_map[x][y] == undefined;
   };

   this.putObj = function (obj,x,y) {
    if (this.checkIfVoid(x,y)) {
        _cell_map[x][y] = obj;
        if (obj.id == _goal.id) {
            _goalList.push({ item : obj, position : [x,y]});
        }
        else {
            _distractorsList.push({ item : obj, position : [x,y]});
        }
        return true;
    }
    return false;
   };

   //public methods
   this.getRandomPos = function() {
       var x = Math.floor(Math.random() * _cell_width);
       var y = Math.floor(Math.random() * _cell_height);
       return new Array(x,y);
   };



   this.putObjects = function() {
     

     while (_goalList.length < _nGoal) {
      var pos = this.getRandomPos();
      this.putObj(_goal,pos[0],pos[1]);
     }

     while (_distractorsList.length < _nDistractors) {
      var pos = this.getRandomPos();
      this.putObj(_distractors[Math.floor(Math.random() * _distractors.length)],pos[0],pos[1]);
     }

   };

   this.setObjPosition = function() {
    var objWidth = _width/_cell_width;
    var objHeight = _height/_cell_height; 
    _cell_map.forEach((element,i) => {
      element.forEach((item,j) => {
          if (item) {
          console.log("item coluna " + i + " linha " + j + "objeto " + item.name);
            item.width = objWidth/2;
            item.height = objHeight/2;
            item.x = (objWidth * i) + (objWidth/4);
            item.y = (objHeight  * j) + (objHeight/4);
          }
      })
    });
   };


   //starter function
   this.start = function() { 
     this.getCellSize();
     this.getCellResolution();
     _cell_map = Array(this.cell_width).fill().map(() => Array(this.cell_height).fill());
     this.putObjects();
     this.setObjPosition();
   };

   
  this.start();
}