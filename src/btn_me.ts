class btn_me extends egret.Sprite {

   
    private _data:any
    private layers = []
    private flag = true
 

    constructor () {
        super()
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this)
        this.addEventListener(egret.Event.ENTER_FRAME,this.onEnterFrame,this)
    } 

    private onAddToStage () {
        this.name = 'btn_me'


        this._data = RES.getRes('ani').mcObjs
        
        
        
        var flag = window.navigator.userAgent.indexOf('NetType') != -1 ? 0 :50

        this._data.btn_me.layers.forEach(function (el,i,arr) {
            
                
            el.forEach(function (el,i1) {
                
                if(el.libName && el.libName.indexOf('mc')>-1) {

                    var layerData = this._data[el.libName]
                    var totalFrame = layerData.totalFrame
                    layerData.layers.forEach(function (el,i2) {
                        this.layers[i2] = {}
                        this.layers[i2].frameStopArr = []
                        this.layers[i2].texture 
                        this.layers[i2].currentFrame = 0
                        this.layers[i2].layer = new egret.Sprite()
                        this.addChild(this.layers[i2].layer)

                        
                        if(el.length == 1 && el[0].libName.indexOf('mc')>-1){

                            this.layers[i2].layer.x = el.x + (el.cx||0)
                            this.layers[i2].layer.y = el.y + (el.cy||0) + flag
                            
                            layerData = this._data[el[0].libName]
                            this.layers[i2].texture = layerData
                            if(layerData.layers.length == 1){
                                this.layers[i2].img = new egret.Bitmap()
                                this.layers[i2].layer.addChild(this.layers[i2].img)
                                this.layers[i2].frameStopArr.push(layerData.layers[0].frameNum || 1)
                                
                            } else{
                                this.layers[i2].imgArr = []
                                layerData.layers.forEach(function (el,i3) {
                                    this.layers[i2].imgArr[i3] = new egret.Bitmap()
                                    this.layers[i2].frameStopArr[i3] = []
                                    this.layers[i2].layer.addChild(this.layers[i2].imgArr[i3])
                                    
                                    el.forEach(function(el,i4){
                                        var stop = i4 == 0 ? (el.frameNum || 1) : this.layers[i2].frameStopArr[i3][i4-1] + (el.frameNum || 1)
                                        this.layers[i2].frameStopArr[i3].push(stop)
                                    },this)
                                },this)
                            }

                            
                        } else {
                            this.layers[i2].texture = el
                            this.layers[i2].texture.totalFrame = totalFrame
                            this.layers[i2].img = new egret.Bitmap()
                            this.layers[i2].layer.addChild(this.layers[i2].img)


                            el.forEach(function(el,i3){
                                var stop = i3 == 0 ? (el.frameNum || 1) : this.layers[i2].frameStopArr[i3-1] + (el.frameNum || 1)
                                this.layers[i2].frameStopArr.push(stop)
                            },this)
                        }
                    },this);
                } 
            },this)    
        },this)         

    }

  

    private onEnterFrame () {

        this.layers.forEach(function(el,i,arr){
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


                var ele = el.texture.layers == undefined ? el.texture[idx]: el.texture.layers[0][idx]
                var ele0 = el.texture.layers == undefined ?  el.texture[0] : el.texture.layers[0][0]

                if(el.texture.layers == undefined){
                    // console.log(el)
                }
                el.img.texture = RES.getRes(ele.libName||ele0.libName)
                el.img.matrix = new egret.Matrix(ele.a||1,ele.b||0,ele.c||0,ele.d||1,(ele.x||0)+(ele.cx||0),(ele.y||0)+(ele.cy||0))
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
                    
                    var texture =  this.texture.layers[i][0].libName
                    
                    
                    
                    el.texture = RES.getRes(ele.libName||texture)
                    el.matrix = new egret.Matrix(ele.a,ele.b,ele.c,ele.d,(ele.x||0)+(ele.cx||0),(ele.y||0)+(ele.cy||0))
                    el.alpha = ele.al || 1
                },el)
            }
        },this)

    }
            

}