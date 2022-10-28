/**
 * @escope
 * 
 */
this.CancelationTest = this.CancelationTest || {}

    /**
     * @class Render
     * 
     * 
     * @constructor
     * 
     * central control of the cancelation test. has the all instances that manages
     * the test and store the result in the end of defined time
     */
    
    //constructor
    function Render(renderConfig,canvasId,resolution,board,resultData,img_path,item_data,onclickEvent) 
    {
        this.defaultRenderConfig = {
            showTargets: false,
            hideIcons: false,
            identifyCells: false,
            identifyIcons: false,
            iconTransp: false,
            showResultType: 2 //0 - hit, 1 - misses, 2 - both
        }
        this.renderConfig = renderConfig || this.defaultRenderConfig;
        this.stage = new createjs.Stage(canvasId);
        this.board = board || {}
        this.canvasId = canvasId
        this.imgPath = img_path;
        this.cell_width = 0;
        this.cell_height = 0;
        this.cell_width = 0;
        this.cell_height = 0;
        this.block_width = 0;
        this.block_height = 0;
        this.item_data = item_data;
        this.img_data = [];
        this.onClickEvent = onclickEvent;
        this.imgLoaded = false;
        this.resolution = resolution;
        this.resultData = resultData;
    }

    Render.prototype.clear = function() {
        this.stage.removeAllChildren();
        this.stage.update();
    }

    Render.prototype.calcSizeBoard = function () {
        this.stage.canvas.width = this.resolution.width;
        this.stage.canvas.height = this.resolution.height;
        this.board_width = this.board.resolution.width;
        this.board_height = this.board.resolution.height;
        this.cell_width = this.board_width/3;
        this.cell_height = this.board_height/3;
        this.ratioX = this.resolution.width/this.board_width
        this.ratioY = this.resolution.height/this.board_height
        this.block_width = (this.cell_width)/this.board.cells[0][0].cell_width;
        this.block_height = (this.cell_height)/this.board.cells[0][0].cell_height;
    }

    Render.prototype.renderBoard = function () {
        this.loadImg();
        this.calcSizeBoard();
        this.stage.removeAllChildren();
        if (this.board.type == null || this.board.type == "RANDOM_GRID") {
            this.renderBoardGrid();
        } else if (this.board.type == "RANDOM_CELL") {
            this.renderBoardPercent();
        }
    }

    Render.prototype.renderBoardPercent = function () {
        this.board.cells.forEach((colunm,a) => {
                let start_pos_y = this.cell_height * a
            colunm.forEach((line,b) => {
                let start_pos_x = this.cell_width * b
                if (this.renderConfig.identifyCells) {
                    this.drawSquare(
                    start_pos_x * this.ratioX + 2,
                    start_pos_y * this.ratioY + 2,
                    (this.cell_width * this.ratioX) - 2,
                    (this.cell_height * this.ratioY) - 2,"red",1,line.id.toString());
                }
                line.map.forEach((item) => {
                    if (this.renderConfig.identifyIcons) {
                        this.drawSquare(
                        ((start_pos_x+item.objX) * this.ratioX) + 1,
                        ((start_pos_y+item.objY) * this.ratioY) + 1,
                        (item.objWidth * this.ratioX) - 1,
                        (item.objHeight * this.ratioY) - 1,"grey",1);
                        var textY = ((start_pos_y+item.objY) + item.objHeight) * this.ratioY;
                        var textX = ((start_pos_x+item.objX) + (item.width/2)) * this.ratioX
                        this.drawText(textX,textY,item.board_id.toString(),"10px Arial","grey");
                    }

                    if (this.renderConfig.hideIcons)
                        return; 

                    if (this.renderConfig.iconTransp) {
                        var alpha = .5
                    }    else {
                        var alpha = 1
                    }

                    var icon = new Icon(
                        this.onClickEvent,
                        this.stage,
                        item,
                        (start_pos_x+item.objX) * this.ratioX,
                        (start_pos_y+item.objY) * this.ratioY,
                        item.objWidth * this.ratioX,
                        item.objHeight * this.ratioY,
                        this.img_data,
                        alpha);
                    if (item.id == this.board.goal.id && this.renderConfig.showTargets) {
                        icon.markAsGoal2();
                    }

                });

            });
        });
    }

    Render.prototype.renderBoardGrid = function() {    
        
        this.board.cells.forEach((colunm,a) => {
            colunm.forEach((line,b) => {
                let start_pos_x = this.cell_width * a;
                let start_pos_y = this.cell_height * b;
                if (this.renderConfig.identifyCells) {
                    this.drawSquare(
                    start_pos_x * this.ratioX + 2,
                    start_pos_y * this.ratioY + 2,
                    (this.cell_width * this.ratioX) - 2,
                    (this.cell_height * this.ratioY) - 2,"red",1,line.id.toString());
                }
                line.map.forEach((element,i) => {
                    element.forEach((item,j) => {
                        if (item) {
                            if (this.renderConfig.identifyIcons) {
                                this.drawSquare(
                                ((start_pos_x+item.objX) * this.ratioX) + 1,
                                ((start_pos_y+item.objY) * this.ratioY) + 1,
                                (item.objWidth * this.ratioX) - 1,
                                (item.objHeight * this.ratioY) - 1,"grey",1);
                                var textY = ((start_pos_y+item.objY) + item.objHeight) * this.ratioY;
                                var textX = ((start_pos_x+item.objX) + (item.width/2)) * this.ratioX
                                this.drawText(textX,textY,item.board_id.toString(),"10px Arial","grey");
                            }
                            if (this.renderConfig.hideIcons)
                                return; 

                            if (this.renderConfig.iconTransp) {
                                var alpha = .5
                            }    else {
                                var alpha = 1
                            }
                            var icon = new Icon(
                                this.onClickEvent,
                                this.stage,
                                item,
                                (start_pos_x+item.x) * this.ratioX,
                                (start_pos_y+item.y) * this.ratioY,
                                item.width * this.ratioX,
                                item.height * this.ratioY,
                                this.img_data,
                                alpha);
                            if (item.id == this.board.goal.id && this.renderConfig.showTargets) {
                                icon.markAsGoal();
                            }
                        }
                    })
                });
            })
        })
        this.stage.update();
    }

    Render.prototype.renderTimeGraphics = function() {

    } 

    Render.prototype.renderResult = function() {
        var resultArray = JSON.parse(this.resultData.result);
        var lasPos = { x: 0, y: 0}
        var lastTime = 0;
        var maxTime = 0;
        var orderArr = [];

        if (this.renderConfig.showResultType == 0) {
            resultArray = resultArray.filter(function (item) {
                return item.hit
            });
        } else if (this.renderConfig.showResultType == 1) {
            resultArray = resultArray.filter(function (item) {
                return item.hit == false
            });
        }

        //check what is the max time
        resultArray.forEach((item,i) => {
            var time = (item.time - lastTime)/1000.0;
            if (lastTime == 0)
               time = 0
            lastTime = item.time;
            if (time > maxTime) 
              maxTime = time;

            if (orderArr[item.item.board_id] == undefined) {
                orderArr[item.item.board_id] = [i+1]
            } else {
                orderArr[item.item.board_id].push(i+1);
            } 
        });


        lastTime = 0;
        resultArray.forEach((item,i) => {
            var circleLengh = 2
            var quadrante = parseInt(item.item.board_id.substring(0,1));
            var start_pos_x = 0;
            var start_pos_y = 0;
            var time = (item.time - lastTime)/1000.0
            if (lastTime == 0)
               time = 0
            var timeRatio = time/maxTime;
            lastTime = item.time;
            
            lastTime = item.time;
            switch (quadrante) {
                case 2:
                start_pos_y = this.cell_height     
                break;
                case 3:
                start_pos_y = this.cell_height * 2
                break;
                case 4:
                start_pos_x = this.cell_width  
                break;
                case 5:
                start_pos_x = this.cell_width
                start_pos_y = this.cell_height 
                break;
                case 6:
                start_pos_x = this.cell_width
                start_pos_y = this.cell_height * 2
                break;
                case 7:
                start_pos_x = this.cell_width * 2
                break;
                case 8:
                start_pos_x = this.cell_width * 2
                start_pos_y = this.cell_height 
                break;
                case 9:
                start_pos_x = this.cell_width * 2
                start_pos_y = this.cell_height * 2
                break;
                default:
            }
            var actualPos = {
                x: ((start_pos_x + item.item.x + (item.item.width /2)) * this.ratioX),
                y: ((start_pos_y + item.item.y + (item.item.height / 2)) * this.ratioY)
            }
            if (i == 0) {
                circleLengh = 2
            } else if (i == resultArray.length - 1) {
                circleLengh = 2
                this.drawArrow(lasPos,actualPos,2 * timeRatio,"black");
            } else {
                circleLengh = 0.5
                this.drawArrow(lasPos,actualPos,2 * timeRatio,"black");
            }
            strCircle = ""
            orderArr[item.item.board_id].forEach((item,n) => {
                if (n>1) {
                   strCircle = "G" ;
                } else {
                   strCircle = (i + 1).toString(); 
                }
            });

            this.drawFilledCircle(
                actualPos.x, 
                actualPos.y,
                this.block_width/2.5,
                item.hit ? "green" : "red", 
                circleLengh,
                "black",
                strCircle
            );
            
            //this.drawText(actualPos.x + (item.item.width), actualPos.y - (item.item.height), strCircle, "15px Arial", item.hit ? "green" : "red");
            
            lasPos = actualPos
        });
        this.stage.update();
    }

    Render.prototype.drawStrokeCircle = function(x,y,diameter,color,strokeWidth) {
        var circle = new createjs.Shape();
        circle.graphics
        .setStrokeStyle(strokeWidth)
        .beginStroke(color)
        .drawCircle(
        x, 
        y, 
        diameter
        );
        this.stage.addChild(circle);
    }

    Render.prototype.drawFilledCircle = function(x,y,diameter,color,strokeWidth,colorStroke,text = "") {
        var circle = new createjs.Shape();
        circle.graphics.beginFill(color)
        .setStrokeStyle(strokeWidth)
        .beginStroke(colorStroke)
        .drawCircle(
        x, 
        y, 
        diameter
        );
        this.stage.addChild(circle);
        if (text.length > 0) {
            this.drawText(x-diameter/2,y,text,"12px Arial","black");
        }
    }

    Render.prototype.drawSquare = function(x,y,width,height,color,strokeWidth,text = "") {
        var square = new createjs.Shape();
        square.graphics.setStrokeStyle(strokeWidth).beginStroke(color);
        square.graphics.drawRect(x, y, width, height);
        this.stage.addChild(square);
        if (text.length > 0) {
            this.drawText(x,y + height - 1,text,"10px Arial",color);
        }
    }

    Render.prototype.drawLine = function(point1,point2,width,color) {
        var line = new createjs.Shape();
        line.graphics.setStrokeStyle(width).beginStroke(color);
        line.graphics.moveTo(point1.x, point1.y);
        line.graphics.lineTo(point2.x, point2.y);
        line.graphics.endStroke();
        this.stage.addChild(line);
    }

    Render.prototype.distance = function(from, to) {
        var dx = from.x - to.x;
        var dy = from.y - to.y;
        return Math.sqrt(dx * dx + dy * dy);
    }
    
    Render.prototype.angle = function(p1, p2) {
        return Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / Math.PI;
    }
    

    Render.prototype.drawArrow = function(point1,point2,width,color) {
        var LINE_RADIUS = width; // the short radius of the "line box"
        var ARROWHEAD_RADIUS = 7; // the arrowhead radius;
        var ARROWHEAD_DEPTH = 7;
        var CIRCLE_DISTANCE = 17;
        var start = point1;
        var end = point2;
        var arrow = new createjs.Shape();
        var arrowSize = this.distance(start, end) - CIRCLE_DISTANCE;
        var arrowRotation = this.angle(start, end);
        arrow.graphics.s(color)
                .f(color)
                .mt(CIRCLE_DISTANCE, 0)
                .lt(CIRCLE_DISTANCE, LINE_RADIUS)
                .lt(arrowSize - ARROWHEAD_DEPTH, LINE_RADIUS)
                .lt(arrowSize - ARROWHEAD_DEPTH, ARROWHEAD_RADIUS)
                .lt(arrowSize, 0)
                .lt(arrowSize - ARROWHEAD_DEPTH, -ARROWHEAD_RADIUS)
                .lt(arrowSize - ARROWHEAD_DEPTH, -LINE_RADIUS)
                .lt(CIRCLE_DISTANCE, -LINE_RADIUS)
                .lt(CIRCLE_DISTANCE, 0)
                .es();
        arrow.x = start.x;
        arrow.y = start.y;
        arrow.alpha = 1;
        arrow.rotation = arrowRotation;
        //item.arrow = arrow;
        this.stage.addChild(arrow);
    }

    Render.prototype.drawText = function(x,y,txt,font,color) {
        var text = new createjs.Text(txt, font, color);
        text.x = x;
        text.y = y;
        text.textBaseline = "alphabetic";
        this.stage.addChild(text);
    }

    Render.prototype.loadImg = function() {
        var self = this;
        if (!this.imgLoaded) {
            this.item_data.forEach(element => {
                var img_item = { id: element.id }
                img_item.img = new Image();
                img_item.img.src = this.imgPath + element.name + ".png";
                img_item.img.onload = function() {
                    self.updateStage();
                };
                this.img_data.push(img_item);
            });
            this.imgLoaded = true;
        }
    }

    Render.prototype.updateStage = function() {
        this.stage.update();
    }

