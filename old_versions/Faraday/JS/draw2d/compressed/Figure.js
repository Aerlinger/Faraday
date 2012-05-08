/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

draw2d.Figure=function(){this.construct();};draw2d.Figure.prototype.type="draw2d.Figure";draw2d.Figure.ZOrderBaseIndex=100;draw2d.Figure.setZOrderBaseIndex=function(_a71){draw2d.Figure.ZOrderBaseIndex=_a71;};draw2d.Figure.prototype.construct=function(){this.lastDragStartTime=0;this.x=0;this.y=0;this.width=10;this.height=10;this.border=null;this.id=draw2d.UUID.create();this.html=this.createHTMLElement();this.canvas=null;this.workflow=null;this.draggable=null;this.parent=null;this.isMoving=false;this.canSnapToHelper=true;this.snapToGridAnchor=new draw2d.Point(0,0);this.timer=-1;this.model=null;this.alpha=1;this.alphaBeforeOnDrag=1;this.properties={};this.moveListener=new draw2d.ArrayList();this.setDimension(this.width,this.height);this.setDeleteable(true);this.setCanDrag(true);this.setResizeable(true);this.setSelectable(true);};draw2d.Figure.prototype.dispose=function(){this.canvas=null;this.workflow=null;this.moveListener=null;if(this.draggable!==null){this.draggable.removeEventListener("mouseenter",this.tmpMouseEnter);this.draggable.removeEventListener("mouseleave",this.tmpMouseLeave);this.draggable.removeEventListener("dragend",this.tmpDragend);this.draggable.removeEventListener("dragstart",this.tmpDragstart);this.draggable.removeEventListener("drag",this.tmpDrag);this.draggable.removeEventListener("dblclick",this.tmpDoubleClick);this.draggable.node=null;this.draggable.target.removeAllElements();}this.draggable=null;if(this.border!==null){this.border.dispose();}this.border=null;if(this.parent!==null){this.parent.removeChild(this);}};draw2d.Figure.prototype.getProperties=function(){return this.properties;};draw2d.Figure.prototype.getProperty=function(key){return this.properties[key];};draw2d.Figure.prototype.setProperty=function(key,_a74){this.properties[key]=_a74;this.setDocumentDirty();};draw2d.Figure.prototype.getId=function(){return this.id;};draw2d.Figure.prototype.setId=function(id){this.id=id;if(this.html!==null){this.html.id=id;}};draw2d.Figure.prototype.setCanvas=function(_a76){this.canvas=_a76;};draw2d.Figure.prototype.getWorkflow=function(){return this.workflow;};draw2d.Figure.prototype.setWorkflow=function(_a77){if(this.draggable===null){this.html.tabIndex="0";var _a78=this;this.keyDown=function(_a79){_a79.cancelBubble=true;_a79.returnValue=true;_a78.onKeyDown(_a79.keyCode,_a79.ctrlKey);};if(this.html.addEventListener){this.html.addEventListener("keydown",this.keyDown,false);}else{if(this.html.attachEvent){this.html.attachEvent("onkeydown",this.keyDown);}}this.draggable=new draw2d.Draggable(this.html,draw2d.Draggable.DRAG_X|draw2d.Draggable.DRAG_Y);this.draggable.node=this;this.tmpContextMenu=function(_a7a){_a78.onContextMenu(_a78.x+_a7a.x,_a7a.y+_a78.y);};this.tmpMouseEnter=function(_a7b){_a78.onMouseEnter();};this.tmpMouseLeave=function(_a7c){_a78.onMouseLeave();};this.tmpDragend=function(_a7d){_a78.onDragend();};this.tmpDragstart=function(_a7e){var w=_a78.workflow;w.showMenu(null);if(w.toolPalette&&w.toolPalette.activeTool){_a7e.returnValue=false;w.onMouseDown(_a78.x+_a7e.x,_a7e.y+_a78.y);w.onMouseUp(_a78.x+_a7e.x,_a7e.y+_a78.y);return;}if(!(_a78 instanceof draw2d.ResizeHandle)&&!(_a78 instanceof draw2d.Port)){var line=w.getBestLine(_a78.x+_a7e.x,_a7e.y+_a78.y);if(line!==null){_a7e.returnValue=false;w.setCurrentSelection(line);w.showLineResizeHandles(line);w.onMouseDown(_a78.x+_a7e.x,_a7e.y+_a78.y);return;}else{if(_a78.isSelectable()){w.showResizeHandles(_a78);w.setCurrentSelection(_a78);}}}_a7e.returnValue=_a78.onDragstart(_a7e.x,_a7e.y);};this.tmpDrag=function(_a81){_a78.onDrag();};this.tmpDoubleClick=function(_a82){_a78.onDoubleClick();};this.draggable.addEventListener("contextmenu",this.tmpContextMenu);this.draggable.addEventListener("mouseenter",this.tmpMouseEnter);this.draggable.addEventListener("mouseleave",this.tmpMouseLeave);this.draggable.addEventListener("dragend",this.tmpDragend);this.draggable.addEventListener("dragstart",this.tmpDragstart);this.draggable.addEventListener("drag",this.tmpDrag);this.draggable.addEventListener("dblclick",this.tmpDoubleClick);}this.workflow=_a77;};draw2d.Figure.prototype.createHTMLElement=function(){var item=document.createElement("div");item.id=this.id;item.style.position="absolute";item.style.left=this.x+"px";item.style.top=this.y+"px";item.style.height=this.width+"px";item.style.width=this.height+"px";item.style.margin="0px";item.style.padding="0px";item.style.outline="none";item.style.zIndex=""+draw2d.Figure.ZOrderBaseIndex;return item;};draw2d.Figure.prototype.setParent=function(_a84){this.parent=_a84;};draw2d.Figure.prototype.getParent=function(){return this.parent;};draw2d.Figure.prototype.getZOrder=function(){return this.html.style.zIndex;};draw2d.Figure.prototype.setZOrder=function(_a85){this.html.style.zIndex=_a85;};draw2d.Figure.prototype.hasFixedPosition=function(){return false;};draw2d.Figure.prototype.getMinWidth=function(){return 5;};draw2d.Figure.prototype.getMinHeight=function(){return 5;};draw2d.Figure.prototype.getHTMLElement=function(){if(this.html===null){this.html=this.createHTMLElement();}return this.html;};draw2d.Figure.prototype.paint=function(){};draw2d.Figure.prototype.setBorder=function(_a86){if(this.border!==null){this.border.figure=null;}this.border=_a86;this.border.figure=this;this.border.refresh();this.setDocumentDirty();};draw2d.Figure.prototype.onRemove=function(_a87){};draw2d.Figure.prototype.onContextMenu=function(x,y){var menu=this.getContextMenu();if(menu!==null){this.workflow.showMenu(menu,x,y);}};draw2d.Figure.prototype.getContextMenu=function(){return null;};draw2d.Figure.prototype.onDoubleClick=function(){};draw2d.Figure.prototype.onMouseEnter=function(){};draw2d.Figure.prototype.onMouseLeave=function(){};draw2d.Figure.prototype.onDrag=function(){this.x=this.draggable.getLeft();this.y=this.draggable.getTop();if(this.isMoving==false){this.isMoving=true;this.alphaBeforeOnDrag=this.getAlpha();this.setAlpha(this.alphaBeforeOnDrag*0.5);}this.fireMoveEvent();};draw2d.Figure.prototype.onDragend=function(){if(this.getWorkflow().getEnableSmoothFigureHandling()===true){var _a8b=this;var _a8c=function(){if(_a8b.alpha<_a8b.alphaBeforeOnDrag){_a8b.setAlpha(Math.min(1,_a8b.alpha+0.05));}else{window.clearInterval(_a8b.timer);_a8b.timer=-1;}};if(_a8b.timer>0){window.clearInterval(_a8b.timer);}_a8b.timer=window.setInterval(_a8c,20);}else{this.setAlpha(this.alphaBeforeOnDrag);}this.command.setPosition(this.x,this.y);this.workflow.commandStack.execute(this.command);this.command=null;this.isMoving=false;this.workflow.hideSnapToHelperLines();this.fireMoveEvent();};draw2d.Figure.prototype.onDragstart=function(x,y){this.command=this.createCommand(new draw2d.EditPolicy(draw2d.EditPolicy.MOVE));return this.command!==null;};draw2d.Figure.prototype.setCanDrag=function(flag){this.canDrag=flag;if(flag){this.html.style.cursor="move";}else{this.html.style.cursor="";}};draw2d.Figure.prototype.getCanDrag=function(){return this.canDrag;};draw2d.Figure.prototype.setAlpha=function(_a90){if(this.alpha===_a90){return;}this.alpha=Math.max(0,Math.min(1,_a90));if(this.alpha==1){this.html.style.filter="";this.html.style.opacity="";}else{this.html.style.filter="alpha(opacity="+Math.round(this.alpha*100)+")";this.html.style.opacity=this.alpha;}};draw2d.Figure.prototype.getAlpha=function(){return this.alpha;};draw2d.Figure.prototype.setDimension=function(w,h){this.width=Math.max(this.getMinWidth(),w);this.height=Math.max(this.getMinHeight(),h);if(this.html===null){return;}this.html.style.width=this.width+"px";this.html.style.height=this.height+"px";this.fireMoveEvent();if(this.workflow!==null&&this.workflow.getCurrentSelection()==this){this.workflow.showResizeHandles(this);}};draw2d.Figure.prototype.setPosition=function(xPos,yPos){this.x=xPos;this.y=yPos;if(this.html===null){return;}this.html.style.left=this.x+"px";this.html.style.top=this.y+"px";this.fireMoveEvent();if(this.workflow!==null&&this.workflow.getCurrentSelection()==this){this.workflow.showResizeHandles(this);}};draw2d.Figure.prototype.isResizeable=function(){return this.resizeable;};draw2d.Figure.prototype.setResizeable=function(flag){this.resizeable=flag;};draw2d.Figure.prototype.isSelectable=function(){return this.selectable;};draw2d.Figure.prototype.setSelectable=function(flag){this.selectable=flag;};draw2d.Figure.prototype.isStrechable=function(){return true;};draw2d.Figure.prototype.isDeleteable=function(){return this.deleteable;};draw2d.Figure.prototype.setDeleteable=function(flag){this.deleteable=flag;};draw2d.Figure.prototype.setCanSnapToHelper=function(flag){this.canSnapToHelper=flag;};draw2d.Figure.prototype.getCanSnapToHelper=function(){return this.canSnapToHelper;};draw2d.Figure.prototype.getSnapToGridAnchor=function(){return this.snapToGridAnchor;};draw2d.Figure.prototype.setSnapToGridAnchor=function(_a99){this.snapToGridAnchor=_a99;};draw2d.Figure.prototype.getBounds=function(){return new draw2d.Dimension(this.getX(),this.getY(),this.getWidth(),this.getHeight());};draw2d.Figure.prototype.getWidth=function(){return this.width;};draw2d.Figure.prototype.getHeight=function(){return this.height;};draw2d.Figure.prototype.getY=function(){return this.y;};draw2d.Figure.prototype.getX=function(){return this.x;};draw2d.Figure.prototype.getAbsoluteY=function(){return this.y;};draw2d.Figure.prototype.getAbsoluteX=function(){return this.x;};draw2d.Figure.prototype.onKeyDown=function(_a9a,ctrl){if(_a9a==46){this.workflow.getCommandStack().execute(this.createCommand(new draw2d.EditPolicy(draw2d.EditPolicy.DELETE)));}if(ctrl){this.workflow.onKeyDown(_a9a,ctrl);}};draw2d.Figure.prototype.getPosition=function(){return new draw2d.Point(this.x,this.y);};draw2d.Figure.prototype.isOver=function(iX,iY){var x=this.getAbsoluteX();var y=this.getAbsoluteY();var iX2=x+this.width;var iY2=y+this.height;return (iX>=x&&iX<=iX2&&iY>=y&&iY<=iY2);};draw2d.Figure.prototype.attachMoveListener=function(_aa2){if(_aa2===null||this.moveListener===null){return;}this.moveListener.add(_aa2);};draw2d.Figure.prototype.detachMoveListener=function(_aa3){if(_aa3===null||this.moveListener===null){return;}this.moveListener.remove(_aa3);};draw2d.Figure.prototype.fireMoveEvent=function(){this.setDocumentDirty();var size=this.moveListener.getSize();for(var i=0;i<size;i++){this.moveListener.get(i).onOtherFigureMoved(this);}};draw2d.Figure.prototype.setModel=function(_aa6){if(this.model!==null){this.model.removePropertyChangeListener(this);}this.model=_aa6;if(this.model!==null){this.model.addPropertyChangeListener(this);}};draw2d.Figure.prototype.getModel=function(){return this.model;};draw2d.Figure.prototype.onOtherFigureMoved=function(_aa7){};draw2d.Figure.prototype.setDocumentDirty=function(){if(this.workflow!==null){this.workflow.setDocumentDirty();}};draw2d.Figure.prototype.disableTextSelection=function(_aa8){_aa8.onselectstart=function(){return false;};_aa8.unselectable="on";_aa8.className=_aa8.className+" unselectable";_aa8.onmousedown=function(){return false;};};draw2d.Figure.prototype.createCommand=function(_aa9){if(_aa9.getPolicy()==draw2d.EditPolicy.MOVE){if(!this.canDrag){return null;}return new draw2d.CommandMove(this);}if(_aa9.getPolicy()==draw2d.EditPolicy.DELETE){if(!this.isDeleteable()){return null;}return new draw2d.CommandDelete(this);}if(_aa9.getPolicy()==draw2d.EditPolicy.RESIZE){if(!this.isResizeable()){return null;}return new draw2d.CommandResize(this);}return null;};