
var game_file_list = [
    //以下为自动修改，请勿修改
    //----auto game_file_list start----
	"libs/modules/egret/egret.js",
	"libs/modules/egret/egret.native.js",
	"libs/modules/game/game.js",
	"libs/modules/res/res.js",
	"polyfill/promise.js",
	"bin-debug/Main.js",
	"bin-debug/btn_me.js",
	"bin-debug/chanel1.js",
	"bin-debug/chanel2.js",
	"bin-debug/chanel3.js",
	"bin-debug/indicateView.js",
	"bin-debug/LoadingUI.js",
	"bin-debug/main_btn.js",
	"bin-debug/btn_share.js",
	"bin-debug/tabView1.js",
	"bin-debug/tabView2.js",
	"bin-debug/tabView3.js",
	"bin-debug/tabView4.js",
	"bin-debug/tabViews.js",
	"bin-debug/videoView.js",
	"bin-debug/xu.js",
	//----auto game_file_list end----
];

var window = this;

egret_native.setSearchPaths([""]);

egret_native.requireFiles = function () {
    for (var key in game_file_list) {
        var src = game_file_list[key];
        require(src);
    }
};

egret_native.egretInit = function () {
    if(egret_native.featureEnable) {
        //控制一些优化方案是否开启
        var result = egret_native.featureEnable({
            
        });
    }
    egret_native.requireFiles();
    //egret.dom为空实现
    egret.dom = {};
    egret.dom.drawAsCanvas = function () {
    };
};

egret_native.egretStart = function () {
    var option = {
        //以下为自动修改，请勿修改
        //----auto option start----
		entryClassName: "Main",
		frameRate: 33,
		scaleMode: "fixedWidth",
		contentWidth: 640,
		contentHeight: 1136,
		showPaintRect: true,
		showFPS: false,
		fpsStyles: "x:0,y:0,size:12,textColor:0xffffff,bgAlpha:0.9",
		showLog: false,
		logFilter: "",
		maxTouches: 1,
		textureScaleFactor: 1
		//----auto option end----
    };

    egret.native.NativePlayer.option = option;
    egret.runEgret();
    egret_native.Label.createLabel("/system/fonts/DroidSansFallback.ttf", 20, "", 0);
    egret_native.EGTView.preSetOffScreenBufferEnable(true);
};