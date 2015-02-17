this["JST"] = this["JST"] || {};

this["JST"]["app/oscitk/themes/Skeleton/templates/account-login.tpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<h3>Login</h3>\n<div class="form-error"></div>\n<form id="account-form">\n\t<label for="username">Username:</label>\n\t<input type="text" id="username" placeholder="Username" />\n\t<label for="password">Password:</label>\n\t<input type="password" id="password" placeholder="Password" />\n\t<button type="button" class="login">Log In</button>\n\t<div><a href="#" class="register">Register an account</a></div>\n</form>';

}
return __p
};

this["JST"]["app/oscitk/themes/Skeleton/templates/account-profile.tpl.html"] = function(obj) {
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

this["JST"]["app/oscitk/themes/Skeleton/templates/account-register.tpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<h2>Register</h2>\n<div class="form-error"></div>\n<form id="account-form">\n\t<label for="username">Username:</label>\n\t<input type="text" id="username" placeholder="Username" />\n\t<label for="password">Password:</label>\n\t<input type="password" id="password" placeholder="Password" />\n\t<label for="email">Email:</label>\n\t<input type="text" id="email" placeholder="Email" />\n\t<button type="button" class="register">Register</button>\n\t<div><a href="#" class="login">Already have an account?</a></div>\n</form>';

}
return __p
};

this["JST"]["app/oscitk/themes/Skeleton/templates/app.tpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div id="title"></div>\n<div id="toolbar"></div>\n<div id="account"></div>\n<div id="toc"></div>\n<div id="font-size"></div>\n<div id="loader">Loading...</div>\n<header>\n<div id="header"></div>\n</header>\n<div id="section"></div>\n<div id="figures"></div>\n<div id="navigation"></div>\n';

}
return __p
};

this["JST"]["app/oscitk/themes/Skeleton/templates/figure-reference.tpl.html"] = function(obj) {
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

this["JST"]["app/oscitk/themes/Skeleton/templates/figures.tpl.html"] = function(obj) {
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

this["JST"]["app/oscitk/themes/Skeleton/templates/font-size.tpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="font-control">\n\t<h3>Font Size</h3>\n\t<a href="#font-larger" class="larger font-button">A</a>\n\t<a href="#font-smaller" class="smaller font-button">A</a>\n</div>';

}
return __p
};

this["JST"]["app/oscitk/themes/Skeleton/templates/font-style.tpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="theme-control">\n\t<h3>Theme</h3>\n\t<a href="#normal" class="theme-button">Normal</a>\n\t<a href="#sepia" class="theme-button">Sepia</a>\n\t<a href="#night" class="theme-button">Night</a>\n</div>';

}
return __p
};

this["JST"]["app/oscitk/themes/Skeleton/templates/font.tpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<h3>Reading Settings</h3>\n<div class="font-control">\n\t<h3>Font Size</h3>\n\t<a href="#font-larger" class="larger font-button">A</a>\n\t<a href="#font-smaller" class="smaller font-button">A</a>\n</div>\n<div class="theme-control">\n\t<h3>Theme</h3>\n\t<a href="#normal" class="theme-button">Normal</a>\n\t<a href="#sepia" class="theme-button">Sepia</a>\n\t<a href="#night" class="theme-button">Night</a>\n</div>';

}
return __p
};

this["JST"]["app/oscitk/themes/Skeleton/templates/header.tpl.html"] = function(obj) {
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

this["JST"]["app/oscitk/themes/Skeleton/templates/navigation.tpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class=\'header\'>' +
((__t = ( chapter )) == null ? '' : __t) +
'</div>\n<div class=\'prev-page side\'><div class=\'indicator\'>&lt;</div></div>\n<div class=\'next-page side\'><div class=\'indicator\'>&gt;</div></div>\n<div class=\'prev-page corner\'>\n\t<div class=\'label\'>Previous</div>\n\t<div class=\'button\'>&nbsp;</div>\n</div>\n<div class=\'pager\'><div class=\'head\'>&nbsp;</div></div>\n<div class=\'next-page corner\'>\n\t<div class=\'label\'>Next</div>\n\t<div class=\'button\'>&nbsp;</div>\n</div>';

}
return __p
};

this["JST"]["app/oscitk/themes/Skeleton/templates/page.tpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p +=
((__t = ( content.content )) == null ? '' : __t);

}
return __p
};

this["JST"]["app/oscitk/themes/Skeleton/templates/title.tpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<h1 id="publication-title"></h1>';

}
return __p
};

this["JST"]["app/oscitk/themes/Skeleton/templates/toc.tpl.html"] = function(obj) {
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

this["JST"]["app/oscitk/themes/Skeleton/templates/toolbar-item.tpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p +=
((__t = ( text )) == null ? '' : __t);

}
return __p
};

this["JST"]["app/oscitk/themes/Skeleton/templates/toolbar.tpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div id="toolbar-container">\n\t<h2 id="toolbar-title"></h2>\n\t<ul id="toolbar-area"></ul>\n</div>\n';

}
return __p
};