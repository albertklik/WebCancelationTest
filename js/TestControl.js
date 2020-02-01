
/**
 * @escope
 * 
 */
this.CancelationTest = this.CancelationTest || {}


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