class LoadingUI extends  egret.Sprite {

    private img:egret.Bitmap
    private bgImg:egret.Bitmap
    private textField:egret.TextField

    public constructor (){
        super()
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this)
    }

    
    private onAddToStage ():void {
        this.textField = new egret.TextField()
        this.name = 'LoadingUI'  

        this.bgImg = new egret.Bitmap()  
        this.img = new egret.Bitmap() 
        
        RES.getResByUrl('resource/img/ld_bg.jpg',function (e:RES.ResourceEvent) {
           this.bgImg.texture = e 
           this.parent.getChildByName('main').addChild(this.bgImg)
        },this)

        RES.getResByUrl('resource/img/ld.png',function (e:RES.ResourceEvent) {
            this.img.texture = e
            this.img.x = (640 - this.img.texture._bitmapWidth )/2
            this.img.y = (innerHeight/innerWidth*640 - this.img.texture._bitmapHeight)/2
        },this)


        this.addChild(this.img)
        this.addChild(this.textField)
        
        

        this.textField.size = 24
        this.textField.height = 100
        this.textField.verticalAlign = "middle" 
        this.textField.textAlign = "center"

        this.textField.width = 640
        this.textField.y = (innerHeight/innerWidth*640 - this.textField.height)/2 
             
    }



    public setProgress(current:any):void {
        
        this.textField.text =  current + '0%'
    }
}