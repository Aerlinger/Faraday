draw2d.MyInputPort=function(_2def){
draw2d.InputPort.call(this,_2def);
};
draw2d.MyInputPort.prototype=new draw2d.InputPort();
draw2d.MyInputPort.prototype.type="MyInputPort";
draw2d.MyInputPort.prototype.onDrop=function(port){
if(port.getMaxFanOut&&port.getMaxFanOut()<=port.getFanOut()){
return;
}
if(this.parentNode.id==port.parentNode.id){
}else{
var _2df1=new draw2d.CommandConnect(this.parentNode.workflow,port,this);
_2df1.setConnection(new draw2d.DecoratedConnection());
this.parentNode.workflow.getCommandStack().execute(_2df1);
}
};
