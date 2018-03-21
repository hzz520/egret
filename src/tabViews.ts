class tabViews extends egret.Sprite {

    private videoView:egret.Sprite
    private indicateView:egret.Sprite
    private tabViewsContainer:egret.Sprite
    private tabView1:egret.Sprite
    private tabView2:egret.Sprite
    private tabView3:egret.Sprite
    private tabView4:egret.Sprite
    private timer:egret.Timer
    private timer1:egret.Timer

    constructor () {
        super()
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this)
    }

    private onAddToStage ():void {
        var _self = this
        this.name = 'tabViews'

        this.timer = new egret.Timer(33,10)
        this.timer1 = new egret.Timer(33,10)
        this.timer.addEventListener(egret.TimerEvent.TIMER,this.onTimer,this)
        this.timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE,this.onTimerCpl,this)
        this.timer1.addEventListener(egret.TimerEvent.TIMER,this.onTimer,this)
        this.timer1.addEventListener(egret.TimerEvent.TIMER_COMPLETE,this.onTimerCpl,this)

        this.graphics.beginFill(0xffffff,0)
        this.graphics.drawRect(0,0,640,1136)
        this.graphics.endFill()
        this.touchEnabled = true

        this.tabViewsContainer = new egret.Sprite()
        this.tabViewsContainer.name = 'tabViewsContainer'
        this.addChild(this.tabViewsContainer)

        this.tabView1 = new tabView1()
        this.tabView2 = new tabView2()
        this.tabView3 = new tabView3()
        this.tabView4 = new tabView4() 
        
        this.tabViewsContainer.addChild(this.tabView1)
        this.tabViewsContainer.addChild(this.tabView2)
        this.tabViewsContainer.addChild(this.tabView3)
        this.tabViewsContainer.addChild(this.tabView4)

        
        this.indicateView = new indicateView()
        this.addChild(this.indicateView)

        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onTouchBegin,this)
        this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this)
        document.getElementsByTagName('video')[0].onloadstart = function () {
            if(document.getElementsByTagName('video')[0].src.indexOf('resource') !=-1){
                _self.timer.start()
            } else {
                _self.timer1.start()
            }
        }
        
       
    }

    private onTimer (e:egret.TimerEvent) {
        if(<egret.Timer>e.target === this.timer)
           this.alpha = this.parent.parent.getChildByName('main').alpha = this.parent.getChildByName('chooseBtnView').alpha  = 1 - 0.1*(<egret.Timer>e.target).currentCount
        else{
            if(this.parent.getChildByName('videoView'))
                this.parent.removeChildAt(0)
            this.alpha =  this.parent.parent.getChildByName('main').alpha = this.parent.getChildByName('chooseBtnView').alpha  = 0 + 0.1*(<egret.Timer>e.target).currentCount
        }
    }

    private onTimerCpl (e:egret.TimerEvent) {
         if(<egret.Timer>e.target === this.timer){
            this.alpha =  this.parent.parent.getChildByName('main').alpha = this.parent.getChildByName('chooseBtnView').alpha  = 0
            this.videoView = new videoView()
            this.parent.addChildAt(this.videoView,0)
            this.timer.reset()
        }  else {
            this.alpha =  this.parent.parent.getChildByName('main').alpha = this.parent.getChildByName('chooseBtnView').alpha  = 1
            this.timer1.reset()
        }
    }

    private onTouchBegin(e:egret.TouchEvent):void {

        [0,1,2,3].forEach(function (el,index,arr) {
            this.$children[0].$children[index].alpha = 0
            if(egret.localStorage.getItem('index') == `${index+1}`){
                egret.localStorage.setItem(`vidIndex${index+1}`,'true')
            }

                egret.localStorage.setItem('vidIndex1','true')
        },this)
         
        document.getElementsByTagName('audio')[0].pause()
        document.getElementsByTagName('video')[0].src =DEBUG ? `http://cdn.im-ad.com/2017/Paint/resource/${egret.localStorage.getItem('index')}.mp4` : `resource/${egret.localStorage.getItem('index')}.mp4` 
        document.getElementsByTagName('video')[0].load()
        document.getElementsByTagName('video')[0].play()

        
    }
    private onTouchTap(e:egret.TouchEvent):void {

        [0,1,2,3].forEach(function (el,index,arr) {
            this.$children[0].$children[index].alpha = egret.localStorage.getItem('index') == index + 1  + '' ? 1 : 0
        },this)
        
        document.getElementsByTagName('video')[0].src = ''
        document.getElementsByTagName('video')[0].load()
        document.getElementsByTagName('audio')[0].play()
    }



    
}