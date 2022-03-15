var Canvas2d = new Object;
Canvas2d.Scene = class {
	assets = new Array;
	click = null;
	background = "white";
	constructor(canvas = document.createElement("canvas")) {
		this.canvas = canvas;
		this.context = canvas.getContext("2d");
		canvas.width = canvas.width || 300;
		canvas.height = canvas.height || 150;
		canvas.onclick = e => {
			var vp = e.target.getBoundingClientRect();
			(this.click || new Function)({x: e.clientX - vp.left, y: e.clientY - vp.top});
		}
	}
	get width() {
		return parseFloat(this.canvas.width);
	}
	set width(value) {
		this.canvas.width = value;
		return value;
	}
	get height() {
		return parseFloat(this.canvas.height);
	}
	set height(value) {
		this.canvas.height = value;
		return value;
	}
	add(asset) {
		if (asset.parent) {
			asset.parent.remove(asset);
		}
		this.assets.push(asset);
		asset.parent = this;
	}
	remove(asset) {
		for (var i = this.assets.length - 1; i >= 0; i--) {
			if (this.assets[i].uuid == asset.uuid){
				this.assets[i].parent = null;
				this.assets.splice(i, 1);
			}
		}
	}
	draw() {
		var ctx = this.context;
		ctx.save();
		ctx.clearRect(0, 0, this.width, this.height);
		ctx.fillStyle = this.background;
		ctx.fillRect(0, 0, this.width, this.height);
		ctx.restore();
		this.assets.forEach(asset => {
			asset.draw();
		});
	}
	get dataURL() {
		return this.canvas.toDataURL();
	}
};
Canvas2d.Asset = class {
	constructor() {
		this.uuid = crypto.randomUUID();
	}
	parent = null;
};
Canvas2d.ImageAsset = class extends Canvas2d.Asset {
	constructor(image = document.createElement("img"), width = 0, height = 0) {
		super();
		this.image = image;
		this.width = width;
		this.height = height;
	}
	x = 0; y = 0; rotation = 0; posFromCenter = false;
	draw() {
		var ctx = this.parent.context;
		ctx.save();
		ctx.translate(this.x + (this.posFromCenter ? 0 : (this.width / 2)), this.y + (this.posFromCenter ? 0 : (this.height / 2)));
		ctx.rotate(this.rotation * Math.PI / 180);
		ctx.drawImage(this.image, this.width / -2, this.height / -2, this.width, this.height);
		ctx.restore();
	}
};
Canvas2d.TextAsset = class extends Canvas2d.Asset {
	constructor(text, x = 0, y = 0, font = "15px Arial", color = "black") {
		super();
		this.text = text;
		this.x = x;
		this.y = y;
		this.font = font;
		this.color = color;
	}
	align = "start"; baseline = "alphabetic"; stroke = false;
	draw() {
		var ctx = this.parent.context;
		ctx.save();
		ctx.textAlign = this.align;
		ctx.textBaseline = this.baseline;
		ctx.font = this.font;
		ctx[this.stroke ? "strokeStyle" : "fillStyle"] = this.color;
		ctx[this.stroke ? "strokeText" : "fillText"](this.text, this.x, this.y);
		ctx.restore();
	}
};
Canvas2d.RectAsset = class extends Canvas2d.Asset {
	constructor(x = 0, y = 0, width = 0, height = 0, color = "black") {
		super();
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.color = color;
	}
	rotation = 0; stroke = false; posFromCenter = false;
	draw() {
		var ctx = this.parent.context;
		ctx.save();
		ctx[this.stroke ? "strokeStyle" : "fillStyle"] = this.color;
		ctx.translate(this.x + (this.posFromCenter ? 0 : (this.width / 2)), this.y + (this.posFromCenter ? 0 : (this.height / 2)));
		ctx.rotate(this.rotation * Math.PI / 180);
		ctx[this.stroke ? "strokeRect" : "fillRect"](this.width / -2, this.height / -2, this.width, this.height);
		ctx.restore();
	}
}
module.exports.Canvas2d = Canvas2d;