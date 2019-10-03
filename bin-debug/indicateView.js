var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var indicateView = (function (_super) {
    __extends(indicateView, _super);
    function indicateView() {
        var _this = _super.call(this) || this;
        _this.flag1 = false;
        _this.flag2 = false;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        _this.addEventListener(egret.Event.ENTER_FRAME, _this.onTimer, _this);
        return _this;
    }
    indicateView.prototype.onAddToStage = function () {
        this.name = 'indicateView';
        this.graphics.beginFill(0xffffff, 0);
        this.graphics.drawRect(0, 0, 640, 1136);
        this.graphics.endFill();
        this.hand = new egret.Bitmap();
        this.hand.texture = RES.getRes('hand');
        this.handView = new egret.Sprite();
        this.handView.name = 'handView';
        this.handView.alpha = 0.6;
        this.handView.y = innerHeight / innerWidth * this.graphics.$renderNode.width - this.hand.texture.textureHeight - 276;
        this.handView.x = (this.graphics.$renderNode.width - this.hand.texture.textureWidth) / 2;
        this.handView.addChild(this.hand);
        this.addChild(this.handView);
        this.txt = new egret.Bitmap();
        this.txt.texture = RES.getRes('txt');
        this.txtView = new egret.Sprite();
        this.txtView.name = 'txtView';
        this.txtView.alpha = 0.8;
        this.txtView.y = innerHeight / innerWidth * this.graphics.$renderNode.width - this.txt.texture.textureHeight - 450;
        this.txtView.x = (this.graphics.$renderNode.width - this.txt.texture.textureWidth) / 2;
        this.txtView.addChild(this.txt);
        this.addChild(this.txtView);
    };
    indicateView.prototype.onTimer = function () {
        var handView = this.handView;
        var txtView = this.txtView;
        if (this.flag1) {
            handView.alpha += 0.04;
            if (handView.alpha >= 1) {
                handView.alpha = 0.98;
                this.flag1 = false;
            }
        }
        else {
            handView.alpha -= 0.04;
            if (handView.alpha <= 0.5) {
                handView.alpha = 0.51;
                this.flag1 = true;
            }
        }
        if (this.flag2) {
            txtView.alpha += 0.04;
            if (txtView.alpha >= 1) {
                txtView.alpha = 0.98;
                this.flag2 = false;
            }
        }
        else {
            txtView.alpha -= 0.04;
            if (txtView.alpha <= 0.5) {
                txtView.alpha = 0.51;
                this.flag2 = true;
            }
        }
    };
    return indicateView;
}(egret.Sprite));
__reflect(indicateView.prototype, "indicateView");
