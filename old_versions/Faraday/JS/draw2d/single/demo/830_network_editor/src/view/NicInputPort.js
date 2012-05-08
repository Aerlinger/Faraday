draw2d.NicInputPort=function(){
draw2d.Port.call(this,new draw2d.ImageFigure(""+draw2d.Configuration.IMAGEPATH+"nic_port.png"));
this.setDimension(16,16);
this.setBackgroundColor(null);
this.setName("input");
};
draw2d.NicInputPort.prototype=new draw2d.InputPort();
draw2d.NicInputPort.prototype.type="draw2d.NicInputPort";
draw2d.NicInputPort.prototype.createCommand=function(_39b7){
if(_39b7.getPolicy()===draw2d.EditPolicy.CONNECT){
if(_39b7.source.parentNode.id==_39b7.target.parentNode.id){
return null;
}
if(_39b7.source instanceof draw2d.NicOutputPort){
var _39b8=_39b7.source.getParent().getModel();
var _39b9=_39b7.target.getParent().getModel();
return new draw2d.CommandConnectNic(_39b8,_39b9);
}
return null;
}
return draw2d.InputPort.prototype.createCommand.call(this,_39b7);
};
