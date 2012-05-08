draw2d.OutputFieldFigure=function(){
draw2d.OutputPort.call(this);
};
draw2d.OutputFieldFigure.prototype=new draw2d.OutputPort();
draw2d.OutputFieldFigure.prototype.createCommand=function(_1e42){
if(_1e42.getPolicy()==draw2d.EditPolicy.CONNECT){
if(_1e42.source.parentNode.id==_1e42.target.parentNode.id){
return null;
}
if(_1e42.source instanceof draw2d.InputPort){
return new draw2d.CommandConnect(_1e42.canvas,_1e42.target,_1e42.source);
}
return null;
}
return draw2d.Port.prototype.createCommand.call(this,_1e42);
};
