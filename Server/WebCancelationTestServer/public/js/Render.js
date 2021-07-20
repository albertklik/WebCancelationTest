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
    function Render(canvasId,resolution,board,img_path,item_data,onclickEvent) 
    {
        this.board = board || Array(3).fill().map(() => Array(3).fill(new Cell().iniciar()));
        this.stage = new createjs.Stage(canvasId);
        this.imgPath = img_path;
        this.board_width = resolution.width;
        this.board_height = resolution.height;
        this.cell_width = this.board_width/3;
        this.cell_height = this.board_height/3;
        this.block_width = (this.cell_width)/this.board[0][0].cell_width;
        this.block_height = (this.cell_height)/this.board[0][0].cell_height;
        this.item_data = item_data;
        this.img_data = []
        this.onClickEvent = onclickEvent;
        this.imgLoaded = false;
        this.stage.canvas.width = resolution.width;
        this.stage.canvas.height = resolution.height;
    }

    Render.prototype.startTest = function () {
        this.loadImg();
        this.stage.removeAllChildren();
        //this.stage.update();
        this.board.forEach((colunm,a) => {
            colunm.forEach((line,b) => {
                let start_pos_x = this.cell_width * a;
                let start_pos_y = this.cell_height * b;
                //let shape = new createjs.Shape();
                //shape.graphics.beginStroke('grey')
                //.setStrokeStyle(1).drawRect(((_cell_width)*a),((_cell_height)*b), _cell_width-1, _cell_height-1);
                //this.stage.addChild(shape);
                line.map.forEach((element,i) => {
                    element.forEach((item,j) => {
                        if (item) {
                            new Icon(this.onClickEvent,this.stage,item,start_pos_x+item.x,start_pos_y+item.y,item.width,item.height,this.img_data);
                            //let shape = new createjs.Shape();
                            //shape.graphics.beginStroke('grey').setStrokeStyle(2).drawRect(start_pos_x + item.x, start_pos_y + item.y,item.width,item.height);
                            //this.stage.addChild(shape);
                            //icon2.init();
                        }
                    })
                });
            })
        })
        this.stage.update();
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

