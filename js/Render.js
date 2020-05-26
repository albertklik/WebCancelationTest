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
    function Render(resolution,board,img_path,img_data,onclickEvent) 
    {
        //public properties


        //private properties
        var _board = board || Array(3).fill().map(() => Array(3).fill(new Cell()));
        
        var _stage = new createjs.Stage('table');
        var _imgPath = img_path;
        var _board_width = resolution.width;
        var _board_height = resolution.height;
        var _cell_width = _board_width/3;
        var _cell_height = _board_height/3;
        var _block_width = (_cell_width)/_board[0][0].width;
        var _block_height = (_cell_height)/_board[0][0].height;
        var _img_data = img_data;
        var _onClickEvent = onclickEvent;
        var _imgLoaded = false;
        _stage.canvas.width = resolution.width;
        _stage.canvas.height = resolution.height;
        
        this.startTest = function () {
            if (!_imgLoaded) {
                _img_data.forEach(element => {
                    element.img = new Image();
                    element.img.src = _imgPath + element.name + ".png";
                    element.img.onload = function() {
                        _stage.update();
                    }
                });
                _imgLoaded = true;
            }

            _stage.removeAllChildren();
            _stage.update();
            _board.forEach((line,a) => {
                line.forEach((colunm,b) => {
                    let start_pos_x = _cell_width * a;
                    let start_pos_y = _cell_height * b;
                    let shape = new createjs.Shape();
                    shape.graphics.beginStroke('grey')
                    .setStrokeStyle(1).drawRect(((_cell_width)*a),((_cell_height)*b), _cell_width-1, _cell_height-1);
                    _stage.addChild(shape);
                    colunm.cell_map.forEach((element,i) => {
                        element.forEach((item,j) => {
                            if (item) {
                                let icon = new Icon(_onClickEvent,_stage,item,(start_pos_x+((_block_width)*i)),(start_pos_y+((_block_height)*j)),_block_width,_block_height);
                                icon.init();
                            }
                        })
                    });
                })
            })
            _stage.update();
        }

        this.finishTest = function() {

        }

        this.update = function(board,width,height) {
            _board = board || _board;
            _board_width = width || _board_width;
            _board_height = height || _board_height;
            _cell_width = _board_width/3;
            _cell_height = _board_height/3;
            _block_width = (_cell_width)/_board[0][0].width;
            _block_height = (_cell_height)/_board[0][0].height;
            this.startTest();
        };

        this.resize = function(width,height) {
            _board_width = width || 2000;
            _board_height = height || 1000;
            _cell_width = _board_width/3;
            _cell_height = _board_height/3;
            _block_width = (_cell_width)/_board[0][0].width;
            _block_height = (_cell_height)/_board[0][0].height;
            this.startTest();
        }

        this.startTest();
    }

