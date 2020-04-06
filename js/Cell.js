/**
 * @module
 */
 this.CancelationTest = this.CancelationTest || {}

 /**
  * @constructor
  */
 function Cell(widht, height, nGoals, nDistractors, goal, distractors) {
     
    //private methods
    var _distractors = distractors || [{id : 2},{ id : 3},{ id : 4},{ id: 5}],
        _nGoal = nGoals || 3,
        _nDistractors = nDistractors || 30;
    this.widht =  widht || 15;
    this.height =  height || 7;  
    this.goal = goal || { id:1 };
    this.cell_map = Array(this.widht).fill().map(() => Array(this.height).fill());
    this.goalList = [];
    this.distractorsList = [];

    //properties
    Object.defineProperties(this,{
        "width" : { get : function() { return this.widht } },
        "heitght" : { get : function() { return this.height } },
    });

    //private methods
    /**
     * @function CheckIfVoid
     * verify if a position is avaliable
     * @argument x - x position
     * @argument y - y position
     */
    this.CheckIfVoid = function (x,y) {
        return this.cell_map[x][y] == undefined;
    };

    this.putObj = function (obj,x,y) {
        if (this.CheckIfVoid(x,y)) {
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
    };

    this.getRandomPos = function() {
        var x = Math.floor(Math.random() * this.widht);
        var y = Math.floor(Math.random() * this.height);
        return new Array(x,y);
    };

    //starter function
    (function (obj) {
        //seting up the goals
        while (obj.goalList.length < _nGoal) {
           var pos = obj.getRandomPos();
           obj.putObj(obj.goal,pos[0],pos[1]);
        }
      //setting up the distractors
        while (obj.distractorsList.length < _nDistractors) {
           var pos = obj.getRandomPos();
           obj.putObj(_distractors[Math.floor(Math.random() * _distractors.length)],pos[0],pos[1]);
       }
    })(this);

 }