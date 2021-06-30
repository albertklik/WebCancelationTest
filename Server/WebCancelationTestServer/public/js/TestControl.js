

var baseData = {
    img_path : "assets/icons/",
    goalTypes : [
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
    ],
    debug : false,
    log: function(data) {
     if (baseData.debug) {
         console.log(data);
     }
    }
}


function TestControl(data,canvasId,debug) {
    
    this.clicks = [];
    this.startTime = 0;
    this.hits = 0;
    this.misses = 0;
    this.data = data;
    this.resolution = data.resolution;
    this.canvasId = canvasId;
    this.time_seconds = data.time_seconds || 20000;
    this.n_goals = data.n_goals || 3;
    this.n_distractors = data.n_distractors || 0;
    this.goal = baseData.goalTypes.find(e => e.id == data.goal_id) || baseData.goalTypes[0];
    this.aligned = data.aligned || false;
    this.time_limit = data.time_limit || Math.max(data.time_limit,10);
    this.callbacks = data.callbacks;
    this.render = {};
    this.testEnabled = false;
    this.debug = debug || false;
    this.board = new Board(3,this.n_goals,this.n_distractors,this.goal,this.resolution,this.aligned);

    this.setup();
 }

    TestControl.prototype.setup = function() {
        var self = this;
        baseData.debug = this.debug;
        
        //inicia as 9 celulas com parametros estabelecidos
        this.board.generateRandom();
        //renderiza na tela
        this.render = new Render(
            this.canvasId,
            this.resolution,
            this.board.cells,
            baseData.img_path,
            baseData.goalTypes, 
            function (item,event) {
                self.onClickIcon(item,event);        
            });

        this.render.startTest();
        
        createjs.Ticker.addEventListener("tick", function() {
            self.tick();
        });
    }

    TestControl.prototype.startTest = function() {
        this.startTime =  (new Date()).getTime();
        this.testEnabled = true;
        baseData.log({
            message : "test started",
            startTime : (new Date()).getTime()
        });
    }

    TestControl.prototype.onClickIcon = function(item, event) {
        if (!this.testEnabled)
        return;
        var time = (new Date()).getTime();
        var hit = item.id == this.goal.id;
        if (hit) {
        this.hits ++;
        } else {
        this.misses ++;
        }
        
        this.clicks.push({ 
            time : time, 
            x : event.stageX, 
            y : event.stageY, 
            item : item, 
            hit : hit
        });

        baseData.log({
            message : "click detected",
            data: this.clicks
        });
    }

    TestControl.prototype.tick = function() {
        if (!this.testEnabled)
            return;
        var seconds = ((new Date()).getTime() - this.startTime)/1000;
        if (seconds >= this.time_limit) {
           this.callbacks.testFinished({
            result : this.clicks,
            seconds : seconds,
            hits : this.hits,
            misses : this.misses,
            student_id : testData.student.id,
        });
        this.testEnabled = false;
        baseData.log({
            message : "test finished",
            seconds : seconds,
            clicks : this.clicks
        });               
        }
    }

    function Board(size,n_goals,n_distractors,goal,resolution,aligned) {
        this.size = size;
        this.resolution = resolution;
        this.n_goals = n_goals;
        this.n_distractors = n_distractors;
        this.goal = goal;
        this.aligned = aligned || false;
        this.cells = [];
        this.setup();
    }

    Board.prototype.setup = function() {
        for (var x = 0; x < this.size; x++) {
            var row = this.cells[x] = [];
            for (var y = 0; y < this.size; y++) {
              row.push(null);
            }
          }
    }

    Board.prototype.generateRandom = function() {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                this.cells[i][j] = new RandomGrid(this.resolution,this.n_goals,this.n_distractors,this.goal,baseData.goalTypes.filter(e => e.id != this.goal.id),this.aligned);
                this.cells[i][j].name = "celula " + i +" " + j;
            }
        }
    }

    

    


    

