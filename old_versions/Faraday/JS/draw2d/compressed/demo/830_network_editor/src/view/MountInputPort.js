/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

draw2d.MountInputPort=function(){draw2d.Port.call(this,new draw2d.ImageFigure(""+draw2d.Configuration.IMAGEPATH+"mount_port.png"));this.setDimension(16,16);this.setBackgroundColor(null);this.setName("input");};draw2d.MountInputPort.prototype=new draw2d.InputPort();draw2d.MountInputPort.prototype.type="draw2d.MountInputPort";draw2d.MountInputPort.prototype.createCommand=function(_4f3){if(_4f3.getPolicy()===draw2d.EditPolicy.CONNECT){if(_4f3.source.parentNode.id===_4f3.target.parentNode.id){return null;}if(_4f3.source instanceof draw2d.MountOutputPort){var _4f4=_4f3.source.getParent().getModel();var _4f5=_4f3.target.getParent().getModel();return new draw2d.CommandConnectMount(_4f4,_4f5);}return null;}return draw2d.InputPort.prototype.createCommand.call(this,_4f3);};