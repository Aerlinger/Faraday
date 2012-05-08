draw2d.MyOutputPort=function(_274c){
draw2d.OutputPort.call(this,_274c);
};
draw2d.MyOutputPort.prototype=new draw2d.OutputPort();
draw2d.MyOutputPort.prototype.onDrop=function(port){
if(this.getMaxFanOut()<=this.getFanOut()){
return;
}
if(this.parentNode.id==port.parentNode.id){
}else{
var _274e=new draw2d.CommandConnect(this.parentNode.workflow,this,port);
_274e.setConnection(new draw2d.DoubleclickConnection());
this.parentNode.workflow.getCommandStack().execute(_274e);
}
};
