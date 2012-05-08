var Scriptaculous={Version:"1.7.0",require:function(_3660){
document.write("<script type=\"text/javascript\" src=\""+_3660+"\"></script>");
},load:function(){
if((typeof Prototype=="undefined")||(typeof Element=="undefined")||(typeof Element.Methods=="undefined")||parseFloat(Prototype.Version.split(".")[0]+"."+Prototype.Version.split(".")[1])<1.5){
throw ("script.aculo.us requires the Prototype JavaScript framework >= 1.5.0");
}
$A(document.getElementsByTagName("script")).findAll(function(s){
return (s.src&&s.src.match(/scriptaculous\.js(\?.*)?$/));
}).each(function(s){
var path=s.src.replace(/scriptaculous\.js(\?.*)?$/,"");
var _3664=s.src.match(/\?.*load=([a-z,]*)/);
(_3664?_3664[1]:"builder,effects,dragdrop,controls,slider").split(",").each(function(_3665){
Scriptaculous.require(path+_3665+".js");
});
});
}};
Scriptaculous.load();
