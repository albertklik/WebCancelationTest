
/**
 * @escope
 * 
 */
this.CancelationTest = this.CancelationTest || {}

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
    function TestControl(data,time_seconds, n_goals, n_distractors) 
    {
    //public properties
    this.IMG_PATH = "assets/icons/";
    this.GOAL_TYPES = [
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

    this.clicks = [];
    this.startTime;
    this.data = data;
    this.time_seconds = time_seconds || 20000,
    this.n_goals = n_goals || 3,
    this.n_distractors = n_distractors || 10;
    this.alinhado = false;
    this.render;

    this.cells =  [
        [new RandomGrid(this.data.resolution,3,null,this.GOAL_TYPES[0],this.GOAL_TYPES.slice(1,12),this.alinhado).start(),
     new RandomGrid(this.data.resolution,3,null,this.GOAL_TYPES[0],this.GOAL_TYPES.slice(1,12),this.alinhado).start(), 
      new RandomGrid(this.data.resolution,3,null,this.GOAL_TYPES[0],this.GOAL_TYPES.slice(1,12),this.alinhado).start()
    ],
    [
      new RandomGrid(this.data.resolution,3,null,this.GOAL_TYPES[0],this.GOAL_TYPES.slice(1,12),this.alinhado).start(),
       new RandomGrid(this.data.resolution,3,null,this.GOAL_TYPES[0],this.GOAL_TYPES.slice(1,12),this.alinhado).start(), 
       new RandomGrid(this.data.resolution,3,null,this.GOAL_TYPES[0],this.GOAL_TYPES.slice(1,12),this.alinhado).start()
    ],
    [
       new RandomGrid(this.data.resolution,3,null,this.GOAL_TYPES[0],this.GOAL_TYPES.slice(1,12),this.alinhado).start(), 
       new RandomGrid(this.data.resolution,3,null,this.GOAL_TYPES[0],this.GOAL_TYPES.slice(1,12),this.alinhado).start(), 
       new RandomGrid(this.data.resolution,3,null,this.GOAL_TYPES[0],this.GOAL_TYPES.slice(1,12),this.alinhado).start() 
    ]];
    }

    TestControl.prototype = {
        onClick: function (item,event) {
            var time = (new Date()).getTime();
            this.clicks.push({ 
                time : time, 
                x :event.stageX, 
                y : event.stageY, 
                item : item, 
                hit : item.id == this.goal_types[0].id ? 1 : 0 
            });
        },
        
        init:  function() {
            //inicia as 9 celulas com parametros estabelecidos
            this.cells.forEach((element,i) => {
                element.forEach((item,j) => {
                    //this.cells[i][j] = ;
                    this.cells[i][j].name = "celula " + i +" " + j;
                });
            });

            

            //renderiza na tela
            this.render = new Render(this.data.resolution,this.cells,this.IMG_PATH,this.GOAL_TYPES,this.onClick);
            this.render.startTest();
            this.startTime = (new Date()).getTime();
            createjs.Ticker.addEventListener("tick", this.tick);
            function tick(){
                
            }
        },

        tick: function () {
            if (((new Date()).getTime() - this.startTime)/1000 >=10) {
                alert("test finished");
                alert("test: " + JSON.stringify(this.cells))
                alert("result: " + JSON.stringify(this.clicks));
            }
        },

        //reajusta o tamanho da tela
        resize: function (width,heigt) {
            this.render.resize(width,heigt);
        }
    }

    

    


    

