var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var main_btn = (function (_super) {
    __extends(main_btn, _super);
    function main_btn() {
        var _this = _super.call(this) || this;
        _this.layers = [];
        _this.scale = 1.25;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddtoStage, _this);
        _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemoveFromStage, _this);
        return _this;
    }
    main_btn.prototype.onAddtoStage = function (e) {
        var _self = this;
        this.name = 'main_btn';
        var sound = new egret.Sound();
        sound.addEventListener(egret.Event.COMPLETE, this.onLoadComplete, this);
        sound.load('resource/eff1.mp3');
        this._data = RES.getRes('ani').mcObjs;
        var texture = this._data[this._data.main_btn.layers[0][0].libName].layers[0][0].libName;
        var cy = window.navigator.userAgent.indexOf('NetType') != -1 ? 80 : 90;
        var w = RES.getRes(texture)._bitmapWidth;
        var h = this._data.main_btn.stageHeight;
        var x = (this._data.main_btn.screenH - this.scale * w) / 2;
        var y = innerHeight / innerWidth * 640 - h - cy;
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
        this.touchEnabled = true;
        this._data.main_btn.layers.forEach(function (el, i, arr) {
            this.layers[i] = {};
            this.layers[i].frameStopArr = [];
            this.layers[i].texture = {};
            this.layers[i].currentFrame = 0;
            this.layers[i].layer = new egret.Sprite();
            this.addChild(this.layers[i].layer);
            el.forEach(function (el, i1, arr) {
                var layData = this._data[el.libName];
                var lay = layData.layers[0][0];
                this.layers[i].texture = layData;
                this.layers[i].layer.x = this.scale * el.x;
                this.layers[i].layer.y = this.scale * el.y;
                this.layers[i].img = new egret.Bitmap();
                this.layers[i].layer.addChild(this.layers[i].img);
                layData.layers[0].forEach(function (el, i2, arr) {
                    var stop = i2 == 0 ? (el.frameNum ? el.frameNum : 1) : this.layers[i].frameStopArr[i2 - 1] + (el.frameNum ? el.frameNum : 1);
                    this.layers[i].frameStopArr.push(stop);
                }, this);
            }, this);
        }, this);
        this.timer = new egret.Timer(50, 10);
        this.timerRound = new egret.Timer(33, 0);
        this.timerRound.start();
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
        this.timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.onTimerComplete, this);
        this.timerRound.addEventListener(egret.TimerEvent.TIMER, this.onTimerRound, this);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
    };
    main_btn.prototype.onLoadComplete = function (event) {
        this.sound = event.target;
    };
    main_btn.prototype.onSoundComplete = function (event) {
        console.log(2);
        this.timer.start();
        document.getElementById('aud').setAttribute('src', 'resource/bgm2.mp3');
    };
    main_btn.prototype.onTouchTap = function (e) {
        document.getElementById('aud').setAttribute('src', '');
        var channel = this.sound.play(0, 1);
        channel.addEventListener(egret.Event.SOUND_COMPLETE, this.onSoundComplete, this);
    };
    main_btn.prototype.onTimer = function () {
        this.$parent.getChildByName('chanel1').alpha = this.alpha -= 0.1;
    };
    main_btn.prototype.onTimerComplete = function () {
        this.chanel2 = new chanel2();
        var el = this.$parent.getChildByName('chanel1');
        el.alpha = this.alpha = 0;
        this.$parent.removeChild(el);
        this.$parent.addChild(this.chanel2);
        this.timer.stop();
        this.$parent.removeChild(this);
    };
    main_btn.prototype.onTimerRound = function (e) {
        this.layers.forEach(function (el, index, arr) {
            var idx = el.frameStopArr.length - 1;
            el.currentFrame++;
            if (el.currentFrame == el.texture.totalFrame)
                el.currentFrame = 1;
            for (var i = 0; i < el.frameStopArr.length; i++) {
                if (el.currentFrame <= el.frameStopArr[i]) {
                    idx = i;
                    break;
                }
            }
            var ele = el.texture.layers[0][idx];
            el.img.texture = RES.getRes(ele.libName || el.texture.layers[0][0].libName);
            el.img.matrix = new egret.Matrix(ele.a || this.scale, ele.b || 0, ele.c || 0, ele.d || this.scale, (index == 2 ? this.scale : 1) * (ele.x + (ele.cx || 0)), (index == 2 ? this.scale : 1) * (ele.y + (ele.cy || 0)));
            el.img.alpha = ele.al || 1;
        }, this);
    };
    main_btn.prototype.onRemoveFromStage = function () {
        this.timerRound.stop();
        egret.localStorage.setItem('vidIndex1', 'false');
        egret.localStorage.setItem('vidIndex2', 'false');
        egret.localStorage.setItem('vidIndex3', 'false');
        egret.localStorage.setItem('vidIndex4', 'false');
    };
    return main_btn;
}(egret.Sprite));
__reflect(main_btn.prototype, "main_btn");
