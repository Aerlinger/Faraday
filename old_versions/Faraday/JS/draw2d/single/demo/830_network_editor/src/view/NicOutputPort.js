draw2d.NicOutputPort=function(){
draw2d.Port.call(this,new draw2d.ImageFigure(""+draw2d.Configuration.IMAGEPATH+"nic_port.png"));
this.setDimension(16,16);
this.setBackgroundColor(null);
this.setName("output");
};
draw2d.NicOutputPort.prototype=new draw2d.OutputPort();
draw2d.NicOutputPort.prototype.type="draw2d.NicOutputPort";
draw2d.NicOutputPort.prototype.createCommand=function(_38b0){
if(_38b0.getPolicy()==draw2d.EditPolicy.CONNECT){
if(_38b0.source.parentNode.id==_38b0.target.parentNode.id){
return null;
}
if(_38b0.source instanceof draw2d.NicInputPort){
var _38b1=_38b0.source.getParent().getModel();
var _38b2=_38b0.target.getParent().getModel();
return new draw2d.CommandConnectNic(_38b2,_38b1);
}
return null;
}
return draw2d.OutputPort.prototype.createCommand.call(this,_38b0);
};
