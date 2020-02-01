/**
 * @module
 */
 this.CancelationTest = this.CancelationTest || {}

 /**
  * @constructor
  */
 function Cell(widht, height, nGoals, nDistractors, goal, distractors) {
     
    //private methods
    var _widht = widht || 20,
        _height = height || 10,
        _goal = goal || { id:1 },
        _distractors = distractors || [{id : 2},{ id : 3},{ id : 4},{ id: 5}],
        _nGoal = nGoals || 3,
        _nDistractors = nDistractors || 10;
    this.cell_map = Array(_widht).fill().map(() => Array(_height).fill());
    this.goalList = [];
    this.distractorsList = [];

    //properties
    Object.defineProperties(this,{
        "width" : { get : function() { return _widht } },
        "heitght" : { get : function() { return _height } },
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
            if (obj.id == _goal.id) {
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
        var x = Math.floor(Math.random() * (_widht - 1) + 1);
        var y = Math.floor(Math.random() * (_height - 1) + 1);
        return new Array(x-1,y-1);
    };

    //starter function
    (function (obj) {
        //seting up the goals
        while (obj.goalList.length < _nGoal) {
           var pos = obj.getRandomPos();
           obj.putObj(_goal,pos[0],pos[1]);
        }
      //setting up the distractors
        while (obj.distractorsList.length < _nDistractors) {
           var pos = obj.getRandomPos();
           obj.putObj(_distractors[Math.floor(Math.random() * _distractors.length)],pos[0],pos[1]);
       }
    })(this);

 }