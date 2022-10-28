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
    function Icon(onclick,stage,item,x,y,width,height,img_data,alpha = 1) 
    {
        this.stage          = stage;
        this.onClickEvent   = onclick;
        this.item           = item;
        this.x              = x;
        this.y              = y;
        this.width          = width;
        this.height         = height;
        this.img_data       = img_data;
        this.alpha          = alpha;
        

        this.setup();
    }

    Icon.prototype.setup = function() {
        var img = this.img_data.find(e => e.id == this.item.id).img || this.img_data.fist().img;
        this.bitmap = new createjs.Bitmap(img);
        this.bitmap.x = this.x;
        this.bitmap.y = this.y;
        this.bitmap.width = this.width;
        this.bitmap.height = this.height;
        this.bitmap.scaleX = this.width/150;
        this.bitmap.scaleY = this.height/150;
        this.bitmap.alpha = this.alpha;
        var self = this;
        this.bitmap.on("click", function(evt) {
           self.onClickEvent(self.item,evt);
        });
        this.stage.addChild(this.bitmap);
     }

     Icon.prototype.markAsGoal = function() {
        var circle = new createjs.Shape();
        circle.graphics
        .setStrokeStyle(3)
        .beginStroke("grey")
        .drawCircle(
            this.x + this.width/2, 
            this.y + this.height/2, 
            this.width
        );
        this.stage.addChild(circle);
     }

     Icon.prototype.markAsGoal2 = function() {
        var circle = new createjs.Shape();
        circle.graphics
        .setStrokeStyle(3)
        .beginStroke("grey")
        .drawCircle(
            this.x + this.width/2,
            this.y + this.height/2,
            this.width/2
        );
        this.stage.addChild(circle);
     }