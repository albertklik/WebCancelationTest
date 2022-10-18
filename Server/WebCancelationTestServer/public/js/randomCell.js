/**
 * @module
 */
 this.CancelationTest = this.CancelationTest || {}

 /**
  * @constructor
  */
 function RandomCell(size,resolution, nGoals, nDistractors, goal, distractors, aligned) {
     
    //start parameters
    this.size = size || 3;
    this.resolution = resolution || {};
    this.nGoals = nGoals || 3;
    this.nDistractors = nDistractors || 3;
    this.goal = goal || { id:1 };
    this.distractors = distractors || [];
    this.aligned = aligned || false;
    this.automaticDistractors = !this.nDistractors || this.nDistractors == 0
    this.type = "RANDOM_CELL" 
    this.positions = new Positions();
 
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
 
 RandomCell.prototype.setupParameters = function () {
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

 RandomCell.prototype.getCellResolution = function() {
   this.width = this.resolution.width / this.size;
   this.height = this.resolution.height / this.size;
 }

 
 RandomCell.prototype.putObjects = function(id = 0) {
   var randomCell = this.positions.getRandomCell(this.nGoals, this.nDistractors);
   
   randomCell.positions.forEach((element,i) => {
      var b_id = id.toString() + i;
      var obj = {};
      if (element.type == 'g') {
        obj = {
          board_id: b_id, 
          id: this.goal.id, 
          name: this.goal.name, 
          item: this.goal
        };
      } else {
        var distractor = this.distractors[Math.floor(Math.random() * this.distractors.length)];
        obj = {
          board_id: b_id, 
          id: distractor.id, 
          name: distractor.name, 
          item: distractor
        };
      }
      this.cell_map.push({ 
        board_id: obj.board_id,
        id: obj.id,
        name: obj.name,
        item : obj.item, 
        objX: this.width * (element.px/100.0),
        objY: this.height * (element.py/100.0),
        objWidth: (randomCell.size[0]/100.0) * this.width, 
        objHeight: (randomCell.size[0]/100.0) * this.width});
   });
 }
   
 RandomCell.prototype.generateCell = function(id = 0) {
   //starting parameters 
   this.distractorsList = [];
   this.goalList = [];
   this.cell_map = [];
     
   this.putObjects(id);
   return { 
     id : id,
     width: this.width,
     height: this.height,
     map: this.cell_map 
   };
 }
 
 RandomCell.prototype.generateBoard = function() {
   this.setupParameters();
   this.getCellResolution();
 
   this.board = {
     type: this.type,
     size: this.size,
     ngoals: this.nGoals,
     nDistractors: this.nDistractors,
     goal: this.goal,
     aligned: this.aligned,
     resolution : this.resolution,
     showResultType : 0,
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
 