draw2d.CommandConnectNic=function(_2708,_2709){
draw2d.Command.call(this,"Connect Switch");
if(_2708===null||_2709===null){
throw "Source and target must be set to create a new  draw2d.CommandConnectNodes object (draw2d.CommandConnectNic.constructor)";
}
if(!(_2708 instanceof draw2d.ServerModel)){
throw "Source must be type of class draw2d.ServerModel. (draw2d.CommandConnectNic.constructor)";
}
if(!(_2709 instanceof draw2d.SwitchModel)){
throw "Target must be type of class draw2d.SwitchModel. (draw2d.CommandConnectNic.constructor)";
}
this.source=_2708;
this.target=_2709;
this.model=null;
};
draw2d.CommandConnectNic.prototype=new draw2d.Command();
draw2d.CommandConnectNic.prototype.type="draw2d.CommandConnectNic";
draw2d.CommandConnectNic.prototype.setConnection=function(_270a){
this.connection=_270a;
};
draw2d.CommandConnectNic.prototype.execute=function(){
this.redo();
};
draw2d.CommandConnectNic.prototype.redo=function(){
if(this.model===null){
this.model=new draw2d.NicConnectionModel(this.source.getId(),this.target.getId());
var nic=new draw2d.NicModel();
nic.setServerReferenceModel(new draw2d.ServerReferenceModel(this.source.getId()));
nic.setSwitchReferenceModel(new draw2d.SwitchReferenceModel(this.target.getId()));
this.model.nicModel=nic;
}
this.source.getNicsModel().addNicModel(this.model.nicModel);
this.source.addConnectionModel(this.model);
};
draw2d.CommandConnectNic.prototype.undo=function(){
this.source.removeConnectionModel(this.model);
this.source.getNicsModel().removeNicModel(this.model.nicModel);
};
