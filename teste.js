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

(function () {
    
    /**
     * @class TestControl
     * 
     * 
     * @constructor
     * 
     * central control of the cancelation test. has the all instances that manages
     * the test and store the result in the end of defined time
     */
    
    //constructor
    function TestControl(time_seconds, n_goals, n_distractors) 
    {
        //public properties


        //private properties
        
        var _time_seconds = time_seconds || 20000,
        _n_goals = n_goals || 3,
        _n_distractors = n_distractors || 10;
        this.cells = new Array(9).fill(new Cell(20,10,3,10,GOAL_TYPES[0],GOAL_TYPES.slice(1,12))); 

    }

    //static readonly properties
    TestControl.GOAL_TYPES = [
        { id : 1, name : "carro" },
        { id : 2, name : "casa" },
        { id : 3, name : "arvore" },
        { id : 4, name : "bule" },
        { id : 5, name : "sol" },
        { id : 6, name : "galinha" },
        { id : 7, name : "coelho" },
        { id : 8, name : "gato" },
        { id : 9, name : "flor" },
        { id : 10, name : "peixe" },
        { id : 11, name : "estrela" },
        { id : 12, name : "aviao" },
        { id : 13, name : "barco" }
    ];

}


)();