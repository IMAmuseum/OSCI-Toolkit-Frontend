this["JST"] = this["JST"] || {};

this["JST"]["app/oscitk/themes/Fuchsia/templates/app.tpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<!-- TOP -->\n<header class="hidden-print">\n\t<div id="header"></div>\n</header>\n\n<!-- BOTTOM -->\n<div id="navbar" class="hidden-print unselectable"></div>\n\n<!-- RIGHT -->\n<div id="toolbar" class="hidden-print"></div>\n\n<!-- CENTER -->\n<!--\n<div id="loader" class="loader hidden-print">Loading...</div>\n-->\n\n<div id="section"></div>\n\n<!-- RIGHT -->\n<div id="navigation" class="hidden-print unselectable"></div>\n';

}
return __p
};

this["JST"]["app/oscitk/themes/Fuchsia/templates/citation.tpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="citation-wrapper">\n\t<div class="citations">\n\t\t<div id="citation-format-chicago" class="citation">\n\t\t\t<h4>Chicago</h4>\n\t\t\t<p>';
 if (creator.length > 0) { ;
__p += ' ' +
((__t = ( creator + ", " )) == null ? '' : __t) +
' ';
 } ;
__p += '&ldquo;<em>' +
((__t = ( title )) == null ? '' : __t) +
'</em>,&rdquo; in <em>' +
((__t = ( publicationTitle )) == null ? '' : __t) +
'</em>, ed. ' +
((__t = ( editor )) == null ? '' : __t) +
' ' +
((__t = ( publisher )) == null ? '' : __t) +
' ' +
((__t = ( formattedDate )) == null ? '' : __t) +
', para ' +
((__t = ( paragraphNumber )) == null ? '' : __t) +
'.</p>\n\t\t</div>\n\t\t<div id="citation-format-mla" class="citation">\n\t\t\t<h4>MLA</h4>\n\t\t\t<p>';
 if (creator.length > 0) { ;
__p += ' ' +
((__t = ( creator + ", " )) == null ? '' : __t) +
' ';
 } ;
__p += '&ldquo;<em>' +
((__t = ( title )) == null ? '' : __t) +
'</em>,&rdquo; in <span style="text-decoration:underline;">' +
((__t = ( publicationTitle )) == null ? '' : __t) +
'</span>, ed. ' +
((__t = ( editor )) == null ? '' : __t) +
' (' +
((__t = ( publisher )) == null ? '' : __t) +
'), ' +
((__t = ( formattedDate )) == null ? '' : __t) +
', ' +
((__t = ( paragraphNumber )) == null ? '' : __t) +
'.</p>\n\t\t</div>\n\t\t<div id="citation-url" class="citation">\n\t\t\t<h4>Citation URL</h4>\n\t\t\t<p>' +
((__t = ( url )) == null ? '' : __t) +
'</p>\n\t\t</div>\n\t</div>\n</div>';

}
return __p
};

this["JST"]["app/oscitk/themes/Fuchsia/templates/navigation.tpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="progress">\n\t<div class="progress-bar progress-bar-fuchsia"></div>\n</div>\n\n<div class="chapter-info">\n\t<div class="chapter-number">Chapter I</div>\n\t<div class="chapter-title">Down the Rabbit-Hole</div>\n</div>\n<div class="pull-right">\n\t<div class="btn-page prev-page"></div>\n\t<div class="btn-page next-page"></div>\n</div>';

}
return __p
};

this["JST"]["app/oscitk/themes/Fuchsia/templates/note-form.tpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<textarea class="note-form-wrapper" data-paragraph_number="' +
((__t = ( paragraph_number )) == null ? '' : __t) +
'" data-id="' +
((__t = ( cid )) == null ? '' : __t) +
'">' +
((__t = ( note )) == null ? '' : __t) +
'</textarea>\n<button id=\'note-submit\' type=\'button\' class=\'btn btn-primary btn-block\'>Save Note</button>';

}
return __p
};

this["JST"]["app/oscitk/themes/Fuchsia/templates/paragraph-popover.tpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="popover-wrapper">\n\n';
 if( noteForm ) { ;
__p += '\n\n\t<ul class="nav nav-tabs" role="tablist">\n\t\t<li role="presentation" class="active">\n\t\t\t<a href="#notes" aria-controls="notes" role="tab" data-toggle="tab">Notes</a>\n\t\t</li>\n\t\t<li role="presentation">\n\t\t\t<a href="#cite" aria-controls="cite" role="tab" data-toggle="tab">Cite</a>\n\t\t</li>\n\t</ul>\n\n\t<div class="tab-content">\n    \t<div role="tabpanel" class="tab-pane active" id="notes">\n    \t\t' +
((__t = ( noteForm )) == null ? '' : __t) +
'\n    \t</div>\n    \t<div role="tabpanel" class="tab-pane" id="cite">\n\n';
 } ;
__p += '\n\t\t\t<div id="cite-target">\n\t    \t\t' +
((__t = ( citation )) == null ? '' : __t) +
'\n\t    \t</div>\n';
 if( noteForm ) { ;
__p += '\n\n    \t</div>\n    </div>\n';
 } ;
__p += '\n\n</div>\n\n\n';

}
return __p
};

this["JST"]["app/oscitk/themes/Fuchsia/templates/section.tpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<!-- .section-page is used to create the 3D effect -->\n<div class="section-page">\n\t<div class="section-page">\n\t\t<div class="section-content">\n\t\t\n\t\t\t<div class="clearfix"></div>\n\n\t\t\t<h2>' +
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