class tabView1 extends egret.Sprite {

    private _data:any
    private layers = []
    private timer:egret.Timer
    private flag = true

    constructor () {
        super()
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this)
    }


    private onAddToStage ():void {
        this.name = 'tabView1'

        this._data = RES.getRes('ani').mcObjs

        var u = window.navigator.userAgent
        var flag = u.indexOf('Mobile') > -1 && window.navigator.vendor.indexOf('Google') > -1 && u.indexOf('MicroMessenger') == -1 && u.indexOf('QQ') == -1  ? 50 : 0

        this._data.ani1.layers.forEach(function (el,i,arr) {
            this.layers[i] = {}
            this.layers[i].frameStopArr = []
            this.layers[i].texture = {}
            this.layers[i].currentFrame = 0
            this.layers[i].layer = new egret.Sprite()
            this.addChild(this.layers[i].layer)
                
            el.forEach(function (el,i1,arr) {

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
                        layData.layers.forEach(function (el,i2,arr) {
                            var lay = el[0]
                            this.layers[i].imgArr[i2] = new egret.Bitmap()
                            this.layers[i].layer.addChild(this.layers[i].imgArr[i2]) 
                            
                            el.forEach(function (el,i3,arr) {
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
                        layData.layers[0].forEach(function (el,i4,arr) {
                            var stop = i4 == 0 ? (el.frameNum?el.frameNum:1) : this.layers[i].frameStopArr[i4-1] + (el.frameNum?el.frameNum:1)
                            this.layers[i].frameStopArr.push(stop)
                        },this)
                    }            
                    
                }
            },this)    
        },this)


        this.addEventListener(egret.Event.ENTER_FRAME,this.onTimer,this)
        // this.timer.addEventListener(egret.TimerEvent.TIMER,this.onTimer,this)

    }



    private onTimer ():void {
        
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

                    el.imgArr.forEach(function (el,i,arr) {

                        var indexs = this.frameStopArr[i].length - 1
                        
                        for (var idx = 0; idx < this.frameStopArr[i].length; idx++) {
                            
                            if(this.currentFrame <= this.frameStopArr[i][idx]){
                                indexs = idx
                                break
                            }
                        }

                        var ele = this.texture.layers[i][indexs]
                        var texture = this.texture.layers[i][0].libName
                        
                        el.texture = RES.getRes(ele.libName||texture)
                        el.matrix = new egret.Matrix(ele.a,ele.b,ele.c,ele.d,(ele.x||0)+(ele.cx||0),(ele.y||0)+(ele.cy||0))
                        el.alpha = ele.al || 1
                    },el)
                }
            } 
        },this)
    }
}