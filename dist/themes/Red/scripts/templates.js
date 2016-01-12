this["JST"] = this["JST"] || {};

this["JST"]["app/oscitk/themes/Red/templates/_print.tpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<a href="#print" id="print">Print</a>\n';

}
return __p
};

this["JST"]["app/oscitk/themes/Red/templates/_title.tpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<h1 id="publication-title"></h1>';

}
return __p
};

this["JST"]["app/oscitk/themes/Red/templates/app.tpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<!-- TOP -->\n<header class="hidden-print">\n\t<div id="header"></div>\n</header>\n\n<!-- BOTTOM -->\n<div id="navbar" class="hidden-print unselectable"></div>\n\n<!-- RIGHT -->\n<div id="toolbar" class="hidden-print"></div>\n\n<!-- CENTER -->\n<div id="loader" class="loader hidden-print">Loading...</div>\n\n<div id="section-container" class="container">\n\t<div id="section"></div>\n</div>\n\n<div id="navigation" class="hidden-print unselectable"></div>\n';

}
return __p
};

this["JST"]["app/oscitk/themes/Red/templates/citation.tpl.html"] = function(obj) {
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

this["JST"]["app/oscitk/themes/Red/templates/font-size.tpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<a href="#font-larger" class="larger font-button" data-href="font-larger" data-style="inline">A+</a>&nbsp;\n<a href="#font-smaller" class="smaller font-button" data-href="font-smaller" data-style="inline">A-</a>';

}
return __p
};

this["JST"]["app/oscitk/themes/Red/templates/font.tpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<h3>Reading Settings</h3>\n<div class="font-control">\n\t<h3>Font Size</h3>\n\t<a href="#font-larger" class="larger font-button">A</a>\n\t<a href="#font-smaller" class="smaller font-button">A</a>\n</div>\n<div class="theme-control">\n\t<h3>Theme</h3>\n\t<a href="#normal" class="theme-button">Normal</a>\n\t<a href="#sepia" class="theme-button">Sepia</a>\n\t<a href="#night" class="theme-button">Night</a>\n</div>';

}
return __p
};

this["JST"]["app/oscitk/themes/Red/templates/header.tpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="header-title">\n\t<div class="container-fluid">\n\t\t<div class="pull-left" id="publication-title-container">\n\t\t\t<h1 class="publication-title">' +
((__t = ( pubTitle )) == null ? '' : __t) +
'</h1>\n\t\t</div>\n\t\t<div class="pull-left hidden-xs hidden-sm">\n\t\t\t<p class="section-title">' +
((__t = ( sectionTitle )) == null ? '' : __t) +
': ' +
((__t = ( sectionSubtitle )) == null ? '' : __t) +
'</p>\n\t\t</div>\n\t\t<div class="pull-right">\n\t\t\t<p class="btn-menu"><a href ="javascript:;" id="header-menu-button">Menu</a></p>\n\t\t</div>\n\t\t<div class="pull-right hidden-xs hidden-sm">\n\t\t\t<p>\n\t\t\t\t<a href ="javascript:;" id="header-login-button">\n\t\t\t\t\t';
 if( username !== null ) { ;
__p += '\t' +
((__t = ( username )) == null ? '' : __t) +
' ';
 } else { ;
__p += ' Login ';
 } ;
__p += '\n\t\t\t\t</a></p>\n\t\t</div>\n\t</div>\n</div>';

}
return __p
};

this["JST"]["app/oscitk/themes/Red/templates/navbar.tpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<nav class="navbar navbar-default">\n\t<div class="container-fluid">\n\n        <!-- Page number readout -->\n        <div class="pull-left" id="osci-navbar-text">' +
((__t = ( curPage )) == null ? '' : __t) +
'/' +
((__t = ( numPages )) == null ? '' : __t) +
'</div>\n\n        <!-- Page progress slider -->\n        <input class="pull-left" id="osci-page-slider" type="range" min="1" max="' +
((__t = ( numPages )) == null ? '' : __t) +
'" value="' +
((__t = ( curPage )) == null ? '' : __t) +
'" />\n\n        <!-- Two-page spread vs. single column -->\n        <div class="pull-right hidden-xs" id="osci-spread-selector">\n          <a href="javascript:;" id="osci-spread-single"><img src="images/one_column_icon.png" /></a>\n          <a href="javascript:;" id="osci-spread-double"><img src="images/two_column_icon.png" /></a>\n        </div>\n\n        <!-- Font size area selector -->\n        <ul class="pull-right" id="font-size-area"></ul>\n\n\t</div>\n</nav>';

}
return __p
};

this["JST"]["app/oscitk/themes/Red/templates/navigation.tpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class=\'prev-page side\'><div class=\'indicator\'>&lt;</div></div>\n<div class=\'next-page side\'><div class=\'indicator\'>&gt;</div></div>';

}
return __p
};

this["JST"]["app/oscitk/themes/Red/templates/note-form.tpl.html"] = function(obj) {
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

this["JST"]["app/oscitk/themes/Red/templates/paragraph-popover.tpl.html"] = function(obj) {
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

this["JST"]["app/oscitk/themes/Red/templates/section.tpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<h2>' +
((__t = ( sectionTitle )) == null ? '' : __t) +
'</h2>\n';
 if (typeof(sectionSubtitle) !== null) { ;
__p += '\n<h3>' +
((__t = ( sectionSubtitle )) == null ? '' : __t) +
'</h3>\n';
 } ;
__p += '\n<hr>\n' +
((__t = ( content )) == null ? '' : __t) +
'\n';

}
return __p
};

this["JST"]["app/oscitk/themes/Red/templates/toolbar-account-login.tpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<h3>Login</h3>\n\n<div class="toolbar-scroll">\n\t<div class="form-error"></div>\n\t<form id="account-form">\n\t\t<div class="form-group">\n\t\t\t<label for="username">Username:</label>\n\t\t\t<input class="form-control" type="text" id="username" placeholder="Username" />\n\t\t</div>\n\t\t<div class="form-group">\n\t\t\t<label for="password">Password:</label>\n\t\t\t<input class="form-control" type="password" id="password" placeholder="Password" />\n\t\t</div>\n\t\t<button type="button" class="btn login">Log In</button>\n\t\t<div class="account-footer"><a href="javascript:;" class="register">Register an account</a></div>\n\t</form>\n</div>';

}
return __p
};

this["JST"]["app/oscitk/themes/Red/templates/toolbar-account-profile.tpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<h3>Profile</h3>\n\n<div class="toolbar-scroll">\n\t<h4>' +
((__t = ( username )) == null ? '' : __t) +
'</h4>\n\t<h5>' +
((__t = ( email )) == null ? '' : __t) +
'</h5>\n\t<div class="account-footer"><a href="javascript:;" class="logout">Log out</a></div>\n</div>';

}
return __p
};

this["JST"]["app/oscitk/themes/Red/templates/toolbar-account-register.tpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<h3>Register</h3>\n\n<div class="toolbar-scroll">\n\t<div class="form-error"></div>\n\t<form id="account-form">\n\t\t<div class="form-group">\n\t\t\t<label for="username">Username:</label>\n\t\t\t<input class="form-control" type="text" id="username" placeholder="Username" />\n\t\t</div>\n\t\t<div class="form-group">\n\t\t\t<label for="password">Password:</label>\n\t\t\t<input class="form-control" type="password" id="password" placeholder="Password" />\n\t\t</div>\n\t\t<div class="form-group">\n\t\t\t<label for="email">Email:</label>\n\t\t\t<input class="form-control" type="text" id="email" placeholder="Email" />\n\t\t</div>\n\t\t<button type="button" class="btn register">Register</button>\n\t\t<div class="account-footer"><a href="javascript:;" class="login">Already have an account?</a></div>\n\t</form>\n</div>';

}
return __p
};

this["JST"]["app/oscitk/themes/Red/templates/toolbar-citations.tpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<h3>Citations</h3>\n\n<div class="toolbar-scroll">\n\t<!-- I think we won\'t be using this one... -->\n</div>';

}
return __p
};

this["JST"]["app/oscitk/themes/Red/templates/toolbar-figures.tpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<h3>Figures</h3>\n\n<div class="toolbar-scroll">\n\t';
 _.each(figures, function(figure) { ;
__p += '\n\t\t<figure>\n\t\t\t<div class="clearfix">\n\t\t\t\t';
 if (figure.thumbnail_url != undefined) { ;
__p += '\n\t\t\t\t\t<img class=\'figure-thumbnail\' src=\'' +
((__t = ( figure.thumbnail_url )) == null ? '' : __t) +
'\'/>\n\t\t\t\t';
 } else { ;
__p += '\n\t\t\t\t\t<div class=\'figure-thumbnail\'>&nbsp;</div>\n\t\t\t\t';
 } ;
__p += '\n\t\t\t</div>\n\t\t\t<figcaption>\n\t\t\t\t<a data-figure-id="' +
((__t = ( figure.id )) == null ? '' : __t) +
'" class="toolbar-link pull-right">\n\t\t\t\t\t<img src="images/light/link_icon.png"/>\n\t\t\t\t</a>\n\t\t\t\t' +
((__t = ( figure.caption )) == null ? '' : __t) +
'\n\t\t\t</figcaption>\n\t\t</figure>\n\t';
 }); ;
__p += '\n</div>';

}
return __p
};

this["JST"]["app/oscitk/themes/Red/templates/toolbar-footnotes.tpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<h3>Footnotes</h3>\n\n<div class="toolbar-scroll">\n\t';
 if( items.length < 1 ) { ;
__p += '\n\t\t<p>No footnotes in this section.</p>\n\t';
 } ;
__p += '\n\n\t<ul>\n\t\t';
 _.each(items, function(item) { ;
__p += '\n\t\t\t<li class="toolbar-footnote-single">\n\t\t\t\t<b>' +
((__t = ( item.id )) == null ? '' : __t) +
'</b>\n\t\t\t\t<a class="toolbar-link pull-right" data-id="' +
((__t = ( item.id )) == null ? '' : __t) +
'">\n\t\t\t\t\t<img src="images/light/link_icon.png"/>\n\t\t\t\t</a>\n\t\t\t\t<br/>' +
((__t = ( item.title )) == null ? '' : __t) +
'</li>\n\t\t';
 }); ;
__p += '\n\t</ul>\n</div>';

}
return __p
};

this["JST"]["app/oscitk/themes/Red/templates/toolbar-glossary-term-mobile.tpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<li data-tid="' +
((__t = ( item.get('id') )) == null ? '' : __t) +
'">\n\t' +
((__t = ( item.get('term') )) == null ? '' : __t) +
'\n\t<ul>\n\t\t<li class="term-description">' +
((__t = ( item.get('definition') )) == null ? '' : __t) +
'</li>\n\t</ul>\n</li>';

}
return __p
};

this["JST"]["app/oscitk/themes/Red/templates/toolbar-glossary-term.tpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<li data-tid="' +
((__t = ( item.get('id') )) == null ? '' : __t) +
'">' +
((__t = ( item.get('term') )) == null ? '' : __t) +
'</li>';

}
return __p
};

this["JST"]["app/oscitk/themes/Red/templates/toolbar-glossary.tpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<h3>Glossary</h3>\n\n<div class="toolbar-scroll">\n\n\t<div id="glossary-sidebar">\n\n\t\t<div id="glossary-filter-box">\n\t\t\t<input type="text" id="glossary-filter" placeholder="Search Glossary" />\n\t\t\t<div id="glossary-filter-search-icon"></div>\n\t\t\t<div id="glossary-filter-clear"></div>\n\t\t</div>\n\n\t\t';
 if (!hasResults) { ;
__p += '\n\t\t\tNo terms found.\n\t\t';
 } else { ;
__p += '\n\t\t<ul id="glossary-term-listing"></ul>\n\t\t<ul id="glossary-term-listing-mobile"></ul>\n\t\t';
 } ;
__p += '\n\t\t\n\t</div>\n\n\t<div id="glossary-content">\n\t\t<h4></h4>\n\t\t<p></p>\n\t</div>\n\n</div>';

}
return __p
};

this["JST"]["app/oscitk/themes/Red/templates/toolbar-item.tpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {

 if (style == 'default') { ;
__p += '\n\t<a href="javascript:;">' +
((__t = ( text )) == null ? '' : __t) +
'</a>\n';
 } else { ;
__p += '\n\t<span id="' +
((__t = ( text )) == null ? '' : __t) +
'"></span>\n';
 } ;
__p += '\n';

}
return __p
};

this["JST"]["app/oscitk/themes/Red/templates/toolbar-notes.tpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<h3>Notes</h3>\n\n<div class="toolbar-scroll">\n\t<div class="notesReel">\n\t\t';
 if (notes.length > 0) { ;
__p += '\n\t\t<ul class="notesList">\n\t\t\t';
 _.each(notes, function(note) { ;
__p += '\n\t\t\t\t<li class="notesListItem">\n\t\t\t\t\t<div class="note-buttons">\n\t\t\t\t\t\t<a class="note-link toolbar-link pull-left" data-content_id="' +
((__t = ( note.get('content_id') )) == null ? '' : __t) +
'">\n\t\t\t\t\t\t\t<img src="images/light/link_icon.png"/>\n\t\t\t\t\t\t</a>\n\t\t\t\t\t\t<!-- <a href="#" class="noteEdit" data-content_id="' +
((__t = ( note.get('content_id') )) == null ? '' : __t) +
'">Edit</a> -->\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="the-note">\n\t\t\t\t\t\t<span class="note-content">' +
((__t = ( note.get('note') )) == null ? '' : __t) +
'</span>\n\t\t\t\t\t</div>\n\t\t\t\t\t<!--\n\t\t\t\t\t';
 if (note.get('tags').length > 0) { ;
__p += '\n\t\t\t\t\t\t<div class="note-tags">\n\t\t                \t<span class="tags-label">tags:</span> ';
 _.each(note.get('tags'), function(tag) { ;
__p +=
((__t = ( tag )) == null ? '' : __t) +
' ';
 }); ;
__p += '\n\t\t                </div>\n\t\t\t\t\t';
 } ;
__p += '\n\t\t\t\t\t-->\n\t\t\t\t</li>\n\t\t\t';
 }); ;
__p += '\n\t\t</ul>\n\t\t';
 } else { ;
__p += '\n\t\t\t';
 if (app.account.get('id') > 0 ) { ;
__p += '\n\t\t\t\t<p>No notes found for this section.</p>\n\t\t\t';
 } else { ;
__p += '\n\t\t\t\t<p>Login to see your notes for this section.</p>\n\t\t\t';
 } ;
__p += '\n\t\t';
 } ;
__p += '\n\t</div>\n</div>';

}
return __p
};

this["JST"]["app/oscitk/themes/Red/templates/toolbar-search.tpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<h3>Search</h3>\n\n<div class="toolbar-scroll">\n\t<!-- TODO: Implement me! -->\n</div>';

}
return __p
};

this["JST"]["app/oscitk/themes/Red/templates/toolbar-toc.tpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<h3>Table of Contents</h3>\n\n<div class="toolbar-scroll">\n\t<ul class="toc">\n\t\t';
 _.each(items, function(item) { ;
__p += '\n\t\t\t<li class="toc-item';
 if (item.id === app.views.navigationView.currentNavigationItem.id) { print(" active"); } ;
__p += '">\n\t\t\t\t<a data-section-id="' +
((__t = ( item.id )) == null ? '' : __t) +
'" href="javascript:;">\n\n\t\t\t\t\t<!--\n\t\t\t\t\t<div class="toc-item-thumbnail">\n\t\t\t\t\t\t';
 if (item.get('thumbnail')) { ;
__p += '\n\t\t\t\t\t\t\t<img src="' +
((__t = ( item.get('thumbnail') )) == null ? '' : __t) +
'">\n\t\t\t\t\t\t';
 } ;
__p += '\n\t\t\t\t\t</div>\n\t\t\t\t\t-->\n\n\t\t\t\t\t<div class="toc-item-text">\n\t\t\t\t\t\t<h4>' +
((__t = ( item.get('title') )) == null ? '' : __t) +
'</h4>\n\t\t\t\t\t\t';
 if (item.get('subtitle')) { ;
__p += '\n\t\t\t\t\t\t\t<h5>' +
((__t = ( item.get('subtitle') )) == null ? '' : __t) +
'</h5>\n\t\t\t\t\t\t';
 } ;
__p += '\n\t\t\t\t\t</div>\n\t\t\t\t\t\n\t\t\t\t</a>\n\t\t\t</li>\n\t\t';
 }); ;
__p += '\n\t</ul>\n</div>';

}
return __p
};

this["JST"]["app/oscitk/themes/Red/templates/toolbar.tpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<nav class="nav nav-stacked">\n\t<ul id="toolbar-area" class="">\n\t\t<li class="close-toolbar-item"></li>\n\t</ul>\n\n\t<div id="toolbar-filler">\n\n\n\t\t<p>&nbsp;</p>\n\n\t\t<p>Contents</p>\n\t\t<!--<p>Search</p>-->\n\t\t<p>Glossary</p>\n\t\t<p>Footnotes</p>\n\t\t<p>Figures</p>\n\t\t<p>Notes</p>\n\t\t<!--<p>Citations</p>-->\n\t\t<p>User Profile</p>\n\n\t</div>\n\t<div id="toolbar-readout">\n\t\t<div id="toolbar-toc"></div>\n\t\t<!--<div id="toolbar-search"></div>-->\n\t\t<div id="toolbar-glossary"></div>\n\t\t<div id="toolbar-footnotes"></div>\n\t\t<div id="toolbar-figures"></div>\n\t\t<div id="toolbar-notes"></div>\n\t\t<!--<div id="toolbar-citations"></div>-->\n\t\t<div id="toolbar-account"></div>\n\t</div>\n</nav>\n';

}
return __p
};