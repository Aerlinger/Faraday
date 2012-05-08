draw2d.ToolSave=function(_3102){
draw2d.ToolGeneric.call(this,_3102);
this.setDimension(25,25);
};
draw2d.ToolSave.prototype=new draw2d.Button();
draw2d.ToolSave.prototype.type="ToolSave";
draw2d.ToolSave.prototype.execute=function(x,y){
alert(new draw2d.XMLSerializer_01().toXML(this.palette.workflow.getDocument()));
};
