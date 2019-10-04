class chanel3 extends egret.Sprite {

    private timer:egret.Timer
    private _data:any
    private layers = []
    private btn_me:egret.Sprite
    private btn_share:egret.Sprite
    private xu:egret.Sprite
    private shareImg:egret.Bitmap
    private timerShare:egret.Timer
    private music:egret.Sound
 

    constructor () {
        super()
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this)
        this.addEventListener(egret.Event.ENTER_FRAME,this.onEnterFrame,this)
    } 

    private onAddToStage () {
        this.name = 'chanel3'

        var music = new  egret.Sound()
        music.load('resource/eff2.mp3')
        music.addEventListener(egret.Event.COMPLETE,this.onLoaded,this)

        this.timerShare = new egret.Timer(150,10)
        this.timerShare.addEventListener(egret.TimerEvent.TIMER,this.onTimer,this)
        this.timerShare.addEventListener(egret.TimerEvent.TIMER_COMPLETE,this.onTimerCpl,this)

        this.parent.$children[0].alpha =0.3

        this.graphics.beginFill(0xffffff,0)
        this.graphics.drawRect(0,0,640,1139)
        this.graphics.endFill()
        
        this.alpha = 0

        this._data = RES.getRes('ani').mcObjs

        this.btn_share = new btn_share()
        this.btn_me = new btn_me()
        this.xu = new xu()
        
        this.btn_share.touchEnabled = true
        this.btn_me.touchEnabled = true
        this.btn_me.width = this.btn_share.width = 230
        
        this.btn_share.x = (640 - this.btn_share.width)/2
        this.btn_share.y = 640
        
        
        this.btn_me.x = (640 - this.btn_me.width)/2
        this.btn_me.y = 780
        
        this.xu.width = 320
        this.xu.x = 640 - this.xu.width 
        this.xu.y = 500

        this.shareImg = new egret.Bitmap()
        this.shareImg.texture = RES.getRes('ae')
        this.shareImg.alpha = 0

        this.shareImg.x = 640 - this.shareImg.texture.textureWidth - 20
        this.shareImg.y = 20

        this.addChild(this.btn_share)
        this.addChild(this.btn_me)
        this.addChild(this.xu)
        this.addChild(this.shareImg)

        var flag = window.navigator.userAgent.indexOf('NetType') != -1 ? 0 :50

        this._data.end.layers.forEach(function (el,i,arr) {
            this.layers[i] = {}
            this.layers[i].frameStopArr = []
            this.layers[i].texture = {}
            this.layers[i].currentFrame = 0
            this.layers[i].layer = new egret.Sprite()
            this.addChild(this.layers[i].layer)
                
            el.forEach(function (el,i1) {

                this.layers[i].layer.x = el.x + (el.cx||0)
                this.layers[i].layer.y = el.y + (el.cy||0) + flag
                
                if(el.libName.indexOf('mc') == -1){
                    this.layers[i].img = new egret.Bitmap()
                    this.layers[i].layer.addChild(this.layers[i].img)

                    this.layers[i].texture = el
                    this.layers[i].img.texture = RES.getRes(el.libName)
                    this.layers[i].img.alpha = el.al || 1 
                } else {
                    var layData = this._data[el.libName]
                    
                    this.layers[i].texture = layData
                   
                    if(layData.layers.length != 1){
                        this.layers[i].imgArr = []
                        layData.layers.forEach(function (el,i2) {
                            var lay = el[0]
                            this.layers[i].imgArr[i2] = new egret.Bitmap()
                            this.layers[i].layer.addChild(this.layers[i].imgArr[i2]) 
                            


                            el.forEach(function (el,i3) {
                                if(this.layers[i].frameStopArr[i2]==undefined)
                                    this.layers[i].frameStopArr[i2] = []
                                
                                var stop = i3 == 0 ? (el.frameNum?el.frameNum:1) : (this.layers[i].frameStopArr[i2][i3-1] + (el.frameNum?el.frameNum:1))
                                    
                                this.layers[i].frameStopArr[i2].push(stop)
                            },this) 
                        },this)
                       
                    } else {
                        var lay = layData.layers[0][0]
                        this.layers[i].img = new egret.Bitmap()
                        this.layers[i].layer.addChild(this.layers[i].img) 
                        this.layers[i].img.texture = RES.getRes(lay.libName)
                        this.layers[i].img.matrix = new egret.Matrix(lay.a||1,lay.b||0,lay.c||0,lay.d||1,lay.x,lay.y)
                        this.layers[i].img.alpha = lay.al || 1 
                        layData.layers[0].forEach(function (el,i4) {
                            var stop = i4 == 0 ? (el.frameNum?el.frameNum:1) : this.layers[i].frameStopArr[i4-1] + (el.frameNum?el.frameNum:1)
                            this.layers[i].frameStopArr.push(stop)
                        },this)
                    }            
                    
                }
            },this)    
        },this)           

        
        

        this.timer = new egret.Timer(33,10)
        this.timer.start()


        this.timer.addEventListener(egret.TimerEvent.TIMER,this.onTimer,this)
        this.btn_share.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this)
        this.btn_me.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this)
    }

    private onTouchTap (e:egret.TouchEvent) {
        var target = <egret.Sprite>e.target
        
        if(target === this.btn_me) {
            window.location.href = 'https://github.com/hzz520/egret'
        } else {
            this.music.play(0,1)
            this.timerShare.start()
        }
    }

    private onLoaded (e:egret.Event) {
        this.music = <egret.Sound>e.target
    }

    private onTimer (e:egret.TimerEvent) {
        if(<egret.Timer>e.target === this.timer)
            this.alpha = 0 + (<egret.Timer>e.target).currentCount*0.1
        else {
            switch ((<egret.Timer>e.target).currentCount%2) {
                case 0:
                    this.shareImg.alpha = 0.5
                    break
            
                case 1:
                    this.shareImg.alpha = 1
                    break
            }
        }
    }

    private onTimerCpl () {
        this.shareImg.alpha = 0
        this.timerShare.reset()
    }

    private onEnterFrame () {
       this.layers.forEach(function (el,index,arr) {
            if(el.frameStopArr.length != 0 ){
                if(el.img){
                    var idx = el.frameStopArr.length - 1
                    
                    el.currentFrame++
                    if(el.currentFrame == el.texture.totalFrame)
                        el.currentFrame = 1
                    
                    for (var i = 0; i < el.frameStopArr.length; i++) { 
                        if(el.currentFrame <= el.frameStopArr[i]){
                            idx = i
                            break
                        }
                    }

                    var ele = el.texture.layers[0][idx]

                    
                    el.img.texture = RES.getRes(ele.libName||el.texture.layers[0][0].libName)
                    el.img.matrix = new egret.Matrix(ele.a||1,ele.b||0,ele.c||0,ele.d||1,ele.x+(ele.cx||0),ele.y+(ele.cy||0))
                    el.img.alpha = ele.al || 1
                } else {
                    el.currentFrame++
                    if(el.currentFrame == el.texture.totalFrame)
                        el.currentFrame = 1

                    el.imgArr.forEach(function (el,i) {

                        var indexs = this.frameStopArr[i].length - 1
                        
                        for (var idx = 0; idx < this.frameStopArr[i].length; idx++) {
                            
                            if(this.currentFrame <= this.frameStopArr[i][idx]){
                                indexs = idx
                                break
                            }
                        }
                        
                        var ele = this.texture.layers[i][indexs]
                        
                        var texture = ele.x != undefined ? this.texture.layers[i][0].libName:null
                        
                        
                        
                        el.texture = RES.getRes(ele.libName||texture)
                        el.matrix = new egret.Matrix(ele.a,ele.b,ele.c,ele.d,(ele.x||0)+(ele.cx||0),(ele.y||0)+(ele.cy||0))
                        el.alpha = ele.al || 1
                    },el)
                }
            } 
        },this)
    }

}