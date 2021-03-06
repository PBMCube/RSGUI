
CheckBox = function (game, x, y, text) {
	GUIObject.call(this, game, x, y);

	this._seprate=2;
	this._text=text;
	this._check=false;
	this._onFrame = "rsgui-radiobox-on";
	this._offFrame = "rsgui-radiobox-off";
	this._frame='on';
	this.onChange=new Phaser.Signal();
};
CheckBox.prototype = Object.create(GUIObject.prototype);
CheckBox.prototype.constructor = CheckBox;
CheckBox.prototype.draw=function(){
	var b=this._border;
	var r=this._radius;
	var w=this._originWidth;
	var h=this._originHeight;
	var c=h+this._seprate;
	var fontcolor=this._font.color;
	var font=this.getFont();
	this._bmd.cls();
	this._bmd.ctx.strokeStyle = this._borderColor;
	if(!this._hasTexture){
		//draw checkbox background
		this._bmd.ctx.fillStyle= this._color;
		this._bmd.ctx.roundRect(b+r, b+r, h-2*r-2*b, h-2*r-2*b, r, true);
		this._bmd.ctx.fill();
		//draw check on mark
		if(this._check){
			this._bmd.ctx.fillStyle= this._checkColor;
			this._bmd.ctx.beginPath();
			this._bmd.ctx.arc(h/2,h/2,h/4,0,2*Math.PI);
			this._bmd.ctx.closePath();
			this._bmd.ctx.fill();
		}
	}else{
		var texture=this._texture[this._frame];
		this._bmd.copy(texture.key,0,0,texture.width,texture.height,r,r,h-2*r,h-2*r);
	}
	//draw text
	this._bmd.ctx.font=font;
	this._bmd.ctx.fillStyle=fontcolor;
	this._bmd.ctx.textBaseline="middle"
	this._bmd.ctx.fillText(this._text, c, h/2);
	if(!this._enabled){
		this._bmd.ctx.globalCompositeOperation = "source-atop";
		this._bmd.ctx.fillStyle='rgba(192,192,192,0.5)';
		this._bmd.ctx.fillRect(0,0,w,h);
	}
}
CheckBox.prototype.onInputDownHandler = function (sprite, pointer) {
	if(this._check) this.uncheck();
	else this.check();
	GUIObject.prototype.onInputDownHandler.call(this,sprite,pointer);
};
CheckBox.prototype.getType=function(){
	return 'checkbox';
}
CheckBox.prototype.check=function(){
	if(this._enabled && !this._check){
		this._check=true;
		this._frame='on';
		this._redraw=true;
		this.onChange.dispatch(true);
	}
}
CheckBox.prototype.uncheck=function(){
	if(this._enabled && this._check){
		this._check=false;
		this._frame='off';
		this._redraw=true;
		this.onChange.dispatch(false);
	}
}
CheckBox.prototype.setTheme=function(theme){
	this._checkColor=theme.check;
	this._extendWidth=this._font.size+this._seprate;
	GUIObject.prototype.setTheme.call(this,theme);
}
CheckBox.prototype.getValue=function(){
	return this._check;
}
CheckBox.prototype.setText=function(text){
	this._text=text;
	this.fit();
}
