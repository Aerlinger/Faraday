/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

draw2d.MountOutputPort=function(){draw2d.Port.call(this,new draw2d.ImageFigure(""+draw2d.Configuration.IMAGEPATH+"mount_port.png"));this.setDimension(16,16);this.setBackgroundColor(null);this.setName("output");};draw2d.MountOutputPort.prototype=new draw2d.OutputPort();draw2d.MountOutputPort.prototype.type="draw2d.MountOutputPort";draw2d.MountOutputPort.prototype.createCommand=function(_ae1){if(_ae1.getPolicy()===draw2d.EditPolicy.CONNECT){if(_ae1.source.parentNode.id===_ae1.target.parentNode.id){return null;}if(_ae1.source instanceof draw2d.MountInputPort){var _ae2=_ae1.source.getParent().getModel();var _ae3=_ae1.target.getParent().getModel();return new draw2d.CommandConnectMount(_ae3,_ae2);}return null;}return draw2d.OutputPort.prototype.createCommand.call(this,_ae1);};