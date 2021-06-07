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
    function Render(canvasId,resolution,board,img_path,img_data,onclickEvent) 
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
        this.img_data = img_data;
        this.onClickEvent = onclickEvent;
        this.imgLoaded = false;
        this.stage.canvas.width = resolution.width;
        this.stage.canvas.height = resolution.height;
    }

    Render.prototype = {
        startTest : function () {
            self = this;
            if (!this.imgLoaded) {
                this.img_data.forEach(element => {
                    element.img = new Image();
                    element.img.src = this.imgPath + element.name + ".png";
                    element.img.onload = function() {
                        self.updateStage();
                    };
                });
                this.imgLoaded = true;
            }

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
                    line.cell_map.forEach((element,i) => {
                        element.forEach((item,j) => {
                            if (item) {
                                new Icon(this.onClickEvent,this.stage,item,start_pos_x+item.x,start_pos_y+item.y,item.width,item.height);
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
        },

        finishTest: function() {

        },

        updateStage: function() {
            this.stage.update();
        },

        // update: function(board,width,height) {
        //     this.board = board || this.board;
        //     this.board_width = width || this.board_width;
        //     this.board_height = height || this.board_height;
        //     this.cell_width = this.board_width/3;
        //     this.cell_height = this.board_height/3;
        //     this.block_width = (this.cell_width)/this.board[0][0].cell_width;
        //     this.block_height = (this.cell_height)/this.board[0][0].cell_height;
        //     this.startTest();
        // },

        // resize: function(width,height) {
        //     this.board_width = width || 2000;
        //     this.board_height = height || 1000;
        //     this.ell_width = this.board_width/3;
        //     this.cell_height = this.board_height/3;
        //     this.block_width = (this.cell_width)/this.board[0][0].cell_width;
        //     this.block_height = (this.cell_height)/this.board[0][0].cell+height;
        //     this.startTest();
        // }

    }

