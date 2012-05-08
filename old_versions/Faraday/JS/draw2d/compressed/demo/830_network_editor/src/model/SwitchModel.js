/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

draw2d.SwitchModel=function(id){draw2d.AbstractCloudNodeModel.call(this,id);this.dbid="";this.name=draw2d.Configuration.DEFAULT_SWITCH_NAME;this.representation=new draw2d.RepresentationModel(42,42);};draw2d.SwitchModel.prototype=new draw2d.AbstractCloudNodeModel();draw2d.SwitchModel.prototype.type="draw2d.SwitchModel";draw2d.SwitchModel.prototype.tag="switch";draw2d.SwitchModel.prototype.setName=function(_45){var _46=this.name;if(_46===_45){return;}this.name=_45;this.firePropertyChange(draw2d.AbstractCloudNodeModel.EVENT_PROPERTY_CHANGED,_46,_45);};draw2d.SwitchModel.prototype.getName=function(){return this.name;};draw2d.SwitchModel.prototype.setPosition=function(_47,_48){_47=Math.max(0,_47);_48=Math.max(0,_48);var _49=this.representation;if(_49.x===_47&&_49.y===_48){return;}this.representation=new draw2d.RepresentationModel(_47,_48);this.firePropertyChange(draw2d.AbstractCloudNodeModel.EVENT_POSITION_CHANGED,_49,this.representation);};draw2d.SwitchModel.prototype.getPosition=function(){return new draw2d.Point(parseInt(this.representation.x,10),parseInt(this.representation.y,10));};draw2d.SwitchModel.prototype.getPersistentAttributes=function(){var _4a=draw2d.AbstractCloudNodeModel.prototype.getPersistentAttributes.call(this);_4a.attributes.id=this.id;if(this.dbid.length>0){_4a.dbid=this.dbid;}_4a.name=this.name;_4a.representation=this.representation;return _4a;};