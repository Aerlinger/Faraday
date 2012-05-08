draw2d.MountOutputPort=function(){
draw2d.Port.call(this,new draw2d.ImageFigure(""+draw2d.Configuration.IMAGEPATH+"mount_port.png"));
this.setDimension(16,16);
this.setBackgroundColor(null);
this.setName("output");
};
draw2d.MountOutputPort.prototype=new draw2d.OutputPort();
draw2d.MountOutputPort.prototype.type="draw2d.MountOutputPort";
draw2d.MountOutputPort.prototype.createCommand=function(_27ca){
if(_27ca.getPolicy()===draw2d.EditPolicy.CONNECT){
if(_27ca.source.parentNode.id===_27ca.target.parentNode.id){
return null;
}
if(_27ca.source instanceof draw2d.MountInputPort){
var _27cb=_27ca.source.getParent().getModel();
var _27cc=_27ca.target.getParent().getModel();
return new draw2d.CommandConnectMount(_27cc,_27cb);
}
return null;
}
return draw2d.OutputPort.prototype.createCommand.call(this,_27ca);
};
