draw2d.MountInputPort=function(){
draw2d.Port.call(this,new draw2d.ImageFigure(""+draw2d.Configuration.IMAGEPATH+"mount_port.png"));
this.setDimension(16,16);
this.setBackgroundColor(null);
this.setName("input");
};
draw2d.MountInputPort.prototype=new draw2d.InputPort();
draw2d.MountInputPort.prototype.type="draw2d.MountInputPort";
draw2d.MountInputPort.prototype.createCommand=function(_21dc){
if(_21dc.getPolicy()===draw2d.EditPolicy.CONNECT){
if(_21dc.source.parentNode.id===_21dc.target.parentNode.id){
return null;
}
if(_21dc.source instanceof draw2d.MountOutputPort){
var _21dd=_21dc.source.getParent().getModel();
var _21de=_21dc.target.getParent().getModel();
return new draw2d.CommandConnectMount(_21dd,_21de);
}
return null;
}
return draw2d.InputPort.prototype.createCommand.call(this,_21dc);
};
