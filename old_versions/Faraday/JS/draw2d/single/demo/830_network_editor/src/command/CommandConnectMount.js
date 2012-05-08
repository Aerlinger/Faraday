draw2d.CommandConnectMount=function(_2fe6,_2fe7){
draw2d.Command.call(this,"Connect Storage");
this.source=_2fe6;
this.target=_2fe7;
this.model=null;
if(this.source===null||this.target===null){
throw "Source and target must be set to create a new  draw2d.CommandConnectNodes object";
}
};
draw2d.CommandConnectMount.prototype=new draw2d.Command();
draw2d.CommandConnectMount.prototype.type="draw2d.CommandConnectMount";
draw2d.CommandConnectMount.prototype.setConnection=function(_2fe8){
this.connection=_2fe8;
};
draw2d.CommandConnectMount.prototype.execute=function(){
this.redo();
};
draw2d.CommandConnectMount.prototype.redo=function(){
if(this.model===null){
this.model=new draw2d.MountModel(this.source.getId(),this.target.getId());
}
this.source.addConnectionModel(this.model);
};
draw2d.CommandConnectMount.prototype.undo=function(){
this.source.removeConnectionModel(this.model);
};
