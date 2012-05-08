draw2d.MyOutputPort=function(_38aa){
draw2d.OutputPort.call(this,_38aa);
};
draw2d.MyOutputPort.prototype=new draw2d.OutputPort();
draw2d.MyOutputPort.prototype.onDrop=function(port){
if(this.getMaxFanOut()<=this.getFanOut()){
return;
}
if(this.parentNode.id==port.parentNode.id){
}else{
var _38ac=new draw2d.CommandConnect(this.parentNode.workflow,this,port);
_38ac.setConnection(new draw2d.ArrowConnection());
this.parentNode.workflow.getCommandStack().execute(_38ac);
}
};
