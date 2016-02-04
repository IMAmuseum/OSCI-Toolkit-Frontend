this["JST"] = this["JST"] || {};

this["JST"]["app/oscitk/themes/Simple/templates/app.tpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="container">\n\t<div id="account"></div>\n\t<div id="toc"></div>\n\t<div id="figures"></div>\n</div>\n\n<header>\n\t<div id="header"></div>\n</header>\n<div id="navbar" class="hidden-print" data-spy="affix" data-offset-top="400"></div>\n<div id="toolbar" class="hidden-print hidden-sm hidden-xs" data-spy="affix" data-offset-top="400"></div>\n<div class="container">\n\t<div class="row">\n\t\t<div class="col-md-10 col-md-offset-1 section-col">\n\t\t\t<div id="section"></div>\n\t\t</div>\n\t</div>\n</div>\n\n<div id="navigation" class="hidden-print"></div>';

}
return __p
};

this["JST"]["app/oscitk/themes/Simple/templates/font-size.tpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<a href="#font-larger" class="larger font-button" data-href="font-larger" data-style="inline">A+</a>&nbsp;\n<a href="#font-smaller" class="smaller font-button" data-href="font-smaller" data-style="inline">A-</a>\n';

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
'</h1>\n\t\t<p>';
 address = 'by ' ;

 _.each(creator, function(author) { ;
__p +=
((__t = ( address )) == null ? '' : __t) +
'' +
((__t = ( author.value )) == null ? '' : __t);
 address = 'and ' ;

 }); ;
__p += '</p>\n\n  \t</div>\n</div>';

}
return __p
};

this["JST"]["app/oscitk/themes/Simple/templates/navbar.tpl.html"] = function(obj) {
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
__p += '\n          <li class="navbar-item hidden-xs ';
 if (section.id === app.views.navigationView.currentNavigationItem.id) { print(" active"); } ;
__p += '" data-toggle="tooltip" data-placement="bottom" title="' +
((__t = ( section.get('title') )) == null ? '' : __t) +
'">\n            <a data-section-id="' +
((__t = ( section.id )) == null ? '' : __t) +
'">\n              ' +
((__t = ( i )) == null ? '' : __t) +
'\n            </a>\n          </li>\n          <li class="navbar-item visible-xs ';
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

this["JST"]["app/oscitk/themes/Simple/templates/navigation.tpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {

 if (previousItem !== null) { ;
__p += '\n<div class=\'prev-page corner\'>\n\t<a href="#section/' +
((__t = ( previousItem.id )) == null ? '' : __t) +
'" title="' +
((__t = ( previousItem.get('title') )) == null ? '' : __t) +
'">\n\t\tPrevious\n\t</a>\n</div>\n';
 } ;
__p += '\n\n';
 if (nextItem !== null) { ;
__p += '\n<div class=\'next-page corner\'>\n\t<a href="#section/' +
((__t = ( nextItem.id )) == null ? '' : __t) +
'" title="' +
((__t = ( nextItem.get('title') )) == null ? '' : __t) +
'">\n\t\tNext\n\t</a>\n</div>\n';
 } ;


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

this["JST"]["app/oscitk/themes/Simple/templates/paragraph-cite.tpl.html"] = function(obj) {
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

this["JST"]["app/oscitk/themes/Simple/templates/paragraph-notes.tpl.html"] = function(obj) {
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

this["JST"]["app/oscitk/themes/Simple/templates/paragraph-popover.tpl.html"] = function(obj) {
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

this["JST"]["app/oscitk/themes/Simple/templates/print.tpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<a href="#print" id="print">Print</a>\n';

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

this["JST"]["app/oscitk/themes/Simple/templates/toolbar-account-login.tpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class=\'overlay\'>\n\t<div id="dismiss">\n\t\t<button class="btn btn-link">\n\t\t<span class="glyphicon glyphicon-remove"></span>\n\t\t</button>\n\t</div>\n\t<div class="container">\n\t\t<div class="row" style="margin-top: 30vh;">\n\t\t\t<div class="col-md-8 col-md-offset-2">\n\t\t\t\t<div class="panel panel-default">\n\t\t\t\t\t<div class="panel-heading">\n\t\t\t\t\t\t<h3>Login</h3>\n\t\t\t\t\t</div>\n\t\t  \t\t\t<div class="panel-body">\n\t\t\t\t\t\t<div class="form-error"></div>\n\t\t\t\t\t\t<form id="account-form">\n\t\t\t\t\t\t\t<div class="form-group">\n\t\t\t\t\t\t\t\t<label for="username">Username:</label>\n\t\t\t\t\t\t\t\t<input class="form-control" type="text" id="username" placeholder="Username" />\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class="form-group">\n\t\t\t\t\t\t\t\t<label for="password">Password:</label>\n\t\t\t\t\t\t\t\t<input class="form-control" type="password" id="password" placeholder="Password" />\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<button type="button" class="btn login">Log In</button>\n\t\t\t\t\t\t\t<div><a href="#" class="register">Register an account</a></div>\n\t\t\t\t\t\t</form>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</div>';

}
return __p
};

this["JST"]["app/oscitk/themes/Simple/templates/toolbar-account-profile.tpl.html"] = function(obj) {
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

this["JST"]["app/oscitk/themes/Simple/templates/toolbar-account-register.tpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class=\'overlay\'>\n\t<div id="dismiss">\n\t\t<button class="btn btn-link">\n\t\t<span class="glyphicon glyphicon-remove"></span>\n\t\t</button>\n\t</div>\n\t<div class="container">\n\t\t<div class="row" style="margin-top: 30vh;">\n\t\t\t<div class="col-md-8 col-md-offset-2">\n\t\t\t\t<div class="panel panel-default">\n\t\t\t\t\t<div class="panel-heading">\n\t\t\t\t\t\t<h3>Register</h3>\n\t\t\t\t\t</div>\n\t\t  \t\t\t<div class="panel-body">\n\t\t\t\t\t\t<div class="form-error"></div>\n\t\t\t\t\t\t<form id="account-form">\n\t\t\t\t\t\t\t<div class="form-group">\n\t\t\t\t\t\t\t\t<label for="username">Username:</label>\n\t\t\t\t\t\t\t\t<input class="form-control" type="text" id="username" placeholder="Username" />\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class="form-group">\n\t\t\t\t\t\t\t\t<label for="password">Password:</label>\n\t\t\t\t\t\t\t\t<input class="form-control" type="password" id="password" placeholder="Password" />\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class="form-group">\n\t\t\t\t\t\t\t\t<label for="email">Email:</label>\n\t\t\t\t\t\t\t\t<input class="form-control" type="text" id="email" placeholder="Email" />\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<button type="button" class="btn register">Register</button>\n\t\t\t\t\t\t\t<div><a href="#" class="login">Already have an account?</a></div>\n\t\t\t\t\t\t</form>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</div>';

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
__p += '<div class="nav nav-stacked">\n\t<ul id="toolbar-area" class=""></ul>\n</div>';

}
return __p
};