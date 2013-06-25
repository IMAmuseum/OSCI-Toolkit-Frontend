OsciTk.templates['account-login'] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __d = obj.obj || obj;
__p += '<h3>Login</h3>\n<div class="form-error"></div>\n<form id="account-form">\n\t<label for="username">Username:</label>\n\t<input type="text" id="username" placeholder="Username" />\n\t<label for="password">Password:</label>\n\t<input type="password" id="password" placeholder="Password" />\n\t<button type="button" class="login">Log In</button>\n\t<div><a href="#" class="register">Register an account</a></div>\n</form>';
return __p
};

OsciTk.templates['account-profile'] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __d = obj.obj || obj;
__p += '<h3>Profile</h3>\n<h4>' +
((__t = ( obj.username )) == null ? '' : __t) +
'</h4>\n<h5>' +
((__t = ( obj.email )) == null ? '' : __t) +
'</h5>\n<div><a href="#" class="logout">Log out</a></div>';
return __p
};

OsciTk.templates['account-register'] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __d = obj.obj || obj;
__p += '<h2>Register</h2>\n<div class="form-error"></div>\n<form id="account-form">\n\t<label for="username">Username:</label>\n\t<input type="text" id="username" placeholder="Username" />\n\t<label for="password">Password:</label>\n\t<input type="password" id="password" placeholder="Password" />\n\t<label for="email">Email:</label>\n\t<input type="text" id="email" placeholder="Email" />\n\t<button type="button" class="register">Register</button>\n\t<div><a href="#" class="login">Already have an account?</a></div>\n</form>';
return __p
};

OsciTk.templates['citation'] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __d = obj.obj || obj;
__p += '<div class="citations">\n\t<span>Format</span>\n\t<ul class="formats">\n\t\t<li class="active"><a href="#citation-format-chicago">Chicago</a></li>\n\t\t<li><a href="#citation-format-mla">MLA</a></li>\n\t</ul>\n\t<div id="citation-format-chicago" class="citation">\n\t\t' +
((__t = ( obj.creator )) == null ? '' : __t) +
', "<em>' +
((__t = ( obj.title )) == null ? '' : __t) +
'</em>," in <em>' +
((__t = ( obj.publicationTitle )) == null ? '' : __t) +
'</em>, ed. ' +
((__t = ( obj.editor )) == null ? '' : __t) +
' ' +
((__t = ( obj.publisher )) == null ? '' : __t) +
' ' +
((__t = ( obj.formattedDate )) == null ? '' : __t) +
', para ' +
((__t = ( obj.paragraphNumber )) == null ? '' : __t) +
'.\n\t</div>\n\t<div id="citation-format-mla" style="display: none;" class="citation">\n\t\t' +
((__t = ( obj.creator )) == null ? '' : __t) +
', "<em>' +
((__t = ( obj.title )) == null ? '' : __t) +
'</em>," in <span style="text-decoration:underline;">' +
((__t = ( obj.publicationTitle )) == null ? '' : __t) +
'</span>, ed. ' +
((__t = ( obj.editor )) == null ? '' : __t) +
' (' +
((__t = ( obj.publisher )) == null ? '' : __t) +
'), ' +
((__t = ( obj.formattedDate )) == null ? '' : __t) +
', ' +
((__t = ( obj.paragraphNumber )) == null ? '' : __t) +
'.\n\t</div>\n</div>\n<div class="citation_url">\n\t<span>Citation URL</span>\n\t<input disabled="disabled" value="' +
((__t = ( obj.url )) == null ? '' : __t) +
'" />\n</div>\n<div class="reference_text">\n\t<span>Reference Text</span>\n\t<textarea disabled="disabled">' +
((__t = ( obj.referenceText )) == null ? '' : __t) +
'</textarea>\n</div>';
return __p
};

OsciTk.templates['figure-reference'] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __d = obj.obj || obj;
__p += '<a href="#' +
((__t = ( obj.id )) == null ? '' : __t) +
'" class="figure_reference">' +
((__t = ( obj.title )) == null ? '' : __t) +
'</a>';
return __p
};

OsciTk.templates['figures'] = function(obj) {
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
__p += '\n\t\t</div>\n\t</div>\n</div>\n<div class=\'figure-previews\'>\n\t<div class=\'figure-nav prev\' title=\'Previous figure\'>&lt;</div>\n\t<div class=\'figure-nav next\' title=\'Next Figure\'>&gt;</div>\n\n\t<h3><span class=\'back-to-grid\'>&laquo; Figures</span> | <span class=\'title\'>TITLE</span></h3>\n\t<div class=\'figure-tray\'>\n\t\t<div class=\'figure-reel\'>\n\t\t\t';
 _.each(figures, function(figure) { ;
__p += '\n\t\t\t\t<figure class=\'preview\' data-figure-id="' +
((__t = ( figure.id )) == null ? '' : __t) +
'">\n\t\t\t\t\t';
 if (figure.thumbnail_url != undefined) { ;
__p += '\n\t\t\t\t\t\t<img class=\'figure-preview\' src=\'' +
((__t = ( figure.thumbnail_url )) == null ? '' : __t) +
'\'/>\n\t\t\t\t\t';
 } else { ;
__p += '\n\t\t\t\t\t\t<div class=\'figure-preview\'>&nbsp;</div>\n\t\t\t\t\t';
 } ;
__p += '\n\t\t\t\t\t<div class=\'figure-info\'>\n\t\t\t\t\t\t<!--<h3 class=\'title\'>Figure Title?</h3>-->\n\t\t\t\t\t\t<!--<p class=\'meta-info\'>meta info | more meta</p>-->\n\t\t\t\t\t\t<div class=\'caption\'>\n\t\t\t\t\t\t\t' +
((__t = ( figure.caption )) == null ? '' : __t) +
'\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<a class=\'view-fullscreen\'>View fullscreen</a>\n\t\t\t\t\t<a class=\'view-in-context\'>View in context</a>\n\t\t\t\t</figure>\n\t\t\t';
 }); ;
__p += '\n\t\t</div>\n\t</div>\n</div>';

}
return __p
};

OsciTk.templates['font'] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __d = obj.obj || obj;
__p += '<h3>Reading Settings</h3>\n<div class="font-control">\n\t<h3>Font Size</h3>\n\t<a href="#font-larger" class="larger font-button">A</a>\n\t<a href="#font-smaller" class="smaller font-button">A</a>\n</div>\n<div class="theme-control">\n\t<h3>Theme</h3>\n\t<a href="#normal" class="theme-button">Normal</a>\n\t<a href="#sepia" class="theme-button">Sepia</a>\n\t<a href="#night" class="theme-button">Night</a>\n</div>';
return __p
};

OsciTk.templates['glossary-term-mobile'] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
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

OsciTk.templates['glossary-term'] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<li data-tid="' +
((__t = ( item.get('id') )) == null ? '' : __t) +
'">' +
((__t = ( item.get('term') )) == null ? '' : __t) +
'</li>';

}
return __p
};

OsciTk.templates['glossary'] = function(obj) {
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

OsciTk.templates['multi-column-column'] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __d = obj.obj || obj;
__p += '<div class="column"></div>';
return __p
};

OsciTk.templates['multi-column-figure'] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __d = obj.obj || obj;
__p += '<div class="figure_content"></div>\n<figcaption>' +
((__t = ( obj.caption )) == null ? '' : __t) +
'</figcaption>';
return __p
};

OsciTk.templates['multi-column-section'] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __d = obj.obj || obj;
__p += '<div id="pages"></div>';
return __p
};

OsciTk.templates['navigation'] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __d = obj.obj || obj;
__p += '<div class=\'header\'>' +
((__t = ( obj.chapter )) == null ? '' : __t) +
'</div>\n<div class=\'prev-page side\'><div class=\'indicator\'>&lt;</div></div>\n<div class=\'next-page side\'><div class=\'indicator\'>&gt;</div></div>\n<div class=\'prev-page corner\'>\n\t<div class=\'label\'>Previous</div>\n\t<div class=\'button\'>&nbsp;</div>\n</div>\n<div class=\'pager\'><div class=\'head\'>&nbsp;</div></div>\n<div class=\'next-page corner\'>\n\t<div class=\'label\'>Next</div>\n\t<div class=\'button\'>&nbsp;</div>\n</div>';
return __p
};

OsciTk.templates['note-popup'] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __d = obj.obj || obj;
__p += '<form class="noteForm">\n\t<textarea>' +
((__t = ( obj.note )) == null ? '' : __t) +
'</textarea>\n\t<div class="status">Saved</div>\n</form>\n<div class="reference-text">\n\t<span class="reference-text-label">Reference Text</span>\n\t<div class="reference-text-content">' +
((__t = ( obj.referenceContent )) == null ? '' : __t) +
'</div>\n</div>';
return __p
};

OsciTk.templates['notes'] = function(obj) {
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

OsciTk.templates['page'] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __d = obj.obj || obj;
__p +=
((__t = ( obj.content )) == null ? '' : __t);
return __p
};

OsciTk.templates['search-results'] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {

 if (query.keyword) { ;
__p += '\n<div id="search-results-header">\n\t<div id="search-summary">\n\t\tResult(s) for <span id="search-query">"' +
((__t = ( query.keyword )) == null ? '' : __t) +
'"</span> (' +
((__t = ( response.numFound )) == null ? '' : __t) +
')\n\t\t<a id="reset-search" href="#">RESET</a>\n\t</div>\n\t<div id="results-sort">\n\t\tSort By:\n\t\t<ul>\n\t\t\t<li><a href="#" class="sort-button ' +
((__t = ( (query.sort === 'score') ? 'active' : '' )) == null ? '' : __t) +
'" data-sort="score">Relevance</a></li>\n\t\t\t<li><a href="#" class="sort-button ' +
((__t = ( (query.sort === 'content') ? 'active' : '' )) == null ? '' : __t) +
'" data-sort="content">Type</a></li>\n\t\t</ul>\n\t</div>\n</div>\n<div id="search-results-column-wrapper">\n\t';
 if (response.numFound !== 0) { ;
__p += '\n\t<div id="search-results">\n\t\t<div id="search-results-content">\n\t\t\t';
 _.each(results, function(group) { var first = true;;
__p += '\n\t\t\t\t<div class="result-section">\n\t\t\t\t\t';
 _.each(group, function(result) { ;
__p += '\n\t\t\t\t\t';
 if (first) { ;
__p += '\n\t\t\t\t\t<div class="result-title">' +
((__t = ( result.get('label') )) == null ? '' : __t) +
'</div>\n\t\t\t\t\t';
 first = false; } ;
__p += '\n\t\t\t\t\t<div class="search-result" data-id="' +
((__t = ( result.get('id') )) == null ? '' : __t) +
'">\n\t\t\t\t\t\t<div class="result-content">\n\t\t\t\t\t\t\t<div class="result-type ' +
((__t = ( result.get('bundle') )) == null ? '' : __t) +
'">' +
((__t = ( result.get('bundle') )) == null ? '' : __t) +
'</div>\n\t\t\t\t\t\t\t<div class="result-body">\n\t\t\t\t\t\t\t';
 if (_.isEmpty(result.get('teaser'))) { ;
__p += '\n\t\t\t\t\t\t\t\t&nbsp;\n\t\t\t\t\t\t\t';
 } else { ;
__p += '\n\t\t\t\t\t\t\t' +
((__t = ( result.get('teaser') )) == null ? '' : __t) +
'\n\t\t\t\t\t\t\t';
 } ;
__p += '\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t';
 }); ;
__p += '\n\t\t\t\t</div>\n\t\t\t';
 }); ;
__p += '\n\t\t</div>\n\t</div>\n\t';
 } else { ;
__p += '\n\tNo results found.\n\t';
 } ;
__p += '\n\t<div id="facet-by-section">\n\t\t<div class="section-title">Filter by section</div>\n\t\t<div id="facet-sections-container">\n\t\t\t<ul id="facet-sections">\n\t\t\t\t';
 _.each(response.facets, function(facet) { ;
__p += '\n\t\t\t\t\t<li class="facet-section">\n\t\t\t\t\t\t<a href="#" data-filter="section:' +
((__t = ( facet.section_id )) == null ? '' : __t) +
'" class="facet">' +
((__t = ( facet.section )) == null ? '' : __t) +
'</a> \n\t\t\t\t\t\t(' +
((__t = ( facet.count )) == null ? '' : __t) +
')\n\t\t\t\t\t</li>\n\t\t\t\t';
 }); ;
__p += '\n\t\t\t</ul>\n\t\t</div>\n\t</div>\n</div>\n';
 } ;


}
return __p
};

OsciTk.templates['search'] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __d = obj.obj || obj;
__p += '<h3>Search</h3>\n<div id="search-container">\n\t<form id="search-form" name="search-form" method="POST">\n\t\t<div id="search-box">\n\t\t\t<input type="text" name="keyword" id="search-keyword" placeholder="Search" value="' +
((__t = ( obj.query.keyword )) == null ? '' : __t) +
'"/>\n\t\t\t<div id="search-submit"></div>\n\t\t\t<input type="hidden" name="page" id="search-page" />\n\t\t</div>\n\t\t<div id="search-filters-container">\n\t\t\t<div class="label">Filter |</div>\n\t\t\t<ul class="search-filters">\n\t\t\t\t<li class="filter" data-filter="type:content" id="search-filter-content"><div class="dot">&nbsp;</div><div class="label">Content</div></li>\n\t\t\t\t<li class="filter" data-filter="type:notes" id="search-filter-notes"><div class="dot">&nbsp;</div><div class="label">My Notes</div></li>\n\t\t\t\t<li class="filter" data-filter="type:footnotes" id="search-filter-footnotes"><div class="dot">&nbsp;</div><div class="label">Footnotes</div></li>\n\t\t\t\t<li class="filter" data-filter="type:figures" id="search-filter-figures"><div class="dot">&nbsp;</div><div class="label">Figures</div></li>\n\t\t\t</ul>\n\t\t\t<div class="search-filter-select">\n\t\t\t\t<select class="search-filters">\n\t\t\t\t\t<option>Select a filter</option>\n\t\t\t\t\t<option value="type:content">Content</option>\n\t\t\t\t\t<option value="type:notes">My Notes</option>\n\t\t\t\t\t<option value="type:footnotes">Footnotes</option>\n\t\t\t\t\t<option value="type:figures">Figures</option>\n\t\t\t\t</select>\n\t\t\t</div>\n\t\t</div>\n\t</form>\n\t<div id="search-results-container"></div>\n</div>';
return __p
};

OsciTk.templates['title'] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __d = obj.obj || obj;
__p += '<h1 id="publication-title"></h1>';
return __p
};

OsciTk.templates['toc'] = function(obj) {
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

OsciTk.templates['toolbar-item'] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __d = obj.obj || obj;
__p +=
((__t = ( obj.text )) == null ? '' : __t);
return __p
};

OsciTk.templates['toolbar'] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __d = obj.obj || obj;
__p += '<div id="toolbar-close">Close</div>\n<div id="toolbar-title-container">\n\t<h2 id="toolbar-title"></h2>\n</div>\n<div id="toolbar-content-container">\n\t<div id="toolbar-content"></div>\n</div>\n<div id="toolbar-handle"></div>';
return __p
}