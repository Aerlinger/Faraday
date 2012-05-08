draw2d.MyInputPort=function(_24b8){
draw2d.InputPort.call(this,_24b8);
};
draw2d.MyInputPort.prototype=new draw2d.InputPort();
draw2d.MyInputPort.prototype.type="MyInputPort";
draw2d.MyInputPort.prototype.onDrop=function(port){
if(port.getMaxFanOut&&port.getMaxFanOut()<=port.getFanOut()){
return;
}
if(this.parentNode.id==port.parentNode.id){
}else{
var _24ba=new draw2d.CommandConnect(this.parentNode.workflow,port,this);
_24ba.setConnection(new draw2d.DoubleclickConnection());
this.parentNode.workflow.getCommandStack().execute(_24ba);
}
};
