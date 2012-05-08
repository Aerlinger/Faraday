draw2d.ForeignKeyModel=function(_39b0,_39b1,_39b2,_39b3){
draw2d.AbstractConnectionModel.call(this);
this.fromTable=_39b2;
this.fromField=_39b3;
this.toTable=_39b0;
this.toField=_39b1;
};
draw2d.ForeignKeyModel.prototype=new draw2d.AbstractConnectionModel();
draw2d.ForeignKeyModel.prototype.type="draw2d.ForeignKeyModel";
draw2d.ForeignKeyModel.prototype.getSourceModel=function(){
return this.getDatabaseModel().getTableModel(this.toTable);
};
draw2d.ForeignKeyModel.prototype.getTargetModel=function(){
return this.getDatabaseModel().getTableModel(this.fromTable);
};
draw2d.ForeignKeyModel.prototype.getSourcePortName=function(){
return "out_"+this.toField;
};
draw2d.ForeignKeyModel.prototype.getTargetPortName=function(){
return "in_"+this.fromField;
};
draw2d.ForeignKeyModel.prototype.getDatabaseModel=function(){
return this.getModelParent().getDatabaseModel();
};
draw2d.ForeignKeyModel.prototype.getPersistentAttributes=function(){
var att=draw2d.AbstractObjectModel.prototype.getPersistentAttributes.call(this);
att.fromTable=this.fromTable;
att.fromField=this.fromField;
att.toTable=this.toTable;
att.toField=this.toField;
return att;
};
