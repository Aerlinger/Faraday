draw2d.PropertyPage=function(){
};
draw2d.PropertyPage.prototype.type="draw2d.PropertyPage";
draw2d.PropertyPage.prototype.init=function(model){
throw "Inherit classes must override the abstract function [PropertyPage.prototype.init]";
};
draw2d.PropertyPage.prototype.deinit=function(){
throw "Inherit classes must override the abstract function [PropertyPage.prototype.deinit]";
};
draw2d.PropertyPage.prototype.getHTMLElement=function(){
throw "Inherit classes must override the abstract function [PropertyPage.prototype.getHTMLElement]";
};
draw2d.PropertyPage.prototype.onResize=function(w,h){
};
draw2d.PropertyPage.prototype.createInputElement=function(x,y){
var _2632=document.createElement("input");
_2632.type="text";
_2632.style.width="260px";
_2632.style.left=x+"px";
_2632.style.top=y+"px";
_2632.style.font="normal 11px verdana";
_2632.style.paddingLeft="5px";
_2632.style.position="absolute";
return _2632;
};
draw2d.PropertyPage.prototype.createLabelElement=function(text,x,y){
var _2636=document.createElement("div");
_2636.style.left=x+"px";
_2636.style.top=y+"px";
_2636.style.position="absolute";
_2636.className="property_panel_label";
_2636.innerHTML=text;
return _2636;
};
