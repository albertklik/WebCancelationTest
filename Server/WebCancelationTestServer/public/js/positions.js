
/**
 * @module
 */
 this.CancelationTest = this.CancelationTest || {}

 /**
  * @constructor
  */
function Positions() { 
this.positions = [{
    goals:3,
    distractors:3,
    aligned: true,
    cells: [
      {
        cell_id: 030301,
        size: [20.00,20.00],
        positions: [
            { type:'g', px: 15.00, py: 15.00 },
            { type:'d', px: 50.00, py: 15.00 },
            { type:'g', px: 75.00, py: 15.00 },
            { type:'d', px: 35.00, py: 75.00 },
            { type:'g', px: 50.00, py: 75.00 },
            { type:'d', px: 75.00, py: 75.00 }
        ]
      }
    ]
},
{
    goals:3,
    distractors:17,
    aligned: false,
    cells: [
        {
            cell_id: 031701,
            positions: []
        }
    ]
}

];
}

Positions.prototype.getRandomCell = function(g, d) {
    var result = {};
    var cell = this.positions.find(e => e.distractors == d && e.goals == g);
    if (cell != null) {
        if (cell.cells.length > 1) 
            result = cell.cells[Math.floor(Math.random()*cell.cells.length)];
        else result = cell.cells[0];
    }
    return result;
}