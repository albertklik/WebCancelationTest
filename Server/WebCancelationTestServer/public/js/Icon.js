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
    function Icon(onclick,stage,icon,x,y,width,height) 
    {
        this.stage = stage;
        this.onClickEvent = onclick;
        this.icon = icon;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        

        this.setup();
    }

    Icon.prototype.setup = function() {
        this.bitmap = new createjs.Bitmap(this.icon.item.img);
        this.bitmap.x = this.x;
        this.bitmap.y = this.y;
        this.bitmap.width = this.width;
        this.bitmap.height = this.height;
        this.bitmap.scaleX = this.width/150;
        this.bitmap.scaleY = this.height/150;
        var self = this;
        this.bitmap.on("click", function(evt) {
           self.onClickEvent(self.icon,evt);
        });
        this.stage.addChild(this.bitmap);
        this.stage.update();
     }