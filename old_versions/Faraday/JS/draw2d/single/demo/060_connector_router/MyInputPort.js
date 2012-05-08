draw2d.MyInputPort=function(_2cb1){
draw2d.InputPort.call(this,_2cb1);
};
draw2d.MyInputPort.prototype=new draw2d.InputPort();
draw2d.MyInputPort.prototype.type="MyInputPort";
draw2d.MyInputPort.prototype.onDrop=function(port){
if(port.getMaxFanOut&&port.getMaxFanOut()<=port.getFanOut()){
return;
}
if(this.parentNode.id==port.parentNode.id){
}else{
var _2cb3=new draw2d.CommandConnect(this.parentNode.workflow,port,this);
_2cb3.setConnection(new draw2d.ContextmenuConnection());
this.parentNode.workflow.getCommandStack().execute(_2cb3);
}
};
