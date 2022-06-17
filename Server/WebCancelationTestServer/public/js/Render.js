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
        this.img_data = []
        this.onClickEvent = onclickEvent;
        this.imgLoaded = false;
        this.resolution = resolution;
        this.resultData = resultData;
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
        this.board.cells.forEach((colunm,a) => {
            colunm.forEach((line,b) => {
                let start_pos_x = this.cell_width * a;
                let start_pos_y = this.cell_height * b;
                if (this.renderConfig.identifyCells) {
                    this.drawSquare(
                    start_pos_x + 2,
                    start_pos_y + 2,
                    this.cell_width - 2,
                    this.cell_height - 2,"red",1);
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
                            }
                            if (this.renderConfig.hideIcons)
                                return; 

                            var icon = new Icon(
                                this.onClickEvent,
                                this.stage,
                                item,
                                (start_pos_x+item.x) * this.ratioX,
                                (start_pos_y+item.y) * this.ratioY,
                                item.width * this.ratioX,
                                item.height * this.ratioY,
                                this.img_data);
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

    Render.prototype.renderResult = function() {
        var resultArray = JSON.parse(this.resultData.result);
        var lasPos = { x: 0, y: 0}
    
        resultArray.forEach((item,i) => {
            var circleLengh = 2
            var actualPos = {
                x: (item.x * this.ratioX),
                y: (item.y * this.ratioY)
            }
            if (i == 0) {
                circleLengh = 4
            } else if (i == resultArray.length - 1) {
                circleLengh = 4
                this.drawLine(lasPos,actualPos,1,"grey");
            } else {
                circleLengh = 2
                this.drawLine(lasPos,actualPos,1,"grey");
            }

            this.drawStrokeCircle(
                item.x * this.ratioX, 
                item.y * this.ratioY, 
                this.block_width/2,
                item.hit ? "green" : "red",
                circleLengh
            );
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

    Render.prototype.drawSquare = function(x,y,width,height,color,strokeWidth,text = "") {
        var square = new createjs.Shape();
        square.graphics.setStrokeStyle(strokeWidth).beginStroke(color);
        square.graphics.drawRect(x, y, width, height);
        this.stage.addChild(square);
    }

    Render.prototype.drawLine = function(point1,point2,width,color) {
        var line = new createjs.Shape();
        line.graphics.setStrokeStyle(width).beginStroke(color);
        line.graphics.moveTo(point1.x, point1.y);
        line.graphics.lineTo(point2.x, point2.y);
        line.graphics.endStroke();
        this.stage.addChild(line);
    }

    Render.prototype.loadImg = function() {
        self = this;
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

