var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var chanel2 = (function (_super) {
    __extends(chanel2, _super);
    function chanel2() {
        var _this = _super.call(this) || this;
        _this.i = 0;
        _this.flag = false;
        _this.flag1 = false;
        _this.flag2 = true;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        _this.addEventListener(egret.Event.ADDED, _this.onAdded, _this);
        return _this;
    }
    chanel2.prototype.onLoadComplete = function (e) {
        this.xu = e.target;
    };
    chanel2.prototype.onAdded = function () {
        var _self = this;
        this.timer2 = new egret.Timer(33, 10);
        this.timer3 = new egret.Timer(33, 10);
        this.chanel3 = new chanel3();
        var xu = new egret.Sound();
        xu.load('resource/xu.mp3');
        xu.addEventListener(egret.Event.COMPLETE, this.onLoadComplete, this);
        this.timer2.addEventListener(egret.TimerEvent.TIMER, this.onTimer2, this);
        this.timer2.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.onTimer2Cpl, this);
        this.timer3.addEventListener(egret.TimerEvent.TIMER, this.onTimer2, this);
        this.timer3.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.onTimer2Cpl, this);
        document.getElementsByTagName('video')[0].onended = function () {
            [0, 1, 2, 3].forEach(function (el, index, arr) {
                this.tabViews.$children[0].$children[index].alpha = egret.localStorage.getItem('index') == index + 1 + '' ? 1 : 0;
            }, _self);
            document.getElementsByTagName('video')[0].src = '';
            document.getElementsByTagName('audio')[0].play();
            _self.timer2.start();
        };
    };
    chanel2.prototype.onTimer2 = function (e) {
        if (e.target === this.timer2)
            this.tabViews.alpha = this.parent.getChildByName('main').alpha = this.getChildByName('chooseBtnView').alpha += 0.1;
        else {
            if (egret.localStorage.getItem('vidIndex1') == 'true' && egret.localStorage.getItem('vidIndex2') == 'true' && egret.localStorage.getItem('vidIndex3') == 'true' && egret.localStorage.getItem('vidIndex4') == 'true') {
                if (!this.flag1)
                    this.xu.play(0, 1);
                this.alpha = 1 - e.target.currentCount * 0.1;
            }
            else {
                this.tabView.alpha = 1 - e.target.currentCount * 0.1;
                this.tabViews.alpha = 0 + e.target.currentCount * 0.1;
            }
        }
    };
    chanel2.prototype.onTimer2Cpl = function (e) {
        e.target.reset();
        if (e.target === this.timer3 && egret.localStorage.getItem('vidIndex1') == 'true' && egret.localStorage.getItem('vidIndex2') == 'true' && egret.localStorage.getItem('vidIndex3') == 'true' && egret.localStorage.getItem('vidIndex4') == 'true') {
            this.parent.addChild(this.chanel3);
            this.parent.removeChild(this);
        }
    };
    chanel2.prototype.onAddToStage = function () {
        this.name = 'chanel2';
        var soundLoop = new egret.Sound();
        soundLoop.addEventListener(egret.Event.COMPLETE, this.onLoopLoadComplete, this);
        soundLoop.load('resource/loop.mp3');
        this.graphics.beginFill(0xffffff, 0);
        this.graphics.drawRect(0, 0, 640, 1139);
        this.graphics.endFill();
        this.timerTab = new egret.Timer(100, 0);
        this.alpha = 0;
        var texture = RES.getRes('a1');
        this.tabImg = new egret.Bitmap();
        this.tabImg.texture = texture;
        this.tabView = new egret.Sprite();
        this.tabView.name = 'tabView';
        this.tabView.x = (this.graphics.$renderNode.width - texture._bitmapWidth) / 2;
        this.tabView.y = 100;
        this.tabView.addChild(this.tabImg);
        this.addChild(this.tabView);
        this.tabViews = new tabViews();
        var texture = RES.getRes('btn_choose');
        var btnImg = new egret.Bitmap();
        btnImg.texture = texture;
        this.chooseBtnView = new egret.Sprite();
        this.chooseBtnView.name = 'chooseBtnView';
        this.chooseBtnView.touchEnabled = true;
        this.chooseBtnView.x = (this.graphics.$renderNode.width - texture._bitmapWidth) / 2;
        this.chooseBtnView.y = innerHeight / innerWidth * 640 - texture._bitmapHeight - 75;
        this.chooseBtnView.addChild(btnImg);
        this.addChild(this.chooseBtnView);
        this.timer = new egret.Timer(50, 10);
        this.timer.start();
        this.chooseBtnView.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        this.chooseBtnView.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
        this.timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.onTimerComplete, this);
        this.timerTab.addEventListener(egret.TimerEvent.TIMER, this.onTimerTab, this);
    };
    chanel2.prototype.onLoopLoadComplete = function (event) {
        this.soundLoop = event.target;
    };
    chanel2.prototype.onTimer = function () {
        this.alpha += 0.1;
    };
    chanel2.prototype.onTimerComplete = function () {
        this.alpha = 1;
    };
    chanel2.prototype.onTouchTap = function (e) {
        this.timerTab.stop();
        if (!this.flag) {
            this.addChildAt(this.tabViews, 1);
            this.flag = true;
        }
        this.soundLoopController.stop();
        [0, 1, 2, 3].forEach(function (el, index, arr) {
            this.tabViews.$children[0].$children[index].alpha = egret.localStorage.getItem('index') == index + 1 + '' ? 1 : 0;
        }, this);
        this.timer3.start();
    };
    chanel2.prototype.onTouchBegin = function (e) {
        if (this.flag2) {
            var u = window.navigator.userAgent;
            if (u.indexOf('Mobile') > -1 && window.navigator.vendor.indexOf('Google') == -1 && u.indexOf('MicroMessenger') == -1 && u.indexOf('QQ') == -1)
                document.getElementsByTagName('audio')[0].play();
            this.flag2 = false;
        }
        if (this.getChildByName('tabViews')) {
            [0, 1, 2, 3].forEach(function (el, index, arr) {
                this.tabViews.$children[0].$children[index].alpha = 0;
            }, this);
            this.tabViews.alpha = 0;
            this.tabView.alpha = 1;
        }
        this.soundLoopController = this.soundLoop.play(0, 0);
        this.timerTab.start();
    };
    chanel2.prototype.onTimerTab = function (e) {
        this.i++;
        if (this.i == 5)
            this.i = 1;
        egret.localStorage.setItem('index', "" + this.i);
        this.tabImg.texture = RES.getRes("a" + this.i);
    };
    return chanel2;
}(egret.Sprite));
__reflect(chanel2.prototype, "chanel2");
