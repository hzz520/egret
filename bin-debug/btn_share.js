var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var btn_share = (function (_super) {
    __extends(btn_share, _super);
    function btn_share() {
        var _this = _super.call(this) || this;
        _this.layers = [];
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        _this.addEventListener(egret.Event.ENTER_FRAME, _this.onEnterFrame, _this);
        return _this;
    }
    btn_share.prototype.onAddToStage = function () {
        this.name = 'btn_share';
        this._data = RES.getRes('ani').mcObjs;
        var flag = window.navigator.userAgent.indexOf('NetType') != -1 ? 0 : 50;
        this._data.btn_share.layers.forEach(function (el, i, arr) {
            this.layers[i] = {};
            this.layers[i].frameStopArr = [];
            this.layers[i].texture = {};
            this.layers[i].currentFrame = 0;
            this.layers[i].layer = new egret.Sprite();
            this.addChild(this.layers[i].layer);
            el.forEach(function (el, i1, arr) {
                this.layers[i].layer.x = el.x + (el.cx || 0);
                this.layers[i].layer.y = el.y + (el.cy || 0) + flag;
                if (el.libName.indexOf('mc') == -1) {
                    this.layers[i].img = new egret.Bitmap();
                    this.layers[i].layer.addChild(this.layers[i].img);
                    this.layers[i].texture = el;
                    this.layers[i].img.texture = RES.getRes(el.libName);
                    this.layers[i].img.alpha = el.al || 1;
                }
                else {
                    var layData = this._data[el.libName];
                    this.layers[i].texture = layData;
                    if (layData.layers.length != 1) {
                        this.layers[i].imgArr = [];
                        layData.layers.forEach(function (el, i2, arr) {
                            var lay = el[0];
                            this.layers[i].imgArr[i2] = new egret.Bitmap();
                            this.layers[i].layer.addChild(this.layers[i].imgArr[i2]);
                            el.forEach(function (el, i3, arr) {
                                if (this.layers[i].frameStopArr[i2] == undefined)
                                    this.layers[i].frameStopArr[i2] = [];
                                var stop = i3 == 0 ? (el.frameNum ? el.frameNum : 1) : (this.layers[i].frameStopArr[i2][i3 - 1] + (el.frameNum ? el.frameNum : 1));
                                this.layers[i].frameStopArr[i2].push(stop);
                            }, this);
                        }, this);
                    }
                    else {
                        if (layData.layers[0][0].libName.indexOf('mc') == -1) {
                            var lay = layData.layers[0][0];
                            this.layers[i].img = new egret.Bitmap();
                            this.layers[i].layer.addChild(this.layers[i].img);
                            this.layers[i].img.texture = RES.getRes(lay.libName);
                            this.layers[i].img.matrix = new egret.Matrix(lay.a || 1, lay.b || 0, lay.c || 0, lay.d || 1, lay.x, lay.y);
                            this.layers[i].img.alpha = lay.al || 1;
                            layData.layers[0].forEach(function (el, i4, arr) {
                                var stop = i4 == 0 ? (el.frameNum ? el.frameNum : 1) : this.layers[i].frameStopArr[i4 - 1] + (el.frameNum ? el.frameNum : 1);
                                this.layers[i].frameStopArr.push(stop);
                            }, this);
                        }
                        else {
                            layData = this._data[layData.layers[0][0].libName];
                            this.layers[i].texture = layData;
                            if (layData.layers.length == 1) {
                                var lay = layData.layers[0][0];
                                this.layers[i].img = new egret.Bitmap();
                                this.layers[i].layer.addChild(this.layers[i].img);
                                this.layers[i].img.texture = RES.getRes(lay.libName);
                                this.layers[i].img.matrix = new egret.Matrix(lay.a || 1, lay.b || 0, lay.c || 0, lay.d || 1, lay.x, lay.y);
                                this.layers[i].img.alpha = lay.al || 1;
                                layData.layers[0].forEach(function (el, i4, arr) {
                                    var stop = i4 == 0 ? (el.frameNum ? el.frameNum : 1) : this.layers[i].frameStopArr[i4 - 1] + (el.frameNum ? el.frameNum : 1);
                                    this.layers[i].frameStopArr.push(stop);
                                }, this);
                            }
                            else {
                                this.layers[i].imgArr = [];
                                layData.layers.forEach(function (el, i2, arr) {
                                    var lay = el[0];
                                    this.layers[i].imgArr[i2] = new egret.Bitmap();
                                    this.layers[i].layer.addChild(this.layers[i].imgArr[i2]);
                                    el.forEach(function (el, i3, arr) {
                                        if (this.layers[i].frameStopArr[i2] == undefined)
                                            this.layers[i].frameStopArr[i2] = [];
                                        var stop = i3 == 0 ? (el.frameNum ? el.frameNum : 1) : (this.layers[i].frameStopArr[i2][i3 - 1] + (el.frameNum ? el.frameNum : 1));
                                        this.layers[i].frameStopArr[i2].push(stop);
                                    }, this);
                                }, this);
                            }
                        }
                    }
                }
            }, this);
        }, this);
    };
    btn_share.prototype.onTimer = function (e) {
        this.alpha = 0 + e.target.currentCount * 0.1;
    };
    btn_share.prototype.onEnterFrame = function () {
        this.layers.forEach(function (el, index, arr) {
            if (el.frameStopArr.length != 0) {
                if (el.img) {
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
                    el.img.matrix = new egret.Matrix(ele.a || 1, ele.b || 0, ele.c || 0, ele.d || 1, ele.x + (ele.cx || 0), ele.y + (ele.cy || 0));
                    el.img.alpha = ele.al || 1;
                }
                else {
                    el.currentFrame++;
                    if (el.currentFrame == el.texture.totalFrame)
                        el.currentFrame = 1;
                    el.imgArr.forEach(function (el, i, arr) {
                        var indexs = this.frameStopArr[i].length - 1;
                        for (var idx = 0; idx < this.frameStopArr[i].length; idx++) {
                            if (this.currentFrame <= this.frameStopArr[i][idx]) {
                                indexs = idx;
                                break;
                            }
                        }
                        var ele = this.texture.layers[i][indexs];
                        var texture = this.texture.layers[i][0].libName || null;
                        el.texture = RES.getRes(ele.libName || texture);
                        el.matrix = new egret.Matrix(ele.a, ele.b, ele.c, ele.d, (ele.x || 0) + (ele.cx || 0), (ele.y || 0) + (ele.cy || 0));
                        el.alpha = ele.al || 1;
                    }, el);
                }
            }
        }, this);
    };
    return btn_share;
}(egret.Sprite));
__reflect(btn_share.prototype, "btn_share");
