OsciTk.templates['account-login'] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<h3>Login</h3>\n<div class="form-error"></div>\n<form id="account-form">\n\t<label for="username">Username:</label>\n\t<input type="text" id="username" placeholder="Username" />\n\t<label for="password">Password:</label>\n\t<input type="password" id="password" placeholder="Password" />\n\t<button type="button" class="login">Log In</button>\n\t<div><a href="#" class="register">Register an account</a></div>\n</form>';
}
return __p;
}
OsciTk.templates['account-profile'] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<h3>Profile</h3>\n<h4>'+
( username )+
'</h4>\n<h5>'+
( email )+
'</h5>\n<div><a href="#" class="logout">Log out</a></div>';
}
return __p;
}
OsciTk.templates['account-register'] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<h2>Register</h2>\n<div class="form-error"></div>\n<form id="account-form">\n\t<label for="username">Username:</label>\n\t<input type="text" id="username" placeholder="Username" />\n\t<label for="password">Password:</label>\n\t<input type="password" id="password" placeholder="Password" />\n\t<label for="email">Email:</label>\n\t<input type="text" id="email" placeholder="Email" />\n\t<button type="button" class="register">Register</button>\n\t<div><a href="#" class="login">Already have an account?</a></div>\n</form>';
}
return __p;
}
OsciTk.templates['citation'] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class="citations">\n\t<span>Format</span>\n\t<ul class="formats">\n\t\t<li class="active"><a href="#citation-format-chicago">Chicago</a></li>\n\t\t<li><a href="#citation-format-mla">MLA</a></li>\n\t</ul>\n\t<div id="citation-format-chicago" class="citation">\n\t\t'+
( creator )+
', "<em>'+
( title )+
'</em>," in <em>'+
( publicationTitle )+
'</em>, ed. '+
( editor )+
' '+
( publisher )+
' '+
( formattedDate )+
', para '+
( paragraphNumber )+
'.\n\t</div>\n\t<div id="citation-format-mla" style="display: none;" class="citation">\n\t\t'+
( creator )+
', "<em>'+
( title )+
'</em>," in <span style="text-decoration:underline;">'+
( publicationTitle )+
'</span>, ed. '+
( editor )+
' ('+
( publisher )+
'), '+
( formattedDate )+
', '+
( paragraphNumber )+
'.\n\t</div>\n</div>\n<div class="citation_url">\n\t<span>Citation URL</span>\n\t<input disabled="disabled" value="'+
( url )+
'" />\n</div>\n<div class="reference_text">\n\t<span>Reference Text</span>\n\t<textarea disabled="disabled">'+
( referenceText )+
'</textarea>\n</div>';
}
return __p;
}
OsciTk.templates['figure-reference'] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<a href="#'+
( id )+
'" class="figure_reference">'+
( title )+
'</a>';
}
return __p;
}
OsciTk.templates['figures'] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class=\'figure-browser\'>\n\t<h3>Figures</h3>\n\t<div class=\'figure-tray\'>\n\t\t<div class=\'figure-reel\'>\n\t\t\t';
 _.each(figures, function(figure) { 
;__p+='\n\t\t\t\t<figure class=\'thumbnail\' data-figure-id="'+
( figure.id )+
'">\n\t\t\t\t\t';
 if (figure.thumbnail_url != undefined) { 
;__p+='\n\t\t\t\t\t\t<img class=\'figure-thumbnail\' src=\''+
( figure.thumbnail_url )+
'\'/>\n\t\t\t\t\t';
 } else { 
;__p+='\n\t\t\t\t\t\t<div class=\'figure-thumbnail\'>&nbsp;</div>\n\t\t\t\t\t';
 } 
;__p+='\n\t\t\t\t\t<figcaption>'+
( figure.title )+
'</figcaption>\n\t\t\t\t</figure>\n\t\t\t';
 }); 
;__p+='\n\t\t</div>\n\t</div>\n</div>\n<div class=\'figure-previews\'>\n\t<div class=\'figure-nav prev\' title=\'Previous figure\'>&lt;</div>\n\t<div class=\'figure-nav next\' title=\'Next Figure\'>&gt;</div>\n\n\t<h3><span class=\'back-to-grid\'>&laquo; Figures</span> | <span class=\'title\'>TITLE</span></h3>\n\t<div class=\'figure-tray\'>\n\t\t<div class=\'figure-reel\'>\n\t\t\t';
 _.each(figures, function(figure) { 
;__p+='\n\t\t\t\t<figure class=\'preview\' data-figure-id="'+
( figure.id )+
'">\n\t\t\t\t\t';
 if (figure.thumbnail_url != undefined) { 
;__p+='\n\t\t\t\t\t\t<img class=\'figure-preview\' src=\''+
( figure.thumbnail_url )+
'\'/>\n\t\t\t\t\t';
 } else { 
;__p+='\n\t\t\t\t\t\t<div class=\'figure-preview\'>&nbsp;</div>\n\t\t\t\t\t';
 } 
;__p+='\n\t\t\t\t\t<div class=\'figure-info\'>\n\t\t\t\t\t\t<!--<h3 class=\'title\'>Figure Title?</h3>-->\n\t\t\t\t\t\t<!--<p class=\'meta-info\'>meta info | more meta</p>-->\n\t\t\t\t\t\t<div class=\'caption\'>\n\t\t\t\t\t\t\t'+
( figure.caption )+
'\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<a class=\'view-fullscreen\'>View fullscreen</a>\n\t\t\t\t\t<a class=\'view-in-context\'>View in context</a>\n\t\t\t\t</figure>\n\t\t\t';
 }); 
;__p+='\n\t\t</div>\n\t</div>\n</div>';
}
return __p;
}
OsciTk.templates['font'] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<h3>Reading Settings</h3>\n<div class="font-control">\n\t<h3>Font Size</h3>\n\t<a href="#font-larger" class="larger font-button">A</a>\n\t<a href="#font-smaller" class="smaller font-button">A</a>\n</div>\n<div class="theme-control">\n\t<h3>Theme</h3>\n\t<a href="#normal" class="theme-button">Normal</a>\n\t<a href="#sepia" class="theme-button">Sepia</a>\n\t<a href="#night" class="theme-button">Night</a>\n</div>';
}
return __p;
}
OsciTk.templates['multi-column-column'] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class="column"></div>';
}
return __p;
}
OsciTk.templates['multi-column-figure'] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class="figure_content"></div>\n<figcaption>'+
( caption )+
'</figcaption>';
}
return __p;
}
OsciTk.templates['multi-column-section'] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div id="pages"></div>';
}
return __p;
}
OsciTk.templates['navigation'] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class=\'header\'>'+
( chapter )+
'</div>\n<div class=\'prev-page side\'><div class=\'indicator\'>&lt;</div></div>\n<div class=\'next-page side\'><div class=\'indicator\'>&gt;</div></div>\n<div class=\'prev-page corner\'>\n\t<div class=\'label\'>Previous</div>\n\t<div class=\'button\'>&nbsp;</div>\n</div>\n<div class=\'pager\'><div class=\'head\'>&nbsp;</div></div>\n<div class=\'next-page corner\'>\n\t<div class=\'label\'>Next</div>\n\t<div class=\'button\'>&nbsp;</div>\n</div>';
}
return __p;
}
OsciTk.templates['note-popup'] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<form class="noteForm">\n\t<textarea>'+
( note )+
'</textarea>\n\t<div class="status">Saved</div>\n</form>\n<div class="reference-text">\n\t<span class="reference-text-label">Reference Text</span>\n\t<div class="reference-text-content">'+
( referenceContent )+
'</div>\n</div>';
}
return __p;
}
OsciTk.templates['notes'] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<h3>Notes</h3>\n<div class="notesReel">\n\t<ul class="notesList">\n\t\t';
 _.each(notes, function(note) { 
;__p+='\n\t\t\t<li class="notesListItem">\n\t\t\t\t<div class="the-note">\n\t\t\t\t\t<span class="note-content">'+
( note.get('note') )+
'</span>\n\t\t\t\t</div>\n\t\t\t\t';
 if (note.get('tags').length > 0) { 
;__p+='\n\t\t\t\t\t<div class="note-tags">\n\t                \t<span class="tags-label">tags:</span> ';
 _.each(note.get('tags'), function(tag) { 
;__p+=''+
( tag )+
' ';
 }); 
;__p+='\n\t                </div>\n\t\t\t\t';
 } 
;__p+='\n\t\t\t\t<div class="note-buttons">\n\t\t\t\t\t<a href="#" class="noteLink" data-content_id="'+
( note.get('content_id') )+
'">Link</a>\n\t\t\t\t\t<!-- <a href="#" class="noteEdit" data-content_id="'+
( note.get('content_id') )+
'">Edit</a> -->\n\t\t\t\t</div>\n\t\t\t</li>\n\t\t';
 }); 
;__p+='\n\t</ul>\n</div>';
}
return __p;
}
OsciTk.templates['page'] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+=''+
( content )+
'';
}
return __p;
}
OsciTk.templates['search-results'] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='';
 if (query.keyword) { 
;__p+='\n<div id="search-results-header">\n\t<div id="search-summary">\n\t\tResult(s) for <span id="search-query">"'+
( query.keyword )+
'"</span> ('+
( response.numFound )+
')\n\t\t<a id="reset-search" href="#">RESET</a>\n\t</div>\n\t<div id="results-sort">\n\t\tSort By:\n\t\t<ul>\n\t\t\t<li id="results-sort-relevance" class="sort-button"><a href="#" class="sort-button">Relevance</a></li>\n\t\t\t<li id="results-sort-type"><a href="#" class="sort-button">Type</a></li>\n\t\t</ul>\n\t</div>\n</div>\n<div id="search-results-container">\n\t<div id="search-results">\n\t\t<div id="search-results-content">\n\t\t\t';
 _.each(results, function(group) { var first = true;
;__p+='\n\t\t\t\t<div class="result-section">\n\t\t\t\t\t';
 _.each(group, function(result) { 
;__p+='\n\t\t\t\t\t';
 if (first) { 
;__p+='\n\t\t\t\t\t<div class="result-title">'+
( result.get('label') )+
'</div>\n\t\t\t\t\t';
 first = false; } 
;__p+='\n\t\t\t\t\t<div class="search-result" data-id="'+
( result.get('id') )+
'">\n\t\t\t\t\t\t<div class="result-content">\n\t\t\t\t\t\t\t<div class="result-type '+
( result.get('bundle') )+
'">'+
( result.get('bundle') )+
'</div>\n\t\t\t\t\t\t\t<div class="result-body">'+
( result.get('teaser') )+
'</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t';
 }); 
;__p+='\n\t\t\t\t</div>\n\t\t\t';
 }); 
;__p+='\n\t\t</div>\n\t</div>\n\t<div id="filter-by-section">\n\t\t<div class="section-title">Filter by section</div>\n\t\t<ul>\n\t\t\t';
 _.each(response.facets, function(facet) { 
;__p+='\n\t\t\t\t<li><a href="#" data-filter="section:'+
( facet.section_id )+
'" class="facet">'+
( facet.section )+
'</a> ('+
( facet.count )+
')</li>\n\t\t\t';
 }); 
;__p+='\n\t\t</ul>\n\t</div>\n</div>\n';
 } 
;__p+='';
}
return __p;
}
OsciTk.templates['search'] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div id="search-header">\n\t<h3>Search</h3>\n\t<div id="search-box">\n\t\t<form id="search-form" name="search-form" method="POST">\n\t\t\t<input type="text" name="keyword" id="search-keyword" placeholder="search" value="'+
( query.keyword )+
'"/>\n\t\t\t<input type="hidden" name="page" id="search-page" />\n\t\t</form>\n\t</div>\n\t<div id="search-filters">\n\t\t<div class="label">Filter |</div>\n\t\t<ul>\n\t\t\t<li class="filter" data-filter="type:content" id="search-filter-content"><div class="dot">&nbsp;</div><div class="label">Content</div></li>\n\t\t\t<li class="filter" data-filter="type:notes" id="search-filter-notes"><div class="dot">&nbsp;</div><div class="label">My Notes</div></li>\n\t\t\t<li class="filter" data-filter="type:footnotes" id="search-filter-footnotes"><div class="dot">&nbsp;</div><div class="label">Footnotes</div></li>\n\t\t\t<li class="filter" data-filter="type:figures" id="search-filter-figures"><div class="dot">&nbsp;</div><div class="label">Figures</div></li>\n\t\t</ul>\n\t</div>\n</div>\n<div id="search-results-wrapper"></div>';
}
return __p;
}
OsciTk.templates['title'] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<h1 id="publication-title"></h1>';
}
return __p;
}
OsciTk.templates['toc'] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<h3>Table of Contents</h3>\n<ul>\n\t';
 _.each(items, function(item) { 
;__p+='\n\t\t<li class="toc-item';
 if (item.id === app.views.navigationView.currentNavigationItem.id) { print(" active"); } 
;__p+='">\n\t\t\t<a data-section-id="'+
( item.id )+
'" href="#">\n\t\t\t\t<div class="toc-item-thumbnail">\n\t\t\t\t\t';
 if (item.get('thumbnail')) { 
;__p+='\n\t\t\t\t\t\t<img src="'+
( item.get('thumbnail') )+
'">\n\t\t\t\t\t';
 } 
;__p+='\n\t\t\t\t</div>\n\t\t\t\t<div class="toc-item-text">\n\t\t\t\t\t<h4>'+
( item.get('title') )+
'</h4>\n\t\t\t\t\t';
 if (item.get('subtitle')) { 
;__p+='\n\t\t\t\t\t\t<h5>'+
( item.get('subtitle') )+
'</h5>\n\t\t\t\t\t';
 } 
;__p+='\n\t\t\t\t</div>\n\t\t\t</a>\n\t\t\t<hr>\n\t\t</li>\n\t';
 }); 
;__p+='\n</ul>';
}
return __p;
}
OsciTk.templates['toolbar-item'] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+=''+
( text )+
'';
}
return __p;
}
OsciTk.templates['toolbar'] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div id="toolbar-close">Close</div>\n<div id="toolbar-title-container">\n\t<h2 id="toolbar-title"></h2>\n</div>\n<div id="toolbar-content-container">\n\t<div id="toolbar-content"></div>\n</div>\n<div id="toolbar-handle"></div>';
}
return __p;
}