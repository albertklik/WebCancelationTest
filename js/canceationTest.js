
(function () {
    
    /**
     * @class CancelationTest
     * @constructor
     * 
     * central control of the cancelation test. has the all instances that manages
     * the test and store the result in the end of defined time
     */
    
    //constructor
    function CancelationTest(time_seconds, n_goals, n_distractors) 
    {
        //public properties


        //private properties
        
        this._time_seconds = time_seconds || 20000;

        this._n_goals = n_goals || 3;

        this._n_distractors = n_distractors || 10;

    }

    //static readonly properties
    CancelationTest.GOAL_TYPES = [
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