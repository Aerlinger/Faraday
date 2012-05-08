draw2d.InputFieldFigure=function(){
draw2d.InputPort.call(this);
};
draw2d.InputFieldFigure.prototype=new draw2d.InputPort();
draw2d.InputFieldFigure.prototype.type="draw2d.InputFieldFigure";
draw2d.InputFieldFigure.prototype.createCommand=function(_2d96){
if(_2d96.getPolicy()==draw2d.EditPolicy.CONNECT){
if(_2d96.source.parentNode.id==_2d96.target.parentNode.id){
return null;
}
if(_2d96.source instanceof draw2d.OutputPort){
return new draw2d.CommandConnect(_2d96.canvas,_2d96.source,_2d96.target);
}
}
return draw2d.InputPort.prototype.createCommand.call(this,_2d96);
};
