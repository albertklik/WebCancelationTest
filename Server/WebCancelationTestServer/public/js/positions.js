
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
            size: [17.18,8.8],
            positions: [
                { type:'g', px: 5.12, py: 0.00 },
                { type:'d', px: 15.52, py: 5.31 },
                { type:'d', px: 31.04, py: 1.87 },
                { type:'d', px: 43.2, py: 5.62 },
                { type:'g', px: 59.52, py: 0.0 },
                { type:'d', px: 73.6, py: 0.0 },
                { type:'d', px: 90.88, py: 4.37 },
                // { type:'g', px: 00.00, py: 00.00 },
                // { type:'g', px: 00.00, py: 00.00 },
                // { type:'g', px: 00.00, py: 00.00 },
                // { type:'g', px: 00.00, py: 00.00 },
                // { type:'g', px: 00.00, py: 00.00 },
                // { type:'g', px: 00.00, py: 00.00 },
                // { type:'g', px: 00.00, py: 00.00 },
                // { type:'g', px: 00.00, py: 00.00 },
                // { type:'g', px: 00.00, py: 00.00 },
                // { type:'g', px: 00.00, py: 00.00 },
                // { type:'g', px: 00.00, py: 00.00 },
                // { type:'g', px: 00.00, py: 00.00 },
                // { type:'g', px: 00.00, py: 00.00 },
                // { type:'g', px: 00.00, py: 00.00 },
                // { type:'g', px: 00.00, py: 00.00 },
                // { type:'g', px: 00.00, py: 00.00 },
                // { type:'g', px: 00.00, py: 00.00 },
                // { type:'g', px: 00.00, py: 00.00 },
                // { type:'g', px: 00.00, py: 00.00 },
                // { type:'g', px: 00.00, py: 00.00 },
                // { type:'g', px: 00.00, py: 00.00 }
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