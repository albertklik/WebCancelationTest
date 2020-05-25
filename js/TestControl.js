
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
    function TestControl(time_seconds, n_goals, n_distractors) 
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

    var _goal_types = this.GOAL_TYPES; 
    var _clicks = [];
    var _startTime;

        //private properties
        
        var _time_seconds = time_seconds || 20000,
        _n_goals = n_goals || 3,
        _n_distractors = n_distractors || 10;
        this.cells =  Array(3).fill().map(() => Array(3).fill()); 
        _cells = this.cells;
        this.render;

        this.onClick = function (item,event) {
            var time = (new Date()).getTime();
            _clicks.push({ 
                time : time, 
                x :event.stageX, 
                y : event.stageY, 
                item : item, 
                hit : item.id == _goal_types[0].id ? 1 : 0 
            });
        }
        
        this.init  =  function() {
            //inicia as 9 celulas com parametros estabelecidos
            this.cells.forEach((element,i) => {
                element.forEach((item,j) => {
                    this.cells[i][j] = new Cell(15,7,3,35,this.GOAL_TYPES[0],this.GOAL_TYPES.slice(1,12));
                });
            });

            

            //renderiza na tela
            this.render = new Render(this.cells,this.IMG_PATH,this.GOAL_TYPES,this.onClick);
            _startTime = (new Date()).getTime();
            createjs.Ticker.addEventListener("tick", tick);
            function tick(){
                if (((new Date()).getTime() - _startTime)/1000 >=60) {
                    alert("test finished");
                    alert("test: " + JSON.stringify(_cells))
                    alert("result: " + JSON.stringify(_clicks));
                }
            }
        }

        //reajusta o tamanho da tela
        this.resize = function (width,heigt) {
            this.render.resize(width,heigt);
        }


        
    }

    

    


    

