draw2d.FlowMenu=function(_3128){
this.actionDelete=new draw2d.ButtonDelete(this);
draw2d.ToolPalette.call(this);
this.setDimension(20,20);
this.setBackgroundColor(new draw2d.Color(220,255,255));
this.currentFigure=null;
this.myworkflow=_3128;
this.added=false;
this.setDeleteable(false);
this.setCanDrag(false);
this.setResizeable(false);
this.setSelectable(false);
this.setBackgroundColor(null);
this.setColor(null);
this.scrollarea.style.borderBottom="0px";
this.actionDelete.setPosition(0,0);
this.addChild(this.actionDelete);
};
draw2d.FlowMenu.prototype=new draw2d.ToolPalette();
draw2d.FlowMenu.prototype.setAlpha=function(_3129){
draw2d.Figure.prototype.setAlpha.call(this,_3129);
};
draw2d.FlowMenu.prototype.hasTitleBar=function(){
return false;
};
draw2d.FlowMenu.prototype.onSelectionChanged=function(_312a){
if(_312a===this.currentFigure){
return;
}
if(_312a instanceof draw2d.Line){
return;
}
if(this.added===true){
this.myworkflow.removeFigure(this);
this.added=false;
}
if(_312a!==null&&this.added===false){
if(this.myworkflow.getEnableSmoothFigureHandling()===true){
this.setAlpha(0.01);
}
this.myworkflow.addFigure(this,100,100);
this.added=true;
}
if(this.currentFigure!==null){
this.currentFigure.detachMoveListener(this);
}
this.currentFigure=_312a;
if(this.currentFigure!==null){
this.currentFigure.attachMoveListener(this);
this.onOtherFigureMoved(this.currentFigure);
}
};
draw2d.FlowMenu.prototype.setWorkflow=function(_312b){
draw2d.Figure.prototype.setWorkflow.call(this,_312b);
};
draw2d.FlowMenu.prototype.onOtherFigureMoved=function(_312c){
if(_312c instanceof draw2d.Line){
return;
}
var pos=_312c.getPosition();
this.setPosition(pos.x+_312c.getWidth()+7,pos.y-16);
};
