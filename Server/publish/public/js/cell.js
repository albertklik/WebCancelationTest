/**
 * @module
 */
 this.CancelationTest = this.CancelationTest || {}

 /**
  * @constructor
  */
 function Cell(widht, height, nGoals, nDistractors, goal, distractors) {
     
    //private methods
    this.distractors = distractors || [{id : 2},{ id : 3},{ id : 4},{ id: 5}],
    this.nGoal = nGoals || 3,
    this.nDistractors = nDistractors || 30;
    this.widht =  widht || 15;
    this.height =  height || 7;  
    this.goal = goal || { id:1 };
    this.cell_map = Array(this.widht).fill().map(() => Array(this.height).fill());
    this.goalList = [];
    this.distractorsList = [];
 }

 Cell.prototype = {

    //verificar espaço vazio no tabuleiro
    checkIfVoid : function (x,y) {
        return this.cell_map[x][y] == undefined;
    },

    getRandomPos : function() {
        var x = Math.floor(Math.random() * this.widht);
        var y = Math.floor(Math.random() * this.height);
        return new Array(x,y);
    },

    putObj : function (obj,x,y) {
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

    iniciar : function () {
        while (this.goalList.length < _nGoal) {
            var pos = this.getRandomPos();
            this.putObj(obj.goal,pos[0],pos[1]);
        }
        
        while (this.distractorsList.length < _nDistractors) {
            var pos = obj.getRandomPos();
            obj.putObj(_distractors[Math.floor(Math.random() * _distractors.length)],pos[0],pos[1]);
        }
        return this;
    }
 }