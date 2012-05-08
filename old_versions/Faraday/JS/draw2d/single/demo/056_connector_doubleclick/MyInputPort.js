draw2d.MyInputPort=function(_38e1){
draw2d.InputPort.call(this,_38e1);
};
draw2d.MyInputPort.prototype=new draw2d.InputPort();
draw2d.MyInputPort.prototype.type="MyInputPort";
draw2d.MyInputPort.prototype.onDrop=function(port){
if(port.getMaxFanOut&&port.getMaxFanOut()<=port.getFanOut()){
return;
}
if(this.parentNode.id==port.parentNode.id){
}else{
var _38e3=new draw2d.CommandConnect(this.parentNode.workflow,port,this);
_38e3.setConnection(new draw2d.DoubleclickConnection());
this.parentNode.workflow.getCommandStack().execute(_38e3);
}
};
