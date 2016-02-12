this["JST"] = this["JST"] || {};

this["JST"]["app/oscitk/themes/Simple_Horizontal/templates/app.tpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="container">\n\t<div id="account"></div>\n\t<div id="toc"></div>\n\t<div id="figures"></div>\n</div>\n\n<header>\n\t<div id="header"></div>\n</header>\n\n<!-- Top Navigation -->\n<div id="navbar" class="hidden-print" data-spy="affix">\n\t<div id="toolbar" class="hidden-print hidden-xs" data-spy="affix"></div>\n</div>\n\n<!-- Progress Bar -->\n<div class="progress horizontal hidden-print hidden-xs" data-spy="affix">\n\t<div class="progress-bar progress-bar-primary" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100"></div>\n</div>\n\n<!-- Main Content -->\n<div role="content" class="content">\n\t<div class="container">\n\t\t<div id="loader">Loading...</div>\n\t\t<div id="section"></div>\n\t</div>\n</div>\n\n<!-- Bottom Navigation -->\n<div id="navigation" class="no-print"></div>';

}
return __p
};

this["JST"]["app/oscitk/themes/Simple_Horizontal/templates/font.tpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<h3>Reading Settings</h3>\n<div class="font-control">\n\t<h3>Font Size</h3>\n\t<a href="#font-larger" class="larger font-button">A</a>\n\t<a href="#font-smaller" class="smaller font-button">A</a>\n</div>\n<div class="theme-control">\n\t<h3>Theme</h3>\n\t<a href="#normal" class="theme-button">Normal</a>\n\t<a href="#sepia" class="theme-button">Sepia</a>\n\t<a href="#night" class="theme-button">Night</a>\n</div>';

}
return __p
};

this["JST"]["app/oscitk/themes/Simple_Horizontal/templates/header.tpl.html"] = function(obj) {
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
__p += '\n\t<div class="container header-title">\n\t\t<a href="#left" id="skip-header" class="header-scroll-icon"><span class="glyphicon glyphicon-chevron-right"></span></a>\n\t\t<h1>' +
((__t = ( title )) == null ? '' : __t) +
'</h1>\n\t\t<p>\n\t\t\t';
 address = 'by ' ;
__p += '\n\t\t\t';
 _.each(creator, function(author) { ;
__p += '\n\t\t\t\t' +
((__t = ( address )) == null ? '' : __t) +
'' +
((__t = ( author.value )) == null ? '' : __t) +
'\n\t\t\t\t';
 address = 'and ' ;
__p += '\n\t\t\t';
 }); ;
__p += '\n\t\t</p>\n\n  \t</div>\n</div>';

}
return __p
};

this["JST"]["app/oscitk/themes/Simple_Horizontal/templates/modal.tpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="modal fade bs-example-modal-sm" tabindex="-1" role="dialog" aria-labelledby="note-' +
((__t = ( id )) == null ? '' : __t) +
'" id="note-' +
((__t = ( id )) == null ? '' : __t) +
'">\n    <div class="modal-dialog modal-sm">\n        <div class="modal-content">\n            <div class="modal-header">\n                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>\n                <h4 class="modal-title" id="myModalLabel">Tools</h4>\n            </div>\n            <div class="modal-body">\n                <div class="tabbable"> <!-- Only required for left/right tabs -->\n                    <ul class="nav nav-tabs">\n                        <li class="active"><a href="#tab-' +
((__t = ( id )) == null ? '' : __t) +
'1" data-toggle="tab">Notes</a></li>\n                        <li><a href="#tab-' +
((__t = ( id )) == null ? '' : __t) +
'2" data-toggle="tab" data-event="toggleCiteDialog" class="toggleCiteDialog">Citations</a></li>\n                    </ul>\n                    <div class="tab-content">\n                        <div class="tab-pane active" id="tab-' +
((__t = ( id )) == null ? '' : __t) +
'1">\n                            ' +
((__t = ( noteForm )) == null ? '' : __t) +
'\n                        </div>\n                        <div class="tab-pane citation" id="tab-' +
((__t = ( id )) == null ? '' : __t) +
'2">\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>';

}
return __p
};

this["JST"]["app/oscitk/themes/Simple_Horizontal/templates/navbar.tpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<nav class="navbar navbar-default">\n\t<div class="container">\n\t   <div class="navbar-header">\n      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">\n        <span class="sr-only">Toggle navigation</span>\n        <span class="icon-bar"></span>\n        <span class="icon-bar"></span>\n        <span class="icon-bar"></span>\n      </button>\n      <a id="navbar-title" class="navbar-brand" href="#">' +
((__t = ( title )) == null ? '' : __t) +
'</a>\n    </div>\n    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">\n\t\t\t<ul id="navbar-area" class="nav navbar-nav navbar-right">\n         ';
 i = 0 ;
__p += '\n         ';
 _.each(sections, function(section) { ;
__p += '\n          ';
 subtitle = section.get('subtitle') ? ' - <span class="navbar-subtitle">'+section.get('subtitle')+'</span>' : '' ;
__p += '\n          ';
 ++i ;
__p += '\n          <li class="navbar-item visible-xs ';
 if (section.id === app.views.navigationView.currentNavigationItem.id) { print(" active"); } ;
__p += '">\n            <a data-section-id="' +
((__t = ( section.id )) == null ? '' : __t) +
'" href="#">\n              ' +
((__t = ( i + ' - ' + section.get('title') + subtitle )) == null ? '' : __t) +
'\n            </a>\n          </li>\n         ';
 }); ;
__p += '\n      </ul>\n\t\t</div>\n\t</div>\n</nav>';

}
return __p
};

this["JST"]["app/oscitk/themes/Simple_Horizontal/templates/navigation.tpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {

 if (previousItem !== null) { ;
__p += '\n<div class=\'prev-page corner hidden-print\'>\n\t<a href="#section/' +
((__t = ( previousItem.id )) == null ? '' : __t) +
'" title="' +
((__t = ( previousItem.get('title') )) == null ? '' : __t) +
'">\n\t\tPrevious\n\t</a>\n</div>\n';
 } ;
__p += '\n\n<ul class="navigation-sections hidden-print">\n';
 i = 0 ;
__p += '\n';
 _.each(sections, function(section) { ;
__p += '\n ';
 subtitle = section.get('subtitle') ? ' - <span class="navigation-subtitle">'+section.get('subtitle')+'</span>' : '' ;
__p += '\n ';
 ++i ;
__p += '\n <li class="navigation-item hidden-xs ';
 if (section.id === app.views.navigationView.currentNavigationItem.id) { print(" active"); } ;
__p += '" data-toggle="tooltip" data-placement="bottom" title="' +
((__t = ( section.get('title') )) == null ? '' : __t) +
'">\n   <a data-section-id="' +
((__t = ( section.id )) == null ? '' : __t) +
'">\n     ' +
((__t = ( i )) == null ? '' : __t) +
'\n   </a>\n </li>\n';
 }); ;
__p += '\n</ul>\n\n';
 if (nextItem !== null) { ;
__p += '\n<div class=\'next-page corner hidden-print\'>\n\t<a href="#section/' +
((__t = ( nextItem.id )) == null ? '' : __t) +
'" title="' +
((__t = ( nextItem.get('title') )) == null ? '' : __t) +
'">\n\t\tNext\n\t</a>\n</div>\n';
 } ;


}
return __p
};

this["JST"]["app/oscitk/themes/Simple_Horizontal/templates/notes.tpl.html"] = function(obj) {
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

this["JST"]["app/oscitk/themes/Simple_Horizontal/templates/page.tpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p +=
((__t = ( content.content )) == null ? '' : __t);

}
return __p
};

this["JST"]["app/oscitk/themes/Simple_Horizontal/templates/paragraph-citation.tpl.html"] = function(obj) {
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
'.</p>\n\t\t</div>\n\t</div>\n\t<div class="citation-url">\n\t\t<h4>Citation URL</h4>\n\t\t<input disabled="disabled" value="' +
((__t = ( url )) == null ? '' : __t) +
'" />\n\t</div>\n\t<div class="reference-text">\n\t\t<h4>Reference Text</h4>\n\t\t<textarea disabled="disabled">' +
((__t = ( referenceText )) == null ? '' : __t) +
'</textarea>\n\t</div>\n</div>';

}
return __p
};

this["JST"]["app/oscitk/themes/Simple_Horizontal/templates/paragraph-note-form.tpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<textarea data-paragraph_number="' +
((__t = ( id )) == null ? '' : __t) +
'" data-id="' +
((__t = ( cid )) == null ? '' : __t) +
'">' +
((__t = ( noteText )) == null ? '' : __t) +
'</textarea>\n<button type="button" class="btn btn-primary btn-block note-submit">Add Note</button>';

}
return __p
};

this["JST"]["app/oscitk/themes/Simple_Horizontal/templates/paragraph-note-popup.tpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class=\'overlay\'>\n    <!-- TODO: Check if this is obsolete-->\n    <div id="dismiss">\n        <button class="btn btn-link">\n        <span class="glyphicon glyphicon-remove"></span>\n        </button>\n    </div>\n    <div class="container">\n        <div class="row" style="margin-top: 30vh;">\n            <div class="col-md-8 col-md-offset-2">\n                <div class="panel panel-default">\n                    <div class="panel-heading">\n                        <h3>Notes</h3>\n                    </div>\n                    <div class="panel-body">\n\n                        <div class="note-popup">\n                            <form class="noteForm">\n                            \t<textarea>' +
((__t = ( note )) == null ? '' : __t) +
'</textarea>\n                                <label for="note-tags">Tags:</label>\n                                <input type="text" name="note-tags" id="note-tags" value="' +
((__t = ( tags.join(', ') )) == null ? '' : __t) +
'" />\n                            </form>\n                            <div class="status">Saved</div>\n                        </div>\n\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>';

}
return __p
};

this["JST"]["app/oscitk/themes/Simple_Horizontal/templates/section.tpl.html"] = function(obj) {
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

this["JST"]["app/oscitk/themes/Simple_Horizontal/templates/title.tpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<h1 id="publication-title"></h1>';

}
return __p
};

this["JST"]["app/oscitk/themes/Simple_Horizontal/templates/toolbar-account-login.tpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class=\'overlay\'>\n\t<div id="dismiss">\n\t\t<button class="btn btn-link">\n\t\t<span class="glyphicon glyphicon-remove"></span>\n\t\t</button>\n\t</div>\n\t<div class="container">\n\t\t<div class="row" style="margin-top: 30vh;">\n\t\t\t<div class="col-md-8 col-md-offset-2">\n\t\t\t\t<div class="panel panel-default">\n\t\t\t\t\t<div class="panel-heading">\n\t\t\t\t\t\t<h3>Login</h3>\n\t\t\t\t\t</div>\n\t\t  \t\t\t<div class="panel-body">\n\t\t\t\t\t\t<div class="form-error"></div>\n\t\t\t\t\t\t<form id="account-form">\n\t\t\t\t\t\t\t<div class="form-group">\n\t\t\t\t\t\t\t\t<label for="username">Username:</label>\n\t\t\t\t\t\t\t\t<input class="form-control" type="text" id="username" placeholder="Username" />\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class="form-group">\n\t\t\t\t\t\t\t\t<label for="password">Password:</label>\n\t\t\t\t\t\t\t\t<input class="form-control" type="password" id="password" placeholder="Password" />\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<button type="button" class="btn login">Log In</button>\n\t\t\t\t\t\t\t<div><a href="#" class="register">Register an account</a></div>\n\t\t\t\t\t\t</form>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</div>';

}
return __p
};

this["JST"]["app/oscitk/themes/Simple_Horizontal/templates/toolbar-account-profile.tpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class=\'overlay\'>\n\t<div id="dismiss">\n\t\t<button class="btn btn-link">\n\t\t<span class="glyphicon glyphicon-remove"></span>\n\t\t</button>\n\t</div>\n\t<div class="container">\n\t\t<div class="row" style="margin-top: 30vh;">\n\t\t\t<div class="col-md-6 col-md-offset-3">\n\t\t\t\t<div class="panel panel-default">\n\t\t\t\t\t<div class="panel-heading">\n\t\t\t\t\t\t<h3>Profile</h3>\n\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class="panel-body">\n\t\t\t\t\t\t<h4>' +
((__t = ( username )) == null ? '' : __t) +
'</h4>\n\t\t\t\t\t\t<h5>' +
((__t = ( email )) == null ? '' : __t) +
'</h5>\n\t\t\t\t\t\t<div><a href="#" class="logout">Log out</a></div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</div>';

}
return __p
};

this["JST"]["app/oscitk/themes/Simple_Horizontal/templates/toolbar-account-register.tpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class=\'overlay\'>\n\t<div id="dismiss">\n\t\t<button class="btn btn-link">\n\t\t<span class="glyphicon glyphicon-remove"></span>\n\t\t</button>\n\t</div>\n\t<div class="container">\n\t\t<div class="row" style="margin-top: 30vh;">\n\t\t\t<div class="col-md-8 col-md-offset-2">\n\t\t\t\t<div class="panel panel-default">\n\t\t\t\t\t<div class="panel-heading">\n\t\t\t\t\t\t<h3>Register</h3>\n\t\t\t\t\t</div>\n\t\t  \t\t\t<div class="panel-body">\n\t\t\t\t\t\t<div class="form-error"></div>\n\t\t\t\t\t\t<form id="account-form">\n\t\t\t\t\t\t\t<div class="form-group">\n\t\t\t\t\t\t\t\t<label for="username">Username:</label>\n\t\t\t\t\t\t\t\t<input class="form-control" type="text" id="username" placeholder="Username" />\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class="form-group">\n\t\t\t\t\t\t\t\t<label for="password">Password:</label>\n\t\t\t\t\t\t\t\t<input class="form-control" type="password" id="password" placeholder="Password" />\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class="form-group">\n\t\t\t\t\t\t\t\t<label for="email">Email:</label>\n\t\t\t\t\t\t\t\t<input class="form-control" type="text" id="email" placeholder="Email" />\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<button type="button" class="btn register">Register</button>\n\t\t\t\t\t\t\t<div><a href="#" class="login">Already have an account?</a></div>\n\t\t\t\t\t\t</form>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</div>';

}
return __p
};

this["JST"]["app/oscitk/themes/Simple_Horizontal/templates/toolbar-font-size.tpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<a href="#font-larger" class="larger font-button" data-href="font-larger" data-style="inline">A+</a>\n<a href="#font-smaller" class="smaller font-button" data-href="font-smaller" data-style="inline">A-</a>';

}
return __p
};

this["JST"]["app/oscitk/themes/Simple_Horizontal/templates/toolbar-item.tpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {

 if (style == 'default') { ;
__p += '\n\t<a href="#"><span class="hide-text">' +
((__t = ( text )) == null ? '' : __t) +
'</span></a>\n';
 } else { ;
__p += '\n\t<span id="' +
((__t = ( text )) == null ? '' : __t) +
'"></span>\n';
 } ;
__p += '\n';

}
return __p
};

this["JST"]["app/oscitk/themes/Simple_Horizontal/templates/toolbar-print.tpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<a href="#print" id="print"><span class="hide-text">Print</span></a>\n';

}
return __p
};

this["JST"]["app/oscitk/themes/Simple_Horizontal/templates/toolbar-toc.tpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class=\'overlay\'>\n\t<div id="dismiss">\n\t\t<button class="btn btn-link">\n\t\t<span class="glyphicon glyphicon-remove"></span>\n\t\t</button>\n\t</div>\n\t<div class="container">\n\t\t<div class="row" style="margin-top: 30vh;">\n\t\t\t<div class="col-md-8 col-md-offset-2">\n\t\t\t\t<div class="panel panel-default">\n\t\t\t\t\t<div class="panel-heading">\n\t\t\t\t\t\t<h3>Table of Contents</h3>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="panel-body">\n\t\t\t\t\t\t<ul class="toc">\n\t\t\t\t\t\t\t';
 _.each(items, function(item) { ;
__p += '\n\t\t\t\t\t\t\t\t<li class="toc-item';
 if (item.id === app.views.navigationView.currentNavigationItem.id) { print(" active"); } ;
__p += '">\n\t\t\t\t\t\t\t\t\t<a data-section-id="' +
((__t = ( item.id )) == null ? '' : __t) +
'" href="#">\n\t\t\t\t\t\t\t\t\t\t<div class="toc-item-thumbnail">\n\t\t\t\t\t\t\t\t\t\t\t';
 if (item.get('thumbnail')) { ;
__p += '\n\t\t\t\t\t\t\t\t\t\t\t\t<img src="' +
((__t = ( item.get('thumbnail') )) == null ? '' : __t) +
'">\n\t\t\t\t\t\t\t\t\t\t\t';
 } ;
__p += '\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t<div class="toc-item-text">\n\t\t\t\t\t\t\t\t\t\t\t<h4>' +
((__t = ( item.get('title') )) == null ? '' : __t) +
'</h4>\n\t\t\t\t\t\t\t\t\t\t\t';
 if (item.get('subtitle')) { ;
__p += '\n\t\t\t\t\t\t\t\t\t\t\t\t<h5>' +
((__t = ( item.get('subtitle') )) == null ? '' : __t) +
'</h5>\n\t\t\t\t\t\t\t\t\t\t\t';
 } ;
__p += '\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t\t\t\t<hr>\n\t\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t';
 }); ;
__p += '\n\t\t\t\t\t\t</ul>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</div>';

}
return __p
};

this["JST"]["app/oscitk/themes/Simple_Horizontal/templates/toolbar.tpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="nav">\n\t<ul id="toolbar-area" class=""></ul>\n</div>';

}
return __p
};