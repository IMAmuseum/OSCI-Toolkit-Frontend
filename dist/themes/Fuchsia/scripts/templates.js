this["JST"] = this["JST"] || {};

this["JST"]["app/oscitk/themes/Fuchsia/templates/app.tpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<!-- TOP -->\n<header class="hidden-print">\n\t<div id="header"></div>\n</header>\n\n<!-- RIGHT -->\n<div id="toolbar" class="hidden-print"></div>\n\n<!-- CENTER -->\n<!--\n<div id="loader" class="loader hidden-print">Loading...</div>\n-->\n\n<div id="section"></div>\n\n<!-- RIGHT -->\n<div id="navigation" class="hidden-print unselectable"></div>\n\n<!-- Breakpoint testing area -->\n<div id="osci-bp-sm"></div>\n<div id="osci-bp-md"></div>\n<div id="osci-bp-lg"></div>\n<div id="osci-bp-xl"></div>';

}
return __p
};

this["JST"]["app/oscitk/themes/Fuchsia/templates/navigation.tpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="progress">\n\t<div class="progress-bar progress-bar-fuchsia"></div>\n</div>\n\n<div class="chapter-info">\n\t<div class="chapter-number">' +
((__t = ( title )) == null ? '' : __t) +
'</div>\n\t<div class="chapter-title">' +
((__t = ( subtitle )) == null ? '' : __t) +
'</div>\n\t<div class="mobile-menu"></div>\n</div>\n\n<div class="btn-container">\n\t<div class="btn-page prev-page"></div>\n\t<div class="btn-page next-page"></div>\n</div>';

}
return __p
};

this["JST"]["app/oscitk/themes/Fuchsia/templates/paragraph-cite.tpl.html"] = function(obj) {
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

this["JST"]["app/oscitk/themes/Fuchsia/templates/paragraph-notes.tpl.html"] = function(obj) {
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
__p += '<!-- .section-page is used to create the 3D effect -->\n<div class="section-page">\n\t<div class="section-content">\n\t\n\t\t<div id="figure-plate-container"></div>\n\n\t\t<div class="clearfix"></div>\n\n\t\t<div id="section-header">\n\t\t\t<h2>' +
((__t = ( sectionTitle )) == null ? '' : __t) +
'</h2>\n\t\t\t';
 if (typeof(sectionSubtitle) !== null) { ;
__p += '\n\t\t\t<h3>' +
((__t = ( sectionSubtitle )) == null ? '' : __t) +
'</h3>\n\t\t\t';
 } ;
__p += '\n\t\t</div>\n\n\t\t<hr id="section-offset">\n\n\t\t' +
((__t = ( content )) == null ? '' : __t) +
'\n\t\t<div class="clearfix"></div>\n\n\t</div>\n</div>';

}
return __p
};

this["JST"]["app/oscitk/themes/Fuchsia/templates/toolbar-account-login.tpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<h3>Login</h3>\n\n<div class="toolbar-scroll">\n\n\t<div class="form-error alert alert-danger"></div>\n\n\t<form id="account-form">\n\t\t<div class="form-group">\n\t\t\t<label for="username">Username:</label>\n\t\t\t<input class="form-control" type="text" id="username" placeholder="Username" />\n\t\t</div>\n\t\t<div class="form-group">\n\t\t\t<label for="password">Password:</label>\n\t\t\t<input class="form-control" type="password" id="password" placeholder="Password" />\n\t\t</div>\n\n\t\t<button type="button" class="btn btn-default login">Log in</button>\n\n\t\t<div class="account-footer"><a href="javascript:;" class="register">Register an account</a></div>\n\n\t</form>\n\n</div>';

}
return __p
};

this["JST"]["app/oscitk/themes/Fuchsia/templates/toolbar-account-profile.tpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<h3>User Profile</h3>\n\n<div class="toolbar-scroll">\n\n\t<p>Logged in as:</p>\n\n\t<div>\n\t\t<div class="user-icon"></div>\n\t\t<div>\n\t\t\t<h4>' +
((__t = ( username )) == null ? '' : __t) +
'</h4>\n\t\t\t<h5>' +
((__t = ( email )) == null ? '' : __t) +
'</h5>\n\t\t</div>\n\t</div>\n\n\t\n\t<button type="button" class="btn btn-default logout">Log out</button>\n\t\n\t<div class="account-footer">\n\t</div>\n\n</div>';

}
return __p
};

this["JST"]["app/oscitk/themes/Fuchsia/templates/toolbar-account-register.tpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<h3>Register</h3>\n\n<div class="toolbar-scroll">\n\n\t<div class="form-error alert alert-danger"></div>\n\n\t<form id="account-form">\n\n\t\t<div class="form-group">\n\t\t\t<label for="username">Username:</label>\n\t\t\t<input class="form-control" type="text" id="username" placeholder="Username" />\n\t\t</div>\n\n\t\t<div class="form-group">\n\t\t\t<label for="password">Password:</label>\n\t\t\t<input class="form-control" type="password" id="password" placeholder="Password" />\n\t\t</div>\n\n\t\t<div class="form-group">\n\t\t\t<label for="email">Email:</label>\n\t\t\t<input class="form-control" type="text" id="email" placeholder="Email" />\n\t\t</div>\n\n\t\t<button type="button" class="btn btn-default  register">Register</button>\n\n\t\t<div class="account-footer"><a href="javascript:;" class="login">Already have an account?</a></div>\n\n\t</form>\n\t\n</div>';

}
return __p
};

this["JST"]["app/oscitk/themes/Fuchsia/templates/toolbar-item.tpl.html"] = function(obj) {
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

this["JST"]["app/oscitk/themes/Fuchsia/templates/toolbar-notes.tpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<h3>Notes</h3>\n\n<div class="toolbar-scroll">\n\t<div class="notesReel">\n\t\t';
 if (notes.length > 0) { ;
__p += '\n\t\t<ul class="notesList">\n\t\t\t';
 _.each(notes, function(note) { ;
__p += '\n\t\t\t\t<li class="notesListItem">\n\t\t\t\t\t<div class="note-buttons">\n\t\t\t\t\t\t<a class="note-link toolbar-link pull-left" data-paragraph_number="' +
((__t = ( note.get('paragraph_number') )) == null ? '' : __t) +
'" href="javascript:;">\n\t\t\t\t\t\t\t<img src="images/icon-link.png"/>\n\t\t\t\t\t\t</a>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="the-note">\n\t\t\t\t\t\t<span class="note-content">' +
((__t = ( note.get('note') )) == null ? '' : __t) +
'</span>\n\t\t\t\t\t</div>\n\t\t\t\t</li>\n\t\t\t';
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

this["JST"]["app/oscitk/themes/Fuchsia/templates/toolbar-search-results.tpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {

 if (query.keyword) { ;
__p += '\n<!--\n<div id="search-results-header">\n\t<div id="search-summary">\n\t\tResult(s) for <span id="search-query">"' +
((__t = ( query.keyword )) == null ? '' : __t) +
'"</span> (' +
((__t = ( response.numFound )) == null ? '' : __t) +
')\n\t\t<a id="reset-search" href="#">RESET</a>\n\t</div>\n\t<div id="results-sort">\n\t\tSort By:\n\t\t<ul>\n\t\t\t<li><a href="#" class="sort-button ' +
((__t = ( (query.sort === 'score') ? 'active' : '' )) == null ? '' : __t) +
'" data-sort="score">Relevance</a></li>\n\t\t\t<li><a href="#" class="sort-button ' +
((__t = ( (query.sort === 'content') ? 'active' : '' )) == null ? '' : __t) +
'" data-sort="content">Type</a></li>\n\t\t</ul>\n\t</div>\n</div>\n-->\n<div id="search-results-column-wrapper">\n\n\t';
 if (response.numFound !== 0) { ;
__p += '\n\t<div id="search-results">\n\t\t<div id="search-results-content">\n\t\t\t';
 _.each(results, function(group) { var first = true;;
__p += '\n\n\t\t\t\t<div class="result-section">\n\t\t\t\t\t';
 _.each(group, function(result) { ;
__p += '\n\n\t\t\t\t\t\t';
 if (first && result.get('bundle_name') !== "Note" ) { ;
__p += '\n\t\t\t\t\t\t<div class="result-title">' +
((__t = ( result.get('label') )) == null ? '' : __t) +
'</div>\n\t\t\t\t\t\t';
 first = false; } ;
__p += '\n\n\t\t\t\t\t\t';
 if (!_.isEmpty(result.get('teaser'))) { ;
__p += '\n\t\t\t\t\t\t<div class="search-result" data-id="' +
((__t = ( result.get('id') )) == null ? '' : __t) +
'">\n\t\t\t\t\t\t\t<div class="result-content">\n\n\t\t\t\t\t\t\t\t<!--<div class="result-type ' +
((__t = ( result.get('bundle') )) == null ? '' : __t) +
'">' +
((__t = ( result.get('bundle') )) == null ? '' : __t) +
'</div>-->\n\t\t\t\t\t\t\t\t<div class="result-type ' +
((__t = ( result.get('bundle') )) == null ? '' : __t) +
'"><img src="images/icon-link.png"></div>\n\n\t\t\t\t\t\t\t\t<div class="result-body">\n\t\t\t\t\t\t\t\t';
 if ( result.get('bundle_name') === "Note" ) { ;
__p += '\n\t\t\t\t\t\t\t\t\t' +
((__t = ( result.get('ss_body') )) == null ? '' : __t) +
'\n\t\t\t\t\t\t\t\t';
 } else { ;
__p += '\n\t\t\t\t\t\t\t\t\t';
 if (_.isEmpty(result.get('teaser'))) { ;
__p += '\n\t\t\t\t\t\t\t\t\t\t&nbsp;\n\t\t\t\t\t\t\t\t\t';
 } else { ;
__p += '\n\t\t\t\t\t\t\t\t\t\t' +
((__t = ( result.get('teaser') )) == null ? '' : __t) +
'\n\t\t\t\t\t\t\t\t\t';
 } ;
__p += '\n\t\t\t\t\t\t\t\t';
 } ;
__p += '\n\t\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t';
 } ;
__p += '\n\n\t\t\t\t\t';
 }); ;
__p += '\n\t\t\t\t</div>\n\n\t\t\t';
 }); ;
__p += '\n\t\t</div>\n\t</div>\n\t';
 } else { ;
__p += '\n\tNo results found.\n\t';
 } ;
__p += '\n\n\t<!--\n\t<div id="facet-by-section">\n\t\t<div class="section-title">Filter by section</div>\n\t\t<div id="facet-sections-container">\n\t\t\t<ul id="facet-sections">\n\t\t\t\t';
 _.each(response.facets, function(facet) { ;
__p += '\n\t\t\t\t\t<li class="facet-section">\n\t\t\t\t\t\t<a href="#" data-filter="section:' +
((__t = ( facet.section_id )) == null ? '' : __t) +
'" class="facet">' +
((__t = ( facet.section )) == null ? '' : __t) +
'</a>\n\t\t\t\t\t\t(' +
((__t = ( facet.count )) == null ? '' : __t) +
')\n\t\t\t\t\t</li>\n\t\t\t\t';
 }); ;
__p += '\n\t\t\t</ul>\n\t\t</div>\n\t</div>\n\t-->\n\n</div>\n';
 } ;


}
return __p
};

this["JST"]["app/oscitk/themes/Fuchsia/templates/toolbar-search.tpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<h3>Search</h3>\n<div id="search-container">\n\t<form id="search-form" name="search-form" method="POST">\n\t\t<div id="search-box">\n\t\t\t<input type="text" class="form-control input-sm" id="search-keyword" placeholder="Search" value="' +
((__t = ( query.keyword )) == null ? '' : __t) +
'"/>\n\t\t\t<div id="search-submit"></div>\n\t\t\t<input type="hidden" name="page" id="search-page" />\n\t\t</div>\n\t\t<div id="search-filters-container">\n\t\t\t<div class="search-filter-select">\n\t\t\t\t<select class="form-control input-sm search-filters">\n\t\t\t\t\t<option>No filter</option>\n\t\t\t\t\t<option value="type:content">Content</option>\n\t\t\t\t\t<option value="type:notes">My Notes</option>\n\t\t\t\t\t<option value="type:footnotes">Footnotes</option>\n\t\t\t\t\t<!--<option value="type:figures">Figures</option>-->\n\t\t\t\t</select>\n\t\t\t</div>\n\t\t</div>\n\t</form>\n</div>\n\n\n<div id="search-results-container" class="toolbar-scroll"></div>';

}
return __p
};

this["JST"]["app/oscitk/themes/Fuchsia/templates/toolbar-toc.tpl.html"] = function(obj) {
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

this["JST"]["app/oscitk/themes/Fuchsia/templates/toolbar.tpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div id="toolbar-overlay-wrapper">\n\n\t<div id="toolbar-overlay"></div>\n\n\t<div id="toolbar-sidebar">\n\n\t\t<div id="toolbar-readout">\n\t\t\t<div id="toolbar-search"></div>\n\t\t\t<div id="toolbar-account"></div>\n\t\t\t<div id="toolbar-toc"></div>\n\t\t\t<div id="toolbar-notes"></div>\n\t\t</div>\n\n\t</div>\n\n</div>\n\n<div id="toolbar-area">\n\t<li class="toolbar-item-view close-toolbar-item"></li>\n</div>';

}
return __p
};