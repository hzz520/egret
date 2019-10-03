var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var LoadingUI = (function (_super) {
    __extends(LoadingUI, _super);
    function LoadingUI() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    LoadingUI.prototype.onAddToStage = function () {
        this.textField = new egret.TextField();
        this.name = 'LoadingUI';
        this.bgImg = new egret.Bitmap();
        this.img = new egret.Bitmap();
        RES.getResByUrl('resource/img/ld_bg.jpg', function (e) {
            this.bgImg.texture = e;
            this.parent.getChildByName('main').addChild(this.bgImg);
        }, this);
        RES.getResByUrl('resource/img/ld.png', function (e) {
            this.img.texture = e;
            this.img.x = (640 - this.img.texture._bitmapWidth) / 2;
            this.img.y = (innerHeight / innerWidth * 640 - this.img.texture._bitmapHeight) / 2;
        }, this);
        this.addChild(this.img);
        this.addChild(this.textField);
        this.textField.size = 24;
        this.textField.height = 100;
        this.textField.verticalAlign = "middle";
        this.textField.textAlign = "center";
        this.textField.width = 640;
        this.textField.y = (innerHeight / innerWidth * 640 - this.textField.height) / 2;
    };
    LoadingUI.prototype.setProgress = function (current) {
        this.textField.text = current + '0%';
    };
    return LoadingUI;
}(egret.Sprite));
__reflect(LoadingUI.prototype, "LoadingUI");
