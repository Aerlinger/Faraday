/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

draw2d.NetworkCloudGraphicalEditorFactory=function(_1db){this.readonly=_1db;draw2d.EditPartFactory.call(this);};draw2d.NetworkCloudGraphicalEditorFactory.prototype=new draw2d.EditPartFactory();draw2d.NetworkCloudGraphicalEditorFactory.prototype.type="draw2d.NetworkCloudGraphicalEditorFactory";draw2d.NetworkCloudGraphicalEditorFactory.prototype.createEditPart=function(_1dc){var _1dd=null;if(_1dc instanceof draw2d.ServerModel){_1dd=new draw2d.ServerFigure();}else{if(_1dc instanceof draw2d.StorageModel){_1dd=new draw2d.StorageFigure();}else{if(_1dc instanceof draw2d.SwitchModel){_1dd=new draw2d.SwitchFigure();}else{if(_1dc instanceof draw2d.MountModel){_1dd=new draw2d.MountFigure();}else{if(_1dc instanceof draw2d.NicConnectionModel){_1dd=new draw2d.NicConnectionFigure();}}}}}if(_1dd===null){throw "factory called with unknown model class:"+_1dc.type;}_1dd.setModel(_1dc);if(this.readonly){_1dd.setDeleteable(false);_1dd.setCanDrag(false);}return _1dd;};