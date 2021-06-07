

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
    ]
}


     //constructor
    function TestControl(data,canvasId) 
    {
    //public properties
    this.clicks = [];
    this.startTime;
    this.data = data;
    this.resolution = data.resolution;
    this.canvasId = canvasId;
    this.time_seconds = data.time_seconds || 20000;
    this.n_goals = data.n_goals || 3;
    this.n_distractors = data.n_distractors || 0;
    this.goal = data.goal || baseData.goalTypes[0];
    this.alinhado = false;
    this.render;
    this.board = new Board(3,this.n_goals,this.n_distractors,this.goal,this.resolution);

    this.setup();
    }

    TestControl.prototype.setup = function() {
        var self = this;
        //inicia as 9 celulas com parametros estabelecidos
        this.board.generateRandom();
        

        //renderiza na tela
        this.render = new Render(this.canvasId,this.resolution,this.board.cells,baseData.img_path,baseData.goalTypes, function (item,event) {
            var time = (new Date()).getTime();
            self.clicks.push({ 
                time : time, 
                x : event.stageX, 
                y : event.stageY, 
                item : item, 
                hit : item.id == baseData.goalTypes[0].id ? 1 : 0 
            });
        });
        this.render.startTest();
        //createjs.Ticker.addEventListener("tick", this.tick);
    }

    TestControl.prototype.startTest = function() {
        this.startTime =  (new Date()).getTime();
    }

    

    // TestControl.prototype = {
    //     tick: function () {
    //         if (((new Date()).getTime() - this.startTime)/1000 >=10) {
    //             alert("test finished");
    //             alert("test: " + JSON.stringify(this.cells))
    //             alert("result: " + JSON.stringify(this.clicks));
    //         }
    //     },

    //     //reajusta o tamanho da tela
    //     resize: function (width,heigt) {
    //         this.render.resize(width,heigt);
    //     }
    // }

    function Board(size,n_goals,n_distractors,goal,resolution,alinhado) {

        this.size = size;
        this.resolution = resolution;
        this.n_goals = n_goals;
        this.n_distractors = n_distractors;
        this.goal = goal;
        this.alinhado = alinhado || false;
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
                this.cells[i][j] = new RandomGrid(this.resolution,this.n_goals,this.n_distractors,this.goal,baseData.goalTypes.slice(1,12),this.alinhado);
                this.cells[i][j].name = "celula " + i +" " + j;
            }
        }
    }

    

    


    

