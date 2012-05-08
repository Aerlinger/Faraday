draw2d.MyCompartmentFigure=function(){
draw2d.CompartmentFigure.call(this);
this.defaultColor=new draw2d.Color(230,230,250);
this.setBackgroundColor(this.defaultColor);
};
draw2d.MyCompartmentFigure.prototype=new draw2d.CompartmentFigure();
draw2d.MyCompartmentFigure.prototype.onFigureLeave=function(_21d3){
draw2d.CompartmentFigure.prototype.onFigureLeave.call(this,_21d3);
if(_21d3 instanceof draw2d.CompartmentFigure){
_21d3.setBackgroundColor(_21d3.defaultColor);
}
};
draw2d.MyCompartmentFigure.prototype.onFigureDrop=function(_21d4){
draw2d.CompartmentFigure.prototype.onFigureDrop.call(this,_21d4);
if(_21d4 instanceof draw2d.CompartmentFigure){
_21d4.setBackgroundColor(this.getBackgroundColor().darker(0.1));
}
};
draw2d.MyCompartmentFigure.prototype.setBackgroundColor=function(color){
draw2d.CompartmentFigure.prototype.setBackgroundColor.call(this,color);
for(var i=0;i<this.children.getSize();i++){
var child=this.children.get(i);
if(child instanceof draw2d.CompartmentFigure){
child.setBackgroundColor(this.getBackgroundColor().darker(0.1));
}
}
};
