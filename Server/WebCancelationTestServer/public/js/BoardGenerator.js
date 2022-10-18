
function Board(boardData) {
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
    this.defaultBoardData = {
        size: 3,
        resolution: {width: 1980, height: 7668 },
        nTargets: 3,
        nDistractors: 0,
        goalId: this.goalTypes[0].id,
        aligned: false
    }
    this.boardData = boardData || this.defaultBoardData;
    this.goal = this.goalTypes.find(e => e.id == this.boardData.goalId) || this.goalTypes[0];
    
    //creating random grid object
    this.randomGridGenerator = new RandomGrid(
        this.boardData.size,
        this.boardData.resolution,
        this.boardData.nTargets,
        this.boardData.nDistractors,
        this.goal,
        this.goalTypes.filter(e => e.id != this.boardData.goalId),
        this.boardData.aligned
    );
    this.randomCellGenerator = new RandomCell(
        this.boardData.size,
        this.boardData.resolution,
        this.boardData.nTargets,
        this.boardData.nDistractors,
        this.goal,
        this.goalTypes.filter(e => e.id != this.boardData.goalId),
        this.boardData.aligned
    );
}

Board.prototype.updateBoardData = function(boardData) {
    this.boardData = boardData || this.defaultBoardData;
    this.randomGridGenerator = new RandomGrid(
        this.boardData.size,
        this.boardData.resolution,
        this.boardData.nTargets,
        this.boardData.nDistractors,
        this.goal,
        this.goalTypes.filter(e => e.id != this.boardData.goalId),
        this.boardData.aligned
    );
    this.randomCellGenerator = new RandomCell(
        this.boardData.size,
        this.boardData.resolution,
        this.boardData.nTargets,
        this.boardData.nDistractors,
        this.goal,
        this.goalTypes.filter(e => e.id != this.boardData.goalId),
        this.boardData.aligned
    );
}

Board.prototype.generateRandom = function() {
     return this.randomGridGenerator.generateBoard();
}

Board.prototype.generateRandomCell = function() {
    return this.randomCellGenerator.generateBoard();
}