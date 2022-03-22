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
            showTargets: true
        }
        this.renderConfig = renderConfig || this.defaultRenderConfig;
        this.stage = new createjs.Stage(canvasId);
        //this.stage.canvas.width = this.resolution.width;
        //this.stage.canvas.height = this.resolution.height;
        this.board = board || {}
        this.canvasId = canvasId
        this.imgPath = img_path;
        this.board_width = resolution.width;
        this.board_height = resolution.height;
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
        this.cell_width = this.board_width/3;
        this.cell_height = this.board_height/3;
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
                line.map.forEach((element,i) => {
                    element.forEach((item,j) => {
                        if (item) {
                            new Icon(this.onClickEvent,this.stage,item,start_pos_x+item.x,start_pos_y+item.y,item.width,item.height,this.img_data);
                            if (item.id == this.board.goal.id) {
                                var circle = new createjs.Graphics();
                                circle.setStrokeStyle(3);
                                circle.beginStroke("red");
                                circle.drawCircle(0,0,30);
                                this.stage.addChild(circle);
                            }
                        }
                    })
                });
            })
        })
        this.stage.update();
    }

    Render.prototype.renderResult = function() {

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

