
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
    goals:4,
    distractors:24,
    aligned: false,
    cells: [
        {
            cell_id: 042401,
            size: [8.8,17.18],
            positions: [
                { type:'g', px: 5.12, py: 0.00 },
                { type:'d', px: 15.52, py: 5.31 },
                { type:'d', px: 31.04, py: 1.87 },
                { type:'d', px: 43.2, py: 5.62 },
                { type:'g', px: 59.52, py: 0.0 },
                { type:'d', px: 73.6, py: 0.0 },
                { type:'d', px: 90.88, py: 4.37 },
                { type:'d', px: 7.84, py: 25.31 },
                { type:'d', px: 20.16, py: 32.18 },
                { type:'d', px: 35.68, py: 30.31 },
                { type:'d', px: 50.4, py: 25.0 },
                { type:'d', px: 64.64, py: 24.06 },
                { type:'d', px: 81.6, py: 29.06 },
                { type:'d', px: 0.0, py: 40.93 },
                { type:'d', px: 30.72, py: 50.93 },
                { type:'d', px: 52.32, py: 52.5 },
                { type:'d', px: 63.52, py: 57.81 },
                { type:'d', px: 75.52, py: 42.18 },
                { type:'d', px: 91.52, py: 50.31 },
                { type:'g', px: 5.92, py: 65.93 },
                { type:'d', px: 31.84, py: 71.56 },
                { type:'d', px: 47.04, py: 71.87 },
                { type:'d', px: 59.2, py: 79.06 },
                { type:'d', px: 74.72, py: 87.5 },
                { type:'g', px: 81.28, py: 65.62 },
                { type:'d', px: 21.76, py: 81.25 },
                { type:'d', px: 5.12, py: 86.56 },
                { type:'d', px: 17.6, py: 48.75 }
            ]
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