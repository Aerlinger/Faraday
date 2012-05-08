/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

draw2d.MyWorkflow=function(id){draw2d.Workflow.call(this,id);};draw2d.MyWorkflow.prototype=new draw2d.Workflow();draw2d.MyWorkflow.prototype.type="MyWorkflow";draw2d.MyWorkflow.prototype.getContextMenu=function(){var menu=new draw2d.Menu();var _7b3=this;menu.appendMenuItem(new draw2d.MenuItem("Grid 10x10",null,function(x,y){_7b3.setGridWidth(10,10);_7b3.setBackgroundImage("grid_10.png",true);}));menu.appendMenuItem(new draw2d.MenuItem("Grid 20x20",null,function(x,y){_7b3.setGridWidth(20,20);_7b3.setBackgroundImage("grid_20.png",true);}));menu.appendMenuItem(new draw2d.MenuItem("Add Circle",null,function(x,y){_7b3.addFigure(new draw2d.Circle(30),x,y);}));return menu;};