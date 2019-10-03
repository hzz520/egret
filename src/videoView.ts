class videoView extends egret.Sprite {
    private _img:egret.Bitmap
    private _imgPan:egret.Bitmap
    private _videoBg:egret.Bitmap
    public _imgText:egret.Bitmap
    private _currentFrame:any = 0
    private _currentFramePan:any = 0


    constructor () {
        super()
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this)
        this.addEventListener(egret.Event.ENTER_FRAME,this.onTimer,this)
    }


    private onAddToStage ():void {
        
        this.name = "videoView"

        this.graphics.beginFill(0xffffff,0)
        this.graphics.drawRect(0,0,640,1139)
        this.graphics.endFill()

        this._videoBg = new egret.Bitmap()
        this._imgText = new egret.Bitmap()
        this._img = new egret.Bitmap()
        this._imgPan = new egret.Bitmap()


        this._videoBg.texture = RES.getRes('bottom')
        this._imgText.texture = RES.getRes(`t${egret.localStorage.getItem('index')}`) 
        var texture = RES.getRes('pan1')
      

        var bottomPos = innerHeight/innerWidth*this.graphics.$renderNode.width

        this._videoBg.y = bottomPos - this._videoBg.height

        this._imgText.x = 25
        this._imgText.y = bottomPos - this._imgText.height - 0.18*this._videoBg.height
        

        this._imgPan.x = this.graphics.$renderNode.width - texture.textureWidth - 5
        this._imgPan.y = bottomPos -texture.textureHeight -  0.11*this._videoBg.height

        this.addChild(this._videoBg)
        this.addChild(this._img)
        this.addChild(this._imgPan)
        this.addChild(this._imgText)


        
        // this.timer.addEventListener(egret.TimerEvent.TIMER,this.onTimer,this)
        this.addEventListener(egret.Event.ENTER_FRAME,this.onTimer,this)
      
    }

    private onTimer():void {
        
        this._currentFrame++
        this._currentFramePan++
        if(this._currentFrame === 113)
            this._currentFrame = 1
        if(this._currentFramePan === 75)
            this._currentFramePan = 1
        this._img.texture = RES.getRes(`${this._currentFrame}`)
        this._imgPan.texture = RES.getRes(`pan${this._currentFramePan}`)
    }

  

}