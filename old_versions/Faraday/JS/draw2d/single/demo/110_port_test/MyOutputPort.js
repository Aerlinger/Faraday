draw2d.MyOutputPort=function(_24c7){
draw2d.OutputPort.call(this,_24c7);
};
draw2d.MyOutputPort.prototype=new draw2d.OutputPort();
draw2d.MyOutputPort.prototype.onDrop=function(port){
if(this.getMaxFanOut()<=this.getFanOut()){
return;
}
if(this.parentNode.id==port.parentNode.id){
}else{
var _24c9=new draw2d.CommandConnect(this.parentNode.workflow,this,port);
_24c9.setConnection(new draw2d.DecoratedConnection());
this.parentNode.workflow.getCommandStack().execute(_24c9);
}
};
