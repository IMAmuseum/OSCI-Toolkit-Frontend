this["JST"] = this["JST"] || {};

this["JST"]["app/oscitk/themes/red/templates/_print.tpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<a href="#print" id="print">Print</a>\n';

}
return __p
};

this["JST"]["app/oscitk/themes/red/templates/_title.tpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<h1 id="publication-title"></h1>';

}
return __p
};

this["JST"]["app/oscitk/themes/red/templates/app.tpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="progress hidden hidden-print hidden-sm hidden-xs" data-spy="affix" data-offset-top="400">\n\t<div class="progress-bar progress-bar-primary" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100"></div>\n</div>\n\n<div class="container">\n\n</div>\n\n<!-- TOP -->\n<header>\n\t<div id="header" class-"hidden-print"></div>\n</header>\n\n<!-- BOTTOM -->\n<div id="navbar" class="hidden-print unselectable"></div>\n\n<!-- RIGHT -->\n<div id="toolbar" class="hidden-print"></div>\n\n<!-- CENTER -->\n<div id="loader">Loading...</div>\n<div class="container">\n\t<div id="section"></div>\n</div>\n\n<div id="navigation" class="hidden-print unselectable"></div>\n';

}
return __p
};

this["JST"]["app/oscitk/themes/red/templates/citation.tpl.html"] = function(obj) {
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

this["JST"]["app/oscitk/themes/red/templates/font-size.tpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<a href="#font-larger" class="larger font-button" data-href="font-larger" data-style="inline">A+</a>&nbsp;\n<a href="#font-smaller" class="smaller font-button" data-href="font-smaller" data-style="inline">A-</a>\n';

}
return __p
};

this["JST"]["app/oscitk/themes/red/templates/font.tpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<h3>Reading Settings</h3>\n<div class="font-control">\n\t<h3>Font Size</h3>\n\t<a href="#font-larger" class="larger font-button">A</a>\n\t<a href="#font-smaller" class="smaller font-button">A</a>\n</div>\n<div class="theme-control">\n\t<h3>Theme</h3>\n\t<a href="#normal" class="theme-button">Normal</a>\n\t<a href="#sepia" class="theme-button">Sepia</a>\n\t<a href="#night" class="theme-button">Night</a>\n</div>';

}
return __p
};

this["JST"]["app/oscitk/themes/red/templates/header.tpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="header-title">\n\t<div class="container-fluid">\n\t\t<div class="pull-left" id="publication-title-container">\n\t\t\t<h1 class="publication-title">' +
((__t = ( title )) == null ? '' : __t) +
'</h1>\n\t\t</div>\n\t\t<div class="pull-left hidden-xs hidden-sm">\n\t\t\t<p class="section-title">' +
((__t = ( sectionTitle )) == null ? '' : __t) +
': ' +
((__t = ( sectionSubtitle )) == null ? '' : __t) +
'</p>\n\t\t</div>\n\t\t<div class="pull-right">\n\t\t\t<p class="btn-menu"><a href ="javascript:;" id="header-menu-button">Menu</a></p>\n\t\t</div>\n\t\t<div class="pull-right hidden-xs hidden-sm">\n\t\t\t<p><a href ="javascript:;" id="header-login-button">Login</a></p>\n\t\t</div>\n\t</div>\n</div>';

}
return __p
};

this["JST"]["app/oscitk/themes/red/templates/multi-column-column.tpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="column"></div>';

}
return __p
};

this["JST"]["app/oscitk/themes/red/templates/multi-column-figure.tpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="figure_content"></div>\n<figcaption>' +
((__t = ( caption )) == null ? '' : __t) +
'</figcaption>';

}
return __p
};

this["JST"]["app/oscitk/themes/red/templates/multi-column-section.tpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div id="pages"></div>';

}
return __p
};

this["JST"]["app/oscitk/themes/red/templates/navbar.tpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<!--\n\npage / total\nprogress slider\nfont size selector\n1 or 2 col selector\n\n-->\n\n<nav class="navbar navbar-default">\n\t<div class="container-fluid">\n\n        <!-- Page number readout -->\n        <div class="pull-left" id="osci-navbar-text">10/250</div>\n\n        <!-- Page progress slider -->\n        <input class="pull-left" id="osci-page-slider" type="range" min="0" max="250" />\n\n        <!-- Two-page spread vs. single column -->\n        <div class="pull-right hidden-xs" id="osci-spread-selector">\n          <img src="images/one_column_icon.png" />\n          <img src="images/two_column_icon.png" /> \n        </div>\n\n        <!-- Font size area selector -->\n        <ul class="pull-right" id="font-size-area"></ul>\n\n\t</div>\n</nav>';

}
return __p
};

this["JST"]["app/oscitk/themes/red/templates/navigation.tpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class=\'prev-page side\'><div class=\'indicator\'>&lt;</div></div>\n<div class=\'next-page side\'><div class=\'indicator\'>&gt;</div></div>';

}
return __p
};

this["JST"]["app/oscitk/themes/red/templates/note-form.tpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<textarea class="note-form-wrapper" data-paragraph_number="' +
((__t = ( paragraph_number )) == null ? '' : __t) +
'" data-id="' +
((__t = ( cid )) == null ? '' : __t) +
'">' +
((__t = ( note )) == null ? '' : __t) +
'</textarea>\n<button id=\'note-submit\' type=\'button\' class=\'btn btn-primary btn-block\'>Add Note</button>';

}
return __p
};

this["JST"]["app/oscitk/themes/red/templates/page.tpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p +=
((__t = ( content.content )) == null ? '' : __t);

}
return __p
};

this["JST"]["app/oscitk/themes/red/templates/paragraph-popover.tpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="popover-wrapper">\n\t<ul class="nav nav-tabs" role="tablist">\n\t<li role="presentation" class="active">\n\t\t<a href="#notes" aria-controls="notes" role="tab" data-toggle="tab">Notes</a>\n\t</li>\n\t<li role="presentation">\n\t\t<a href="#cite" aria-controls="cite" role="tab" data-toggle="tab">Cite</a>\n\t</li>\n\t</ul>\n\n\t<div class="tab-content">\n    \t<div role="tabpanel" class="tab-pane active" id="notes">\n    \t\t' +
((__t = ( noteForm )) == null ? '' : __t) +
'\n    \t</div>\n    \t<div role="tabpanel" class="tab-pane" id="cite">\n    \t\t' +
((__t = ( citation )) == null ? '' : __t) +
'\n    \t</div>\n    </div>\n</div>\n';

}
return __p
};

this["JST"]["app/oscitk/themes/red/templates/section.tpl.html"] = function(obj) {
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

this["JST"]["app/oscitk/themes/red/templates/toolbar-account-login.tpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<h3>Login</h3>\n\n<div class="form-error"></div>\n<form id="account-form">\n\t<div class="form-group">\n\t\t<label for="username">Username:</label>\n\t\t<input class="form-control" type="text" id="username" placeholder="Username" />\n\t</div>\n\t<div class="form-group">\n\t\t<label for="password">Password:</label>\n\t\t<input class="form-control" type="password" id="password" placeholder="Password" />\n\t</div>\n\t<button type="button" class="btn login">Log In</button>\n\t<div class="account-footer"><a href="javascript:;" class="register">Register an account</a></div>\n</form>';

}
return __p
};

this["JST"]["app/oscitk/themes/red/templates/toolbar-account-profile.tpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<h3>Profile</h3>\n\n\n<h4>' +
((__t = ( username )) == null ? '' : __t) +
'</h4>\n<h5>' +
((__t = ( email )) == null ? '' : __t) +
'</h5>\n<div class="account-footer"><a href="javascript:;" class="logout">Log out</a></div>\n\t\t\t\t';

}
return __p
};

this["JST"]["app/oscitk/themes/red/templates/toolbar-account-register.tpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<h3>Register</h3>\n\n<div class="form-error"></div>\n<form id="account-form">\n\t<div class="form-group">\n\t\t<label for="username">Username:</label>\n\t\t<input class="form-control" type="text" id="username" placeholder="Username" />\n\t</div>\n\t<div class="form-group">\n\t\t<label for="password">Password:</label>\n\t\t<input class="form-control" type="password" id="password" placeholder="Password" />\n\t</div>\n\t<div class="form-group">\n\t\t<label for="email">Email:</label>\n\t\t<input class="form-control" type="text" id="email" placeholder="Email" />\n\t</div>\n\t<button type="button" class="btn register">Register</button>\n\t<div class="account-footer"><a href="javascript:;" class="login">Already have an account?</a></div>\n</form>';

}
return __p
};

this["JST"]["app/oscitk/themes/red/templates/toolbar-citations.tpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<h3>Citations</h3>\n';

}
return __p
};

this["JST"]["app/oscitk/themes/red/templates/toolbar-figures.tpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<h3>Figures</h3>\n\n<div class="figure-reel">\n\t';
 _.each(figures, function(figure) { ;
__p += '\n\t\t<figure data-figure-id="' +
((__t = ( figure.id )) == null ? '' : __t) +
'">\n\t\t\t';
 if (figure.thumbnail_url != undefined) { ;
__p += '\n\t\t\t\t<img class=\'figure-thumbnail\' src=\'' +
((__t = ( figure.thumbnail_url )) == null ? '' : __t) +
'\'/>\n\t\t\t';
 } else { ;
__p += '\n\t\t\t\t<div class=\'figure-thumbnail\'>&nbsp;</div>\n\t\t\t';
 } ;
__p += '\n\t\t\t<figcaption>' +
((__t = ( figure.caption )) == null ? '' : __t) +
'</figcaption>\n\t\t</figure>\n\t';
 }); ;
__p += '\n</div>';

}
return __p
};

this["JST"]["app/oscitk/themes/red/templates/toolbar-footnotes.tpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<h3>Footnotes</h3>\n\n';
 if( items.length < 1 ) { ;
__p += '\n\t<p>No footnotes in this section.</p>\n';
 } ;
__p += '\n\n<ul>\n\t';
 _.each(items, function(item) { ;
__p += '\n\t\t<li>\n\t\t\t<b>' +
((__t = ( item.id )) == null ? '' : __t) +
'</b><br/>' +
((__t = ( item.title )) == null ? '' : __t) +
'\n\t\t</li>\n\t';
 }); ;
__p += '\n</ul>';

}
return __p
};

this["JST"]["app/oscitk/themes/red/templates/toolbar-glossary-term-mobile.tpl.html"] = function(obj) {
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

this["JST"]["app/oscitk/themes/red/templates/toolbar-glossary-term.tpl.html"] = function(obj) {
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

this["JST"]["app/oscitk/themes/red/templates/toolbar-glossary.tpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<h3>Glossary</h3>\n<div id="glossary-container">\n\t<div id="glossary-sidebar">\n\t\t<div id="glossary-filter-box">\n\t\t\t<input type="text" id="glossary-filter" placeholder="Search Glossary" />\n\t\t\t<div id="glossary-filter-search-icon"></div>\n\t\t\t<div id="glossary-filter-clear"></div>\n\t\t</div>\n\t\t';
 if (!hasResults) { ;
__p += '\n\t\t\tNo terms found.\n\t\t';
 } else { ;
__p += '\n\t\t<ul id="glossary-term-listing"></ul>\n\t\t<ul id="glossary-term-listing-mobile"></ul>\n\t\t';
 } ;
__p += '\n\t</div>\n\t<div id="glossary-content">\n\t\t<h4></h4>\n\t\t<p></p>\n\t</div>\n</div>';

}
return __p
};

this["JST"]["app/oscitk/themes/red/templates/toolbar-item.tpl.html"] = function(obj) {
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

this["JST"]["app/oscitk/themes/red/templates/toolbar-notes.tpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<h3>Notes</h3>\n<div class="notesReel">\n\t<ul class="notesList">\n\t\t';
 _.each(notes, function(note) { ;
__p += '\n\t\t\t<li class="notesListItem">\n\t\t\t\t<div class="the-note">\n\t\t\t\t\t<span class="note-content">' +
((__t = ( note.get('note') )) == null ? '' : __t) +
'</span>\n\t\t\t\t</div>\n\t\t\t\t';
 if (note.get('tags').length > 0) { ;
__p += '\n\t\t\t\t\t<div class="note-tags">\n\t                \t<span class="tags-label">tags:</span> ';
 _.each(note.get('tags'), function(tag) { ;
__p +=
((__t = ( tag )) == null ? '' : __t) +
' ';
 }); ;
__p += '\n\t                </div>\n\t\t\t\t';
 } ;
__p += '\n\t\t\t\t<div class="note-buttons">\n\t\t\t\t\t<a href="#" class="noteLink" data-content_id="' +
((__t = ( note.get('content_id') )) == null ? '' : __t) +
'">Link</a>\n\t\t\t\t\t<!-- <a href="#" class="noteEdit" data-content_id="' +
((__t = ( note.get('content_id') )) == null ? '' : __t) +
'">Edit</a> -->\n\t\t\t\t</div>\n\t\t\t</li>\n\t\t';
 }); ;
__p += '\n\t</ul>\n</div>';

}
return __p
};

this["JST"]["app/oscitk/themes/red/templates/toolbar-search.tpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<h3>Search</h3>\n';

}
return __p
};

this["JST"]["app/oscitk/themes/red/templates/toolbar-toc.tpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<h3>Table of Contents</h3>\n\n<ul class="toc">\n\t';
 _.each(items, function(item) { ;
__p += '\n\t\t<li class="toc-item';
 if (item.id === app.views.navigationView.currentNavigationItem.id) { print(" active"); } ;
__p += '">\n\t\t\t<a data-section-id="' +
((__t = ( item.id )) == null ? '' : __t) +
'" href="javascript:;">\n\n\t\t\t\t<!--\n\t\t\t\t<div class="toc-item-thumbnail">\n\t\t\t\t\t';
 if (item.get('thumbnail')) { ;
__p += '\n\t\t\t\t\t\t<img src="' +
((__t = ( item.get('thumbnail') )) == null ? '' : __t) +
'">\n\t\t\t\t\t';
 } ;
__p += '\n\t\t\t\t</div>\n\t\t\t\t-->\n\n\t\t\t\t<div class="toc-item-text">\n\t\t\t\t\t<h4>' +
((__t = ( item.get('title') )) == null ? '' : __t) +
'</h4>\n\t\t\t\t\t';
 if (item.get('subtitle')) { ;
__p += '\n\t\t\t\t\t\t<h5>' +
((__t = ( item.get('subtitle') )) == null ? '' : __t) +
'</h5>\n\t\t\t\t\t';
 } ;
__p += '\n\t\t\t\t</div>\n\t\t\t\t\n\t\t\t</a>\n\t\t</li>\n\t';
 }); ;
__p += '\n</ul>';

}
return __p
};

this["JST"]["app/oscitk/themes/red/templates/toolbar.tpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<nav class="nav nav-stacked">\n\t<ul id="toolbar-area" class="">\n\t\t<li class="close-toolbar-item"></li>\n\t</ul>\n\n\t<div id="toolbar-filler">\n\n\n\t\t<p>&nbsp;</p>\n\n\t\t<p>Contents</p>\n\t\t<!--<p>Search</p>-->\n\t\t<p>Glossary</p>\n\t\t<p>Footnotes</p>\n\t\t<p>Figures</p>\n\t\t<p>Notes</p>\n\t\t<!--<p>Citations</p>-->\n\t\t<p>User Profile</p>\n\n\t</div>\n\t<div id="toolbar-readout">\n\t\t<div id="toolbar-toc"></div>\n\t\t<!--<div id="toolbar-search"></div>-->\n\t\t<div id="toolbar-glossary"></div>\n\t\t<div id="toolbar-footnotes"></div>\n\t\t<div id="toolbar-figures"></div>\n\t\t<div id="toolbar-notes"></div>\n\t\t<!--<div id="toolbar-citations"></div>-->\n\t\t<div id="toolbar-account"></div>\n\t</div>\n</nav>\n';

}
return __p
};