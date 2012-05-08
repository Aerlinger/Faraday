draw2d.MyInputPort=function(_24d8){
draw2d.InputPort.call(this,_24d8);
};
draw2d.MyInputPort.prototype=new draw2d.InputPort();
draw2d.MyInputPort.prototype.onDrop=function(port){
if(port.getMaxFanOut&&port.getMaxFanOut()<=port.getFanOut()){
return;
}
if(this.parentNode.id==port.parentNode.id){
}else{
var _24da=new draw2d.CommandConnect(this.parentNode.workflow,port,this);
_24da.setConnection(new draw2d.DecoratedConnection());
this.parentNode.workflow.getCommandStack().execute(_24da);
}
};
