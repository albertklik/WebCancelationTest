

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


function TestControl(data,canvasId,debug,resultData) {
    
    this.clicks = [];
    this.startTime = 0;
    this.hits = 0;
    this.misses = 0;
    this.data = data;
    this.resolution = data.resolution;
    this.canvasId = canvasId;
    this.time_seconds = data.time_seconds || 20000;
    this.goal = baseData.goalTypes.find(e => e.id == data.goal_id) || baseData.goalTypes[0];
    this.time_limit = data.time_limit || Math.max(data.time_limit,10);
    this.callbacks = data.callbacks;
    this.render = {};
    this.testEnabled = false;
    this.debug = debug || false;
    this.board = data.board || {};
    this.resultData = resultData || {};
    this.renderConfig = data.renderConfig;

    this.setup();
 }

    TestControl.prototype.setup = function() {
        var self = this;
        baseData.debug = this.debug;
        
        //inicialize render
        this.render = new Render(
            this.renderConfig,
            this.canvasId,
            this.resolution,
            this.board,
            this.resultData,
            baseData.img_path,
            baseData.goalTypes, 
            function (item,event) {
                self.onClickIcon(item,event);        
            });
        
        createjs.Ticker.addEventListener("tick", function() {
            self.tick();
        });
    }

    TestControl.prototype.changeBoard = function (board) {
        this.board = board;
        this.render.board = board;
    }

    TestControl.prototype.setResult = function (result) {
        this.resultData = result
        this.render.resultData = result
    }

    TestControl.prototype.renderBoard = function() {
        this.render.renderBoard();
    }

    TestControl.prototype.renderResult = function() {
        this.render.renderResult();
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
            x : (event.stageX / this.render.ratioX), 
            y : (event.stageY / this.render.ratioY), 
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
            this.testEnabled = false;
           this.callbacks.testFinished({
                result: this.clicks,
                seconds: seconds,
                hits: this.hits,
                misses: this.misses,
                board: this.board
                
            });
        baseData.log({
            message : "test finished",
            seconds : seconds,
            clicks : this.clicks
        });               
        }
    }
