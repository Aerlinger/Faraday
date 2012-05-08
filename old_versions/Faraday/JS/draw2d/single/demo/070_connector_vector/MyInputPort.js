draw2d.MyInputPort=function(_2cb4){
draw2d.InputPort.call(this,_2cb4);
};
draw2d.MyInputPort.prototype=new draw2d.InputPort();
draw2d.MyInputPort.prototype.onDrop=function(port){
if(port.getMaxFanOut&&port.getMaxFanOut()<=port.getFanOut()){
return;
}
if(this.parentNode.id==port.parentNode.id){
}else{
var _2cb6=new draw2d.CommandConnect(this.parentNode.workflow,port,this);
_2cb6.setConnection(new draw2d.ArrowConnection());
this.parentNode.workflow.getCommandStack().execute(_2cb6);
}
};
