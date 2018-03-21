class main_btn extends egret.Sprite {
    private _data:any
    private layers = []
    private timer:egret.Timer
    private chanel2:egret.Sprite
    private scale = 1.25
    private sound:egret.Sound
    private timerRound:egret.Timer

    constructor () {
        super()
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddtoStage,this)
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE,this.onRemoveFromStage,this)
    }

  

    private onAddtoStage (e:egret.Event):void {
        var _self = this
        this.name = 'main_btn'

        var sound = new egret.Sound()
        sound.addEventListener(egret.Event.COMPLETE, this.onLoadComplete, this)
        sound.load('resource/eff1.mp3')

        this._data = RES.getRes('ani').mcObjs
        var texture = this._data[this._data.main_btn.layers[0][0].libName].layers[0][0].libName
        var cy = window.navigator.userAgent.indexOf('NetType') != -1 ? 80 :90
        var w = RES.getRes(texture)._bitmapWidth
        var h = this._data.main_btn.stageHeight
        var x = (this._data.main_btn.screenH-this.scale*w)/2
        var y = innerHeight/innerWidth*640 - h - cy

        
        

        this.x = x
        this.y = y
        this.width = w
        this.height = h
    
        this.touchEnabled = true

        this._data.main_btn.layers.forEach(function (el,i,arr) {
            this.layers[i] = {}
            this.layers[i].frameStopArr = []
            this.layers[i].texture = {}
            this.layers[i].currentFrame = 0
            this.layers[i].layer = new egret.Sprite()
            this.addChild(this.layers[i].layer)
            
            el.forEach(function (el,i1,arr) {
                var layData = this._data[el.libName]
                var lay = layData.layers[0][0]
                this.layers[i].texture = layData

        
                this.layers[i].layer.x = this.scale*el.x
                this.layers[i].layer.y = this.scale*el.y

                this.layers[i].img = new egret.Bitmap()
                this.layers[i].layer.addChild(this.layers[i].img)
                
                layData.layers[0].forEach(function (el,i2,arr) {
                    var stop = i2 == 0 ? (el.frameNum?el.frameNum:1) : this.layers[i].frameStopArr[i2-1] + (el.frameNum?el.frameNum:1)
                    this.layers[i].frameStopArr.push(stop)
                },this)
            },this)

        },this);

        this.timer = new egret.Timer(50,10)
        this.timerRound = new egret.Timer(33,0)
        this.timerRound.start()

        this.timer.addEventListener(egret.TimerEvent.TIMER,this.onTimer,this)
        this.timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE,this.onTimerComplete,this)
        this.timerRound.addEventListener(egret.TimerEvent.TIMER,this.onTimerRound,this)
        this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this)
    }

    private onLoadComplete (event:egret.Event):void {
        this.sound = <egret.Sound>event.target
    }

    private onSoundComplete (event:egret.Event):void {
        console.log(2)
        this.timer.start()
        document.getElementById('aud').setAttribute('src','resource/bgm2.mp3') 
    }

    private onTouchTap (e:egret.TouchEvent):void {
        document.getElementById('aud').setAttribute('src','') 
        
        
        var channel:egret.SoundChannel = this.sound.play(0,1)
        channel.addEventListener(egret.Event.SOUND_COMPLETE, this.onSoundComplete, this)
    }

    private onTimer ():void {
        this.$parent.getChildByName('chanel1').alpha = this.alpha -= 0.1
    }

    private onTimerComplete ():void {
        this.chanel2 = new chanel2()
        var el = this.$parent.getChildByName('chanel1')
        el.alpha = this.alpha = 0
       
        this.$parent.removeChild(el)
        this.$parent.addChild(this.chanel2)
        this.timer.stop()
        
        this.$parent.removeChild(this)
    }

    private onTimerRound (e:egret.TimerEvent):void {
       
        this.layers.forEach(function (el,index,arr) {
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
            el.img.matrix = new egret.Matrix(ele.a||this.scale,ele.b||0,ele.c||0,ele.d||this.scale,(index==2?this.scale:1)*(ele.x+(ele.cx||0)),(index==2?this.scale:1)*(ele.y+(ele.cy||0)))
            el.img.alpha = ele.al || 1
        },this)
    }
    private onRemoveFromStage ():void {
        this.timerRound.stop()
        egret.localStorage.setItem('vidIndex1','false')
        egret.localStorage.setItem('vidIndex2','false')
        egret.localStorage.setItem('vidIndex3','false')
        egret.localStorage.setItem('vidIndex4','false')
    }

}