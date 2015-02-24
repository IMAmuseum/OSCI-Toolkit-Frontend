this["JST"] = this["JST"] || {};

this["JST"]["app/oscitk/themes/Bootstrap/templates/account-login.tpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<h3>Login</h3>\n<div class="form-error"></div>\n<form id="account-form">\n\t<label for="username">Username:</label>\n\t<input type="text" id="username" placeholder="Username" />\n\t<label for="password">Password:</label>\n\t<input type="password" id="password" placeholder="Password" />\n\t<button type="button" class="login">Log In</button>\n\t<div><a href="#" class="register">Register an account</a></div>\n</form>';

}
return __p
};

this["JST"]["app/oscitk/themes/Bootstrap/templates/account-profile.tpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<h3>Profile</h3>\n<h4>' +
((__t = ( username )) == null ? '' : __t) +
'</h4>\n<h5>' +
((__t = ( email )) == null ? '' : __t) +
'</h5>\n<div><a href="#" class="logout">Log out</a></div>';

}
return __p
};

this["JST"]["app/oscitk/themes/Bootstrap/templates/account-register.tpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<h2>Register</h2>\n<div class="form-error"></div>\n<form id="account-form">\n\t<label for="username">Username:</label>\n\t<input type="text" id="username" placeholder="Username" />\n\t<label for="password">Password:</label>\n\t<input type="password" id="password" placeholder="Password" />\n\t<label for="email">Email:</label>\n\t<input type="text" id="email" placeholder="Email" />\n\t<button type="button" class="register">Register</button>\n\t<div><a href="#" class="login">Already have an account?</a></div>\n</form>';

}
return __p
};

this["JST"]["app/oscitk/themes/Bootstrap/templates/app.tpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div id="toolbar"></div>\n\n<div class="container">\n\t<div id="account"></div>\n\t<div id="toc"></div>\n\t<div id="font-size"></div>\n\t<div id="figures"></div>\n</div>\n\n<!-- <header>\n\t<div id="header"></div>\n</header> -->\n\n<div class="container-fluid">\n\t<div id="loader">Loading...</div>\n\t<div id="section"></div>\n</div>\n\n<footer>\n\t<div id="navigation"></div>\n</footer>\n';

}
return __p
};

this["JST"]["app/oscitk/themes/Bootstrap/templates/figure-reference.tpl.html"] = function(obj) {
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

this["JST"]["app/oscitk/themes/Bootstrap/templates/figures.tpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class=\'figure-browser\'>\n\t<h3>Figures</h3>\n\t<div class=\'figure-tray\'>\n\t\t<div class=\'figure-reel\'>\n\t\t\t';
 _.each(figures, function(figure) { ;
__p += '\n\t\t\t\t<figure class=\'thumbnail\' data-figure-id="' +
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
'</figcaption>\n\t\t\t\t</figure>\n\t\t\t';
 }); ;
__p += '\n\t\t</div>\n\t</div>\n</div>\n';

}
return __p
};

this["JST"]["app/oscitk/themes/Bootstrap/templates/font-size.tpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="font-control">\n\t<h3>Font Size</h3>\n\t<a href="#font-larger" class="larger font-button">A</a>\n\t<a href="#font-smaller" class="smaller font-button">A</a>\n</div>';

}
return __p
};

this["JST"]["app/oscitk/themes/Bootstrap/templates/font-style.tpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="theme-control">\n\t<h3>Theme</h3>\n\t<a href="#normal" class="theme-button">Normal</a>\n\t<a href="#sepia" class="theme-button">Sepia</a>\n\t<a href="#night" class="theme-button">Night</a>\n</div>';

}
return __p
};

this["JST"]["app/oscitk/themes/Bootstrap/templates/font.tpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<h3>Reading Settings</h3>\n<div class="font-control">\n\t<h3>Font Size</h3>\n\t<a href="#font-larger" class="larger font-button">A</a>\n\t<a href="#font-smaller" class="smaller font-button">A</a>\n</div>\n<div class="theme-control">\n\t<h3>Theme</h3>\n\t<a href="#normal" class="theme-button">Normal</a>\n\t<a href="#sepia" class="theme-button">Sepia</a>\n\t<a href="#night" class="theme-button">Night</a>\n</div>';

}
return __p
};

this["JST"]["app/oscitk/themes/Bootstrap/templates/header.tpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div id="section-title">' +
((__t = ( sectionTitle )) == null ? '' : __t) +
'</div>\n';
 if (typeof(sectionSubtitle) !== null) { ;
__p += '\n<div id="section-subtitle">' +
((__t = ( sectionSubtitle )) == null ? '' : __t) +
'</div>\n';
 } ;
__p += '\n\n';
 if (typeof(headerImage) !== "undefined") { ;
__p += '\n<br>\n\t<img src="' +
((__t = ( headerImage )) == null ? '' : __t) +
'">\n';
 } ;


}
return __p
};

this["JST"]["app/oscitk/themes/Bootstrap/templates/navigation.tpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class=\'header text-center\'>' +
((__t = ( chapter )) == null ? '' : __t) +
'</div>\n\n';
 if (previousItem !== null) { ;
__p += '\n<div class=\'prev-page side\'>\n\t<div class=\'indicator\'>\n<!-- \t\t<a href="#section/' +
((__t = ( previousItem.id )) == null ? '' : __t) +
'" title="' +
((__t = ( previousItem.get('title') )) == null ? '' : __t) +
'"> -->\n\t\t\t<span class="glyphicon glyphicon-chevron-left"></span>\n<!-- \t\t</a> -->\n\t</div>\n</div>\n';
 } ;
__p += '\n\n';
 if (nextItem !== null) { ;
__p += '\n<div class=\'next-page side\'>\n\t<div class=\'indicator\'>\n\t<!-- <a href="#section/' +
((__t = ( nextItem.id )) == null ? '' : __t) +
'" title="' +
((__t = ( nextItem.get('title') )) == null ? '' : __t) +
'"> -->\n\t\t\t<span class="glyphicon glyphicon-chevron-right"></span>\n\t<!-- \t</a> -->\n\t</div>\n</div>\n';
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

this["JST"]["app/oscitk/themes/Bootstrap/templates/page.tpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p +=
((__t = ( content.content )) == null ? '' : __t);

}
return __p
};

this["JST"]["app/oscitk/themes/Bootstrap/templates/section.tpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p +=
((__t = ( content )) == null ? '' : __t) +
'\n';

}
return __p
};

this["JST"]["app/oscitk/themes/Bootstrap/templates/title.tpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<h1 id="publication-title"></h1>';

}
return __p
};

this["JST"]["app/oscitk/themes/Bootstrap/templates/toc.tpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<h3>Table of Contents</h3>\n<ul>\n\t';
 _.each(items, function(item) { ;
__p += '\n\t\t<li class="toc-item';
 if (item.id === app.views.navigationView.currentNavigationItem.id) { print(" active"); } ;
__p += '">\n\t\t\t<a data-section-id="' +
((__t = ( item.id )) == null ? '' : __t) +
'" href="#">\n\t\t\t\t<div class="toc-item-thumbnail">\n\t\t\t\t\t';
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

this["JST"]["app/oscitk/themes/Bootstrap/templates/toolbar-item.tpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p +=
((__t = ( text )) == null ? '' : __t);

}
return __p
};

this["JST"]["app/oscitk/themes/Bootstrap/templates/toolbar.tpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div id="toolbar-container">\n<nav class="navbar navbar-default">\n\t<div class="container-fluid">\n\t   <div class="navbar-header">\n      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">\n        <span class="sr-only">Toggle navigation</span>\n        <span class="icon-bar"></span>\n        <span class="icon-bar"></span>\n        <span class="icon-bar"></span>\n      </button>\n      <a id="toolbar-title" class="navbar-brand" href="#">' +
((__t = ( title )) == null ? '' : __t) +
'</a>\n    </div>\n    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">\n\t\t\t<ul id="toolbar-area" class="nav navbar-nav navbar-right"></ul>\n\t\t</div>\n\t</div>\n</nav>\n</div>\n';

}
return __p
};