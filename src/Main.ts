/**
 * @copyright www.egret.com
 * @author yjtx
 * @desc 帧动画示例。
 *      触摸舞台会重新播放。
 *      播放过程中如果有帧事件，会触发egret.MovieClipEvent
 *      .FRAME_LABEL事件。
 *      在播放结束一次后会触发egret.Event.LOOP_COMPLETE
 *      事件。全部播放完全后，会触发egret.Event.COMPLETE事件
 *      。
 */



class Main extends egret.DisplayObjectContainer {

    private loadingView:LoadingUI
    private MainView:egret.Sprite
   
    
    
    constructor() {
        super()
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this) 
    }
    
    private onConfigComplete(event:RES.ResourceEvent):void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE,this.onConfigComplete,this)
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.onResourceLoadComplete,this)
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this)

        
        RES.loadGroup('preload',0)
        RES.loadGroup('loading',1)
        
    }

    private onResourceLoadComplete(event:RES.ResourceEvent) {
       
      if(event.groupName == 'preload'){
          this.stage.removeChild(this.loadingView)
          this.MainView = new chanel1()
          this.stage.addChild(this.MainView) 
      }
       
    }

    private onResourceProgress (event:RES.ResourceEvent) {
        if (event.groupName == "preload") {    
            this.loadingView.setProgress(event.itemsLoaded);
        }
    }

    private onAddToStage(event: egret.Event) {     
        this.name = "main"

        this.loadingView = new LoadingUI()
        this.stage.addChild(this.loadingView)

        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE,this.onConfigComplete,this)
        RES.loadConfig('resource/default.res.json','resource/')
    }
    
   
}