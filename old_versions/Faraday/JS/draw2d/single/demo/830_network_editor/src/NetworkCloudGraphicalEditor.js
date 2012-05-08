draw2d.NetworkCloudGraphicalEditor=function(id,_378b){
draw2d.GraphicalEditor.call(this,id);
this.readonly=_378b;
};
draw2d.NetworkCloudGraphicalEditor.prototype=new draw2d.GraphicalEditor();
draw2d.NetworkCloudGraphicalEditor.prototype.type="draw2d.NetworkCloudGraphicalEditor";
draw2d.NetworkCloudGraphicalEditor.prototype.setModel=function(model){
try{
this.model=model;
this.getGraphicalViewer().setModel(this.model);
this.getGraphicalViewer().setEditPartFactory(new draw2d.NetworkCloudGraphicalEditorFactory(this.readonly));
this.getGraphicalViewer().setViewPort("scrollarea");
this.getGraphicalViewer().setPanning(true);
this.getGraphicalViewer().setCurrentSelection(null);
var _378d=new draw2d.ExternalPalette(this.getGraphicalViewer(),"object_panel");
var part1=new draw2d.ServerPalettePart(model);
var part2=new draw2d.StoragePalettePart(model);
var part3=new draw2d.SwitchPalettePart(model);
_378d.addPalettePart(part1);
part1.setPosition(20,40);
_378d.addPalettePart(part2);
part2.setPosition(20,90);
_378d.addPalettePart(part3);
part3.setPosition(20,140);
var _3791=new draw2d.Toolbar("toolbar");
var _3792=new draw2d.ToolbarButtonGroup();
_3791.addElement(_3792);
_3792.addElement(new draw2d.ToolbarButtonSave(this));
if(draw2d.Configuration.APPLY_XML!==null){
_3792.addElement(new draw2d.ToolbarButtonApply(this));
}
_3792.addElement(new draw2d.ToolbarButtonShowXML(this));
var _3793=new draw2d.ToolbarButtonGroup();
_3791.addElement(_3793);
_3793.addElement(new draw2d.ToolbarButtonUndo(this));
_3793.addElement(new draw2d.ToolbarButtonRedo(this));
this.getGraphicalViewer().addSelectionListener(new draw2d.FlowMenu(editor.getGraphicalViewer()));
this.propertyPanel=new draw2d.PropertyPanel("property_panel");
this.getGraphicalViewer().addSelectionListener(this.propertyPanel);
}
catch(e){
pushErrorStack(e,"draw2d.NetworkCloudGraphicalEditor.prototype.setModel=function()");
}
};
draw2d.NetworkCloudGraphicalEditor.prototype.getCommandStack=function(){
return this.getGraphicalViewer().getCommandStack();
};
draw2d.NetworkCloudGraphicalEditor.prototype.setFatalError=function(_3794){
var _3795=document.createElement("div");
var _3796=document.createElement("div");
_3796.className="fatal_error_message";
_3795.className="fatal_error_overlay";
_3796.innerHTML="<br><br><br><br><br>"+_3794;
document.body.appendChild(_3795);
document.body.appendChild(_3796);
new fx.Opacity(_3795).setOpacity(0.3);
_3795.style.display="";
};
draw2d.NetworkCloudGraphicalEditor.prototype.isReadonly=function(){
return this.readonly;
};
draw2d.NetworkCloudGraphicalEditor.prototype.getModel=function(){
return this.model;
};
