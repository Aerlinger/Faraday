draw2d.CommandRemoveCloudNode=function(_270d){
draw2d.Command.call(this,"Remove Network Element");
this.cloudNode=_270d;
this.parent=this.cloudNode.getModelParent();
this.connections=null;
};
draw2d.CommandRemoveCloudNode.prototype=new draw2d.Command();
draw2d.CommandRemoveCloudNode.prototype.type="draw2d.CommandRemoveCloudNode";
draw2d.CommandRemoveCloudNode.prototype.execute=function(){
this.redo();
};
draw2d.CommandRemoveCloudNode.prototype.redo=function(){
this.connections=new draw2d.ArrayList();
var cons=this.cloudNode.getModelParent().getConnectionModels().clone();
var count=cons.getSize();
for(var i=0;i<count;i++){
var con=cons.get(i);
if(con.getSourceModel()===this.cloudNode){
con._tmpModelParent=con.getModelParent();
con.getModelParent().removeConnectionModel(con);
this.connections.add(con);
}else{
if(con.getTargetModel()===this.cloudNode){
con._tmpModelParent=con.getModelParent();
con.getModelParent().removeConnectionModel(con);
this.connections.add(con);
}
}
}
this.parent.removeCloudNodeModel(this.cloudNode);
};
draw2d.CommandRemoveCloudNode.prototype.undo=function(){
this.parent.addCloudNodeModel(this.cloudNode);
var count=this.connections.getSize();
for(var i=0;i<count;i++){
var con=this.connections.get(i);
con._tmpModelParent.addConnectionModel(con);
}
};
