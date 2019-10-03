class xu extends egret.Sprite {

    private timer:egret.Timer
    private _data:any
    private layers = []
 

    constructor () {
        super()
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this)
        this.addEventListener(egret.Event.ENTER_FRAME,this.onEnterFrame,this)
    }

    private onAddToStage () {
        this.name = 'xu'

        
        this.alpha = 0

        this._data = RES.getRes('ani').mcObjs

        var flag = window.navigator.userAgent.indexOf('NetType') != -1 ? 0 :50

        this._data.xu.layers.forEach(function (el,i,arr) {
            this.layers[i] = {}
            this.layers[i].frameStopArr = []
            this.layers[i].currentFrame = 0
            this.layers[i].layer = new egret.Sprite()
            this.addChild(this.layers[i].layer)

            this.layers[i].img = new egret.Bitmap()
            this.layers[i].layer.addChild(this.layers[i].img)

            this.layers[i].texture = el

            el.forEach(function (el,i1) {
                var stop = i1 ==0 ? (el.frameNum || 1) : this.layers[i].frameStopArr[i1-1] + (el.frameNum || 1)
                this.layers[i].frameStopArr.push(stop)
            },this)
            
        },this);


        this.timer = new egret.Timer(33,10)
        this.timer.start()


        this.timer.addEventListener(egret.TimerEvent.TIMER,this.onTimer,this)
    }

    private onTimer (e:egret.TimerEvent) {
        this.alpha = 0 + (<egret.Timer>e.target).currentCount*0.1
    }

    private onEnterFrame () {
        this.layers.forEach(function (el,i,arr) {
            var idx = el.frameStopArr.length - 1
            el.currentFrame++

            if(el.currentFrame == this._data.xu.totalFrame)
                    el.currentFrame = 1

            for (var i = 0; i < el.frameStopArr.length; i++) { 
                if(el.currentFrame <= el.frameStopArr[i]){
                    idx = i
                    break
                }
            }
            
            // console.log(el.texture[idx].libName)

            var ele = el.texture[idx]
           
            var texture =  ele.libName || el.texture[0].libName
            
            el.img.texture = RES.getRes(texture)
            el.img.matrix =new egret.Matrix(ele.a||1,ele.b||0,ele.c||0,ele.d||1,ele.x+(ele.cx||0),ele.y+(ele.cy||0))
            el.img.alpha = ele.al || 1
            
        },this)
    }

}