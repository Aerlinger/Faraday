draw2d.ToolbarButtonGroup=function(){
this.buttons=new draw2d.ArrayList();
this.html=null;
};
draw2d.ToolbarButtonGroup.prototype.getHTMLElement=function(){
if(this.html===null){
this.html=new Element("ul");
this.html.className="toolbar_button_group";
}
return this.html;
};
draw2d.ToolbarButtonGroup.prototype.addElement=function(_2a59){
this.getHTMLElement().appendChild(_2a59.getHTMLElement());
if(this.buttons.getSize()===0){
this.buttons.add(_2a59);
$(_2a59.getHTMLElement()).addClassName("first_button");
}else{
if(this.buttons.getSize()===1){
this.buttons.add(_2a59);
$(_2a59.getHTMLElement()).addClassName("last_button");
}else{
var _2a5a=this.buttons.getLastElement();
$(_2a5a.getHTMLElement()).removeClassName("last_button");
$(_2a5a.getHTMLElement()).addClassName("center_button");
this.buttons.add(_2a59);
$(_2a59.getHTMLElement()).addClassName("last_button");
}
}
};
