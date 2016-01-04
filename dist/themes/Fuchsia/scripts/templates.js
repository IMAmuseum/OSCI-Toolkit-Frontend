this["JST"] = this["JST"] || {};

this["JST"]["app/oscitk/themes/Fuchsia/templates/app.tpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<!-- TOP -->\n<header class="hidden-print">\n\t<div id="header"></div>\n</header>\n\n<!-- BOTTOM -->\n<div id="navbar" class="hidden-print unselectable"></div>\n\n<!-- RIGHT -->\n<div id="toolbar" class="hidden-print"></div>\n\n<!-- CENTER -->\n<!--\n<div id="loader" class="loader hidden-print">Loading...</div>\n-->\n\n<div id="section"></div>\n\n<!-- RIGHT -->\n<div id="navigation" class="hidden-print unselectable"></div>\n';

}
return __p
};

this["JST"]["app/oscitk/themes/Fuchsia/templates/navigation.tpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="progress">\n\t<div class="progress-bar progress-bar-primary" style="width: 50%"></div>\n</div>\n\n<div class="chapter-info">\n\t<div class="chapter-number">Chapter I</div>\n\t<div class="chapter-title">Down the Rabbit-Hole</div>\n</div>\n\n<div class="btn-page prev-page"><div class="indicator">&lt;</div></div>\n<div class="btn-page next-page"><div class="indicator">&gt;</div></div>';

}
return __p
};

this["JST"]["app/oscitk/themes/Fuchsia/templates/section.tpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="section-page">\n\t<div class="section-page">\n\t\t<div class="section-content">\n\t\t\n\t\t\t<div class="clearfix"></div>\n\n\t\t\t<h2>' +
((__t = ( sectionTitle )) == null ? '' : __t) +
'</h2>\n\t\t\t';
 if (typeof(sectionSubtitle) !== null) { ;
__p += '\n\t\t\t<h3>' +
((__t = ( sectionSubtitle )) == null ? '' : __t) +
'</h3>\n\t\t\t';
 } ;
__p += '\n\t\t\t<hr>\n\t\t\t' +
((__t = ( content )) == null ? '' : __t) +
'\n\n\t\t\t<div class="clearfix"></div>\n\n\t\t</div>\n\t</div>\n</div>';

}
return __p
};