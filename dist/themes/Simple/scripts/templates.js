this["JST"] = this["JST"] || {};

this["JST"]["app/oscitk/themes/Simple/templates/app.tpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="container">\n\t<div id="account"></div>\n\t<div id="toc"></div>\n\t<div id="figures"></div>\n</div>\n\n<header>\n\t<div id="header"></div>\n</header>\n\n<div id="navbar" class="hidden-print" data-spy="affix" data-offset-top="250"></div>\n<div id="toolbar" class="hidden-print"  data-spy="affix" data-offset-top="250"></div>\n\n<div class="container">\n\t<div class="row">\n\t\t<div class="col-md-10 col-md-offset-1">\n\t\t\t<div id="section"></div>\n\t\t</div>\n\t</div>\n</div>\n\n<div id="navigation" class="hidden-print"></div>';

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
'\'); background-size: cover;">\n';
 } else { ;
__p += '\n<div class="container-header">\n';
 } ;
__p += '\n\t<div class="container header-title">\n\t\t<h1>' +
((__t = ( title )) == null ? '' : __t) +
'</h1>\n\t\t';
 if( creator ) {;
__p += '\n\t\t\t<p>by ';
 $.each(creator, function(i,v) { ;
__p += '\n\t\t\t\t' +
((__t = ( v.value )) == null ? '' : __t) +
'\n\t\t\t\t';
 if( i !== creator.length-1 ) { ;
__p += '\n\t\t\t\t\t';
 ', ' ;
__p += '\n\t\t\t\t';
 } ;
__p += '\n\t\t\t';
 }); ;
__p += '\n\t\t';
 } ;
__p += '\n\t\t</p>\n\n  \t</div>\n</div>';

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

this["JST"]["app/oscitk/themes/Simple/templates/toolbar-account-login.tpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="form-error alert alert-danger"></div>\n<form id="account-form">\n\t<div class="form-group">\n\t\t<label for="username">Username:</label>\n\t\t<input class="form-control" type="text" id="username" placeholder="Username" />\n\t</div>\n\t<div class="form-group">\n\t\t<label for="password">Password:</label>\n\t\t<input class="form-control" type="password" id="password" placeholder="Password" />\n\t</div>\n\t<button type="button" class="btn login">Log In</button>\n\t<div><a href="javascript:;" class="register">Register an account</a></div>\n</form>';

}
return __p
};

this["JST"]["app/oscitk/themes/Simple/templates/toolbar-account-profile.tpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="form-error alert alert-danger"></div>\n<h4>' +
((__t = ( username )) == null ? '' : __t) +
'</h4>\n<h5>' +
((__t = ( email )) == null ? '' : __t) +
'</h5>\n<div><a href="javascript:;" class="logout">Log out</a></div>';

}
return __p
};

this["JST"]["app/oscitk/themes/Simple/templates/toolbar-account-register.tpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="form-error alert alert-danger"></div>\n<form id="account-form">\n\t<div class="form-group">\n\t\t<label for="username">Username:</label>\n\t\t<input class="form-control" type="text" id="username" placeholder="Username" />\n\t</div>\n\t<div class="form-group">\n\t\t<label for="password">Password:</label>\n\t\t<input class="form-control" type="password" id="password" placeholder="Password" />\n\t</div>\n\t<div class="form-group">\n\t\t<label for="email">Email:</label>\n\t\t<input class="form-control" type="text" id="email" placeholder="Email" />\n\t</div>\n\t<button type="button" class="btn register">Register</button>\n\t<div><a href="javascript:;" class="login">Already have an account?</a></div>\n</form>';

}
return __p
};

this["JST"]["app/oscitk/themes/Simple/templates/toolbar-font-size.tpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="btn-group">\n\t<a href="javascript:;" class="larger btn btn-primary">A+</a>\n\t<a href="javascript:;" class="smaller btn btn-primary">A-</a>\n</div>';

}
return __p
};

this["JST"]["app/oscitk/themes/Simple/templates/toolbar-item.tpl.html"] = function(obj) {
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

this["JST"]["app/oscitk/themes/Simple/templates/toolbar-modal.tpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="modal fade" tabindex="-1" role="dialog">\n\t<div class="modal-dialog" role="document">\n\t\t<div class="modal-content">\n\t\t\t<div class="modal-header">\n\t\t\t\t<button type="button" class="close" data-dismiss="modal" ><span>&times;</span></button>\n\t\t\t\t<h4 class="modal-title">' +
((__t = ( title )) == null ? '' : __t) +
'</h4>\n\t\t\t</div>\n\t\t\t<div class="modal-body">\n\t\t\t\t' +
((__t = ( body )) == null ? '' : __t) +
'\n\t\t\t</div>\n\t\t\t<div class="modal-footer">\n\t\t\t\t<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</div>';

}
return __p
};

this["JST"]["app/oscitk/themes/Simple/templates/toolbar-print.tpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<a href="javascript:;" id="print">Print</a>\n';

}
return __p
};

this["JST"]["app/oscitk/themes/Simple/templates/toolbar-toc.tpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<ul class="toc">\n\t';
 _.each(items, function(item) { ;
__p += '\n\t\t<li class="toc-item';
 if (item.id === app.views.navigationView.currentNavigationItem.id) { print(" active"); } ;
__p += '">\n\t\t\t<a data-section-id="' +
((__t = ( item.id )) == null ? '' : __t) +
'" href="javascript:;">\n\t\t\t\t<div class="toc-item-thumbnail">\n\t\t\t\t\t';
 if (item.get('thumbnail')) { ;
__p += '\n\t\t\t\t\t\t<img src="' +
((__t = ( item.get('thumbnail') )) == null ? '' : __t) +
'">\n\t\t\t\t\t';
 } ;
__p += '\n\t\t\t\t</div>\n\t\t\t\t<div class="toc-item-text">\n\t\t\t\t\t<h4>' +
((__t = ( item.get('title') )) == null ? '' : __t) +
'</h4>\n\t\t\t\t\t';
 if (item.get('subtitle')) { ;
__p += '\n\t\t\t\t\t\t<h5>' +
((__t = ( item.get('subtitle') )) == null ? '' : __t) +
'</h5>\n\t\t\t\t\t';
 } ;
__p += '\n\t\t\t\t</div>\n\t\t\t</a>\n\t\t\t<hr>\n\t\t</li>\n\t';
 }); ;
__p += '\n</ul>';

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