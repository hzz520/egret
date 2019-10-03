var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var videoView = (function (_super) {
    __extends(videoView, _super);
    function videoView() {
        var _this = _super.call(this) || this;
        _this._currentFrame = 0;
        _this._currentFramePan = 0;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        _this.addEventListener(egret.Event.ENTER_FRAME, _this.onTimer, _this);
        return _this;
    }
    videoView.prototype.onAddToStage = function () {
        this.name = "videoView";
        this.graphics.beginFill(0xffffff, 0);
        this.graphics.drawRect(0, 0, 640, 1139);
        this.graphics.endFill();
        this._videoBg = new egret.Bitmap();
        this._imgText = new egret.Bitmap();
        this._img = new egret.Bitmap();
        this._imgPan = new egret.Bitmap();
        this._videoBg.texture = RES.getRes('bottom');
        this._imgText.texture = RES.getRes("t" + egret.localStorage.getItem('index'));
        var texture = RES.getRes('pan1');
        var bottomPos = innerHeight / innerWidth * this.graphics.$renderNode.width;
        this._videoBg.y = bottomPos - this._videoBg.height;
        this._imgText.x = 25;
        this._imgText.y = bottomPos - this._imgText.height - 0.18 * this._videoBg.height;
        this._imgPan.x = this.graphics.$renderNode.width - texture.textureWidth - 5;
        this._imgPan.y = bottomPos - texture.textureHeight - 0.11 * this._videoBg.height;
        this.addChild(this._videoBg);
        this.addChild(this._img);
        this.addChild(this._imgPan);
        this.addChild(this._imgText);
        // this.timer.addEventListener(egret.TimerEvent.TIMER,this.onTimer,this)
        this.addEventListener(egret.Event.ENTER_FRAME, this.onTimer, this);
    };
    videoView.prototype.onTimer = function () {
        this._currentFrame++;
        this._currentFramePan++;
        if (this._currentFrame === 113)
            this._currentFrame = 1;
        if (this._currentFramePan === 75)
            this._currentFramePan = 1;
        this._img.texture = RES.getRes("" + this._currentFrame);
        this._imgPan.texture = RES.getRes("pan" + this._currentFramePan);
    };
    return videoView;
}(egret.Sprite));
__reflect(videoView.prototype, "videoView");
