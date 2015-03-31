this["JST"] = this["JST"] || {};

this["JST"]["app/oscitk/themes/Simple/templates/account-login.tpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class=\'overlay\'>\n\t<div id="dismiss">\n\t\t<button class="btn btn-link">\n\t\t<span class="glyphicon glyphicon-remove"></span>\n\t\t</button>\n\t</div>\n\t<div class="container">\n\t\t<h3>Login</h3>\n\t\t<div class="form-error"></div>\n\t\t<form id="account-form">\n\t\t\t<label for="username">Username:</label>\n\t\t\t<input type="text" id="username" placeholder="Username" />\n\t\t\t<label for="password">Password:</label>\n\t\t\t<input type="password" id="password" placeholder="Password" />\n\t\t\t<button type="button" class="login">Log In</button>\n\t\t\t<div><a href="#" class="register">Register an account</a></div>\n\t\t</form>\n\t</div>\n</div>';

}
return __p
};

this["JST"]["app/oscitk/themes/Simple/templates/account-profile.tpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class=\'overlay\'>\n\t<div id="dismiss">\n\t\t<button class="btn btn-link">\n\t\t<span class="glyphicon glyphicon-remove"></span>\n\t\t</button>\n\t</div>\n\t<div class="container">\n\t\t<h3>Profile</h3>\n\t\t<h4>' +
((__t = ( username )) == null ? '' : __t) +
'</h4>\n\t\t<h5>' +
((__t = ( email )) == null ? '' : __t) +
'</h5>\n\t\t<div><a href="#" class="logout">Log out</a></div>\n\t</div>\n</div>';

}
return __p
};

this["JST"]["app/oscitk/themes/Simple/templates/account-register.tpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class=\'overlay\'>\n\t<div id="dismiss">\n\t\t<button class="btn btn-link">\n\t\t<span class="glyphicon glyphicon-remove"></span>\n\t\t</button>\n\t</div>\n\t<div class="container">\n\t\t<h2>Register</h2>\n\t\t<div class="form-error"></div>\n\t\t<form id="account-form">\n\t\t\t<label for="username">Username:</label>\n\t\t\t<input type="text" id="username" placeholder="Username" />\n\t\t\t<label for="password">Password:</label>\n\t\t\t<input type="password" id="password" placeholder="Password" />\n\t\t\t<label for="email">Email:</label>\n\t\t\t<input type="text" id="email" placeholder="Email" />\n\t\t\t<button type="button" class="register">Register</button>\n\t\t\t<div><a href="#" class="login">Already have an account?</a></div>\n\t\t</form>\n\t</div>\n</div>';

}
return __p
};

this["JST"]["app/oscitk/themes/Simple/templates/app.tpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<progress value="0" max="0"></progress>\n\n<div class="container">\n\t<div id="account"></div>\n\t<div id="toc"></div>\n\t<div id="figures"></div>\n</div>\n\n<header>\n\t<div id="header"></div>\n</header>\n\n<div id="toolbar" data-spy="affix" data-offset-top="400"></div>\n<div class="container">\n\t<div id="loader">Loading...</div>\n\t<div id="section"></div>\n</div>\n\n<div id="navigation"></div>\n\n';

}
return __p
};

this["JST"]["app/oscitk/themes/Simple/templates/citation.tpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="citation-wrapper">\n\t<h2>Citation</h2>\n\t<div class="citations">\n\t\t<span>Format</span>\n\t\t<ul class="formats">\n\t\t\t<li class="active"><a href="#citation-format-chicago">Chicago</a></li>\n\t\t\t<li><a href="#citation-format-mla">MLA</a></li>\n\t\t</ul>\n\t\t<div id="citation-format-chicago" class="citation">\n\t\t\t';
 if (creator.length > 0) { ;
__p += ' ' +
((__t = ( creator + ", " )) == null ? '' : __t) +
' ';
 } ;
__p += '"<em>' +
((__t = ( title )) == null ? '' : __t) +
'</em>," in <em>' +
((__t = ( publicationTitle )) == null ? '' : __t) +
'</em>, ed. ' +
((__t = ( editor )) == null ? '' : __t) +
' ' +
((__t = ( publisher )) == null ? '' : __t) +
' ' +
((__t = ( formattedDate )) == null ? '' : __t) +
', para ' +
((__t = ( paragraphNumber )) == null ? '' : __t) +
'.\n\t\t</div>\n\t\t<div id="citation-format-mla" style="display: none;" class="citation">\n\t\t\t';
 if (creator.length > 0) { ;
__p += ' ' +
((__t = ( creator + ", " )) == null ? '' : __t) +
' ';
 } ;
__p += '"<em>' +
((__t = ( title )) == null ? '' : __t) +
'</em>," in <span style="text-decoration:underline;">' +
((__t = ( publicationTitle )) == null ? '' : __t) +
'</span>, ed. ' +
((__t = ( editor )) == null ? '' : __t) +
' (' +
((__t = ( publisher )) == null ? '' : __t) +
'), ' +
((__t = ( formattedDate )) == null ? '' : __t) +
', ' +
((__t = ( paragraphNumber )) == null ? '' : __t) +
'.\n\t\t</div>\n\t</div>\n\t<div class="citation_url">\n\t\t<span>Citation URL</span>\n\t\t<input disabled="disabled" value="' +
((__t = ( url )) == null ? '' : __t) +
'" />\n\t</div>\n\t<div class="reference_text">\n\t\t<span>Reference Text</span>\n\t\t<textarea disabled="disabled">' +
((__t = ( referenceText )) == null ? '' : __t) +
'</textarea>\n\t</div>\n</div>';

}
return __p
};

this["JST"]["app/oscitk/themes/Simple/templates/figure-reference.tpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<a href="#' +
((__t = ( id )) == null ? '' : __t) +
'" class="figure_reference">' +
((__t = ( title )) == null ? '' : __t) +
'</a>';

}
return __p
};

this["JST"]["app/oscitk/themes/Simple/templates/figures.tpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class=\'overlay figure-browser\'>\n\t<div id="dismiss">\n\t\t<button class="btn btn-link">\n\t\t<span class="glyphicon glyphicon-remove"></span>\n\t\t</button>\n\t</div>\n\t<div class="container">\n\t\t<div class="row">\n\t\t\t<div class="col-md-3">\n\t\t\t<h3>Figures</h3>\n\t\t\t</div>\n\t\t</div>\n\t\t<div class="row">\n\t\t\t';
 _.each(figures, function(figure) { ;
__p += '\n\t\t\t<div class="col-md-3">\n\t\t\t\t<figure class=\'thumbnail\' data-figure-id="' +
((__t = ( figure.id )) == null ? '' : __t) +
'">\n\t\t\t\t\t';
 if (figure.thumbnail_url != undefined) { ;
__p += '\n\t\t\t\t\t\t<img class=\'figure-thumbnail\' src=\'' +
((__t = ( figure.thumbnail_url )) == null ? '' : __t) +
'\'/>\n\t\t\t\t\t';
 } else { ;
__p += '\n\t\t\t\t\t\t<div class=\'figure-thumbnail\'>&nbsp;</div>\n\t\t\t\t\t';
 } ;
__p += '\n\t\t\t\t\t<figcaption>' +
((__t = ( figure.title )) == null ? '' : __t) +
'</figcaption>\n\t\t\t\t</figure>\n\t\t\t</div>\n\t\t\t';
 }); ;
__p += '\n\t\t</div>\n\t</div>\n</div>\n';

}
return __p
};

this["JST"]["app/oscitk/themes/Simple/templates/font-size.tpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<a href="#font-larger" class="larger font-button">A +</a>\n<a href="#font-smaller" class="smaller font-button">A -</a>\n';

}
return __p
};

this["JST"]["app/oscitk/themes/Simple/templates/font-style.tpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="theme-control">\n\t<h3>Theme</h3>\n\t<a href="#normal" class="theme-button">Normal</a>\n\t<a href="#sepia" class="theme-button">Sepia</a>\n\t<a href="#night" class="theme-button">Night</a>\n</div>';

}
return __p
};

this["JST"]["app/oscitk/themes/Simple/templates/font.tpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<h3>Reading Settings</h3>\n<div class="font-control">\n\t<h3>Font Size</h3>\n\t<a href="#font-larger" class="larger font-button">A</a>\n\t<a href="#font-smaller" class="smaller font-button">A</a>\n</div>\n<div class="theme-control">\n\t<h3>Theme</h3>\n\t<a href="#normal" class="theme-button">Normal</a>\n\t<a href="#sepia" class="theme-button">Sepia</a>\n\t<a href="#night" class="theme-button">Night</a>\n</div>';

}
return __p
};

this["JST"]["app/oscitk/themes/Simple/templates/header.tpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {

 if (typeof(headerImage) !== "undefined") { ;
__p += '\n<div class="container-header" style="background-image: linear-gradient(rgba(0, 0, 0, 0.5),rgba(0, 0, 0, 0.5)), url(\'' +
((__t = ( headerImage )) == null ? '' : __t) +
'\');">\n';
 } else { ;
__p += '\n<div class="container-header">\n';
 } ;
__p += '\n\t<div class="container header-title">\n\t\t<h1>' +
((__t = ( title )) == null ? '' : __t) +
'</h1>\n\t\t<p>by ' +
((__t = ( creator )) == null ? '' : __t) +
'</p>\n  \t</div>\n</div>';

}
return __p
};

this["JST"]["app/oscitk/themes/Simple/templates/navigation.tpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class=\'header text-center\'>' +
((__t = ( chapter )) == null ? '' : __t) +
'</div>\n\n';
 if (previousItem !== null) { ;
__p += '\n<div class=\'prev-page side\'>\n\t<div class=\'indicator\'>\n\t\t<a href="#section/' +
((__t = ( previousItem.id )) == null ? '' : __t) +
'" title="' +
((__t = ( previousItem.get('title') )) == null ? '' : __t) +
'">\n\t\t\t<span class="glyphicon glyphicon-chevron-left"></span>\n\t\t</a>\n\t</div>\n</div>\n';
 } ;
__p += '\n\n';
 if (nextItem !== null) { ;
__p += '\n<div class=\'next-page side\'>\n\t<div class=\'indicator\'>\n\t\t<a href="#section/' +
((__t = ( nextItem.id )) == null ? '' : __t) +
'" title="' +
((__t = ( nextItem.get('title') )) == null ? '' : __t) +
'">\n\t\t\t<span class="glyphicon glyphicon-chevron-right"></span>\n\t\t</a>\n\t</div>\n</div>\n';
 } ;
__p += '\n\n';
 if (previousItem !== null) { ;
__p += '\n<div class=\'prev-page corner\'>\n\t<a href="#section/' +
((__t = ( previousItem.id )) == null ? '' : __t) +
'" title="' +
((__t = ( previousItem.get('title') )) == null ? '' : __t) +
'">\n\t\t<div class=\'label\'>Previous Section</div>\n\t</a>\n</div>\n';
 } ;
__p += '\n\n';
 if (nextItem !== null) { ;
__p += '\n<div class=\'next-page corner\'>\n\t<a href="#section/' +
((__t = ( nextItem.id )) == null ? '' : __t) +
'" title="' +
((__t = ( nextItem.get('title') )) == null ? '' : __t) +
'">\n\t\t<div class=\'label\'>Next Section</div>\n\t</a>\n</div>\n';
 } ;


}
return __p
};

this["JST"]["app/oscitk/themes/Simple/templates/note-popup.tpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="note-popup">\n    <h2>Note</h2>\n    <form class="noteForm">\n    \t<textarea>' +
((__t = ( note )) == null ? '' : __t) +
'</textarea>\n        <label for="note-tags">Tags:</label>\n        <input type="text" name="note-tags" id="note-tags" value="' +
((__t = ( tags.join(', ') )) == null ? '' : __t) +
'" />\n    </form>\n    <div class="status">Saved</div>\n</div>';

}
return __p
};

this["JST"]["app/oscitk/themes/Simple/templates/notes.tpl.html"] = function(obj) {
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

this["JST"]["app/oscitk/themes/Simple/templates/page.tpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p +=
((__t = ( content.content )) == null ? '' : __t);

}
return __p
};

this["JST"]["app/oscitk/themes/Simple/templates/section.tpl.html"] = function(obj) {
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

this["JST"]["app/oscitk/themes/Simple/templates/title.tpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<h1 id="publication-title"></h1>';

}
return __p
};

this["JST"]["app/oscitk/themes/Simple/templates/toc.tpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class=\'overlay\'>\n\t<div id="dismiss">\n\t\t<button class="btn btn-link">\n\t\t<span class="glyphicon glyphicon-remove"></span>\n\t\t</button>\n\t</div>\n\t<div class="container">\n\t\t<h3>Table of Contents</h3>\n\t\t<ul>\n\t\t\t';
 _.each(items, function(item) { ;
__p += '\n\t\t\t\t<li class="toc-item';
 if (item.id === app.views.navigationView.currentNavigationItem.id) { print(" active"); } ;
__p += '">\n\t\t\t\t\t<a data-section-id="' +
((__t = ( item.id )) == null ? '' : __t) +
'" href="#">\n\t\t\t\t\t\t<div class="toc-item-thumbnail">\n\t\t\t\t\t\t\t';
 if (item.get('thumbnail')) { ;
__p += '\n\t\t\t\t\t\t\t\t<img src="' +
((__t = ( item.get('thumbnail') )) == null ? '' : __t) +
'">\n\t\t\t\t\t\t\t';
 } ;
__p += '\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class="toc-item-text">\n\t\t\t\t\t\t\t<h4>' +
((__t = ( item.get('title') )) == null ? '' : __t) +
'</h4>\n\t\t\t\t\t\t\t';
 if (item.get('subtitle')) { ;
__p += '\n\t\t\t\t\t\t\t\t<h5>' +
((__t = ( item.get('subtitle') )) == null ? '' : __t) +
'</h5>\n\t\t\t\t\t\t\t';
 } ;
__p += '\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</a>\n\t\t\t\t\t<hr>\n\t\t\t\t</li>\n\t\t\t';
 }); ;
__p += '\n\t\t</ul>\n\t</div>\n</div>';

}
return __p
};

this["JST"]["app/oscitk/themes/Simple/templates/toolbar-item.tpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {

 if (style == 'default') { ;
__p += '\n\t<a href="#">' +
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

this["JST"]["app/oscitk/themes/Simple/templates/toolbar.tpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div id="toolbar-container">\n<nav class="navbar navbar-default">\n\t<div class="container-fluid">\n\t   <div class="navbar-header">\n      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">\n        <span class="sr-only">Toggle navigation</span>\n        <span class="icon-bar"></span>\n        <span class="icon-bar"></span>\n        <span class="icon-bar"></span>\n      </button>\n      <a id="toolbar-title" class="navbar-brand" href="#">' +
((__t = ( title )) == null ? '' : __t) +
'</a>\n    </div>\n    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">\n\t\t\t<ul id="toolbar-area" class="nav navbar-nav navbar-right"></ul>\n\t\t</div>\n\t</div>\n</nav>\n</div>\n';

}
return __p
};