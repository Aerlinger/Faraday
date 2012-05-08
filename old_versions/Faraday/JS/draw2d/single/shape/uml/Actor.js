draw2d.shape.uml.Actor=function(name){
this.portRight=null;
draw2d.VectorFigure.call(this);
this.setName(name);
this.setDimension(50,90);
};
draw2d.shape.uml.Actor.prototype=new draw2d.VectorFigure();
draw2d.shape.uml.Actor.prototype.type="shape.uml.Actor";
draw2d.shape.uml.Actor.prototype.setName=function(name){
this.label.innerHTML=name;
};
draw2d.shape.uml.Actor.prototype.setWorkflow=function(_3138){
draw2d.VectorFigure.prototype.setWorkflow.call(this,_3138);
if(_3138!==null&&this.portRight===null){
this.portRight=new draw2d.Port();
this.portRight.setWorkflow(_3138);
this.addPort(this.portRight,this.width,this.height/2);
this.portLeft=new draw2d.Port();
this.portLeft.setWorkflow(_3138);
this.addPort(this.portLeft,0,this.height/2);
}
};
draw2d.shape.uml.Actor.prototype.createHTMLElement=function(){
var item=draw2d.Figure.prototype.createHTMLElement.call(this);
this.label=document.createElement("div");
this.label.style.width="100%";
this.label.style.height="20px";
this.label.style.position="absolute";
this.label.style.textAlign="center";
this.label.style.top="0px";
this.label.style.left="0px";
this.label.style.fontSize="8pt";
this.disableTextSelection(this.label);
return item;
};
draw2d.shape.uml.Actor.prototype.setDimension=function(w,h){
draw2d.VectorFigure.prototype.setDimension.call(this,w,h);
if(this.portRight!==null){
this.portRight.setPosition(this.width,this.height/2);
this.portLeft.setPosition(0,this.height/2);
}
};
draw2d.shape.uml.Actor.prototype.paint=function(){
draw2d.VectorFigure.prototype.paint.call(this);
var _313c=this.getWidth()/2;
var _313d=this.getWidth()/4;
var _313e=this.getHeight()/2;
var _313f=parseInt(this.label.style.height);
var _3140=this.getWidth()*0.2;
var _3141=this.getHeight()*0.1;
this.graphics.drawOval(_313c-_3140/2,0,_3140,_3141);
this.graphics.drawLine(_313c,_3141,_313c,_313e);
this.graphics.drawLine(_313d,_3141*2,this.getWidth()-_313d,_3141*2);
this.graphics.drawLine(_313c,_313e,_313d,this.getHeight()-_313f);
this.graphics.drawLine(_313c,_313e,this.getWidth()-_313d,this.getHeight()-_313f);
this.graphics.paint();
this.label.style.top=(this.getHeight()-_313f)+"px";
this.html.appendChild(this.label);
};
