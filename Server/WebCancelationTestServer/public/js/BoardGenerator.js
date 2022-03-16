
function Board(size,n_goals,n_distractors,goal_id,resolution,aligned) {
    this.goalTypes = [
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
    this.size = size || 3;
    this.resolution = resolution;
    this.n_goals = n_goals;
    this.n_distractors = n_distractors;
    this.goal = baseData.goalTypes.find(e => e.id == goal_id) || baseData.goalTypes.first();
    this.aligned = aligned || false;
    this.randomGridGenerator = new RandomGrid(this.size,this.resolution,this.n_goals,this.n_distractors,this.goal,this.goalTypes.filter(e => e.id != this.goal.id),this.aligned);
}

Board.prototype.generateRandom = function() {
     return this.randomGridGenerator.generateBoard();
}