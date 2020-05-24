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
    function Icon(stage,icon,x,y,width,height) 
    {
        var _stage = stage,
            _icon = icon,
            _x = x,
            _y = y,
            _width = width,
            _height = height;

        this.init = function() {
           this.bitmap = new createjs.Bitmap(_icon.img);
           this.bitmap.x = _x;
           this.bitmap.y = _y;
           this.bitmap.width = _width;
           this.bitmap.height = _height;
           this.bitmap.scaleX = _width/150;
           this.bitmap.scaleY = _height/150;
           _stage.addChild(this.bitmap);
           _stage.update();
            
        }
        
        
    }