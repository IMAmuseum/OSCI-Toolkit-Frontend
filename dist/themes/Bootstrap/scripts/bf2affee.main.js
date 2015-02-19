function loadXMLDoc(a){var b=new XMLHttpRequest;return b.overrideMimeType&&b.overrideMimeType("text/xml"),b.open("GET",a,!1),b.send(),b.responseXML}function loadHTMLDoc(a){var b=new XMLHttpRequest;b.overrideMimeType&&b.overrideMimeType("text/html"),b.open("GET",a,!1),b.send();var c=b.responseText;return c=c.replace('xmlns="http://www.w3.org/1999/xhtml"',""),c=c.replace('xmlns:epub="http://www.idpf.org/2007/ops"',"")}function xmlToJson(a,b){var c=0;if(!b)for(b=["xml:"],c=0;c<a.documentElement.attributes.length;c++)-1!=a.documentElement.attributes.item(c).nodeName.indexOf("xmlns")&&b.push(a.documentElement.attributes.item(c).nodeName.replace("xmlns:","")+":");var d=!0;if(a.attributes&&a.attributes.length>0){var e;d={};for(var f=0;f<a.attributes.length;f++)e=a.attributes.item(f),d[e.nodeName.replaceArray(b,"").toCamel()]=e.value}if(a.hasChildNodes()){var g,h,i;d===!0&&(d={});for(var j=0;j<a.childNodes.length;j++)i=a.childNodes.item(j),1===(7&i.nodeType)?(g=i.nodeName.replaceArray(b,"").toCamel(),h=xmlToJson(i,b),d.hasOwnProperty(g)?(d[g].constructor!==Array&&(d[g]=[d[g]]),d[g].push(h)):d[g]=h):3===(i.nodeType-1|1)&&(g="value",h=3===i.nodeType?i.nodeValue.replace(/^\s+|\s+$/g,""):i.nodeValue,d.hasOwnProperty(g)?d[g]+=h:(4===i.nodeType||""!==h)&&(d[g]=h))}return d}function objectToArray(a){return void 0!==a?"[object Array]"!==Object.prototype.toString.call(a)?[a]:a:void 0}OsciTk={},OsciTk.collections={},OsciTk.models={},OsciTk.templates={},OsciTk.views={figureTypeRegistry:{}},OsciTk.router=Backbone.Router.extend({routes:{"":"routeToSection","section/:section_id":"routeToSection","section/:section_id/:identifier":"routeToSection"},initialize:function(){this.on("all",this._trackPageView)},routeToSection:function(a,b){Backbone.trigger("routedToSection",{section_id:a,identifier:b})},_trackPageView:function(){var a=Backbone.history.getFragment();_.isUndefined(window._gaq)||_gaq.push(["_trackPageview","/#"+a])}}),String.prototype.replaceArray=function(a,b){for(var c=this,d=0;d<a.length;d++)c=c.replace(a[d],b);return c},String.prototype.toCamel=function(){return this.replace(/\s(.)/g,function(a){return a.toUpperCase()}).replace(/\s/g,"").replace(/^(.)/,function(a){return a.toLowerCase()})},OsciTk.templateManager={get:function(a){return function(b){return OsciTk.templateManager.useTemplate(a,b)}},useTemplate:function(a,b){if(void 0===OsciTk.templates[a])for(var c=app.config.get("templateUrls"),d=!1,e=c.length,f=0;e>f&&($.ajax({async:!1,dataType:"html",url:c[f]+a+".tpl.html",success:function(b){OsciTk.templates[a]=_.template(b),d=!0}}),!d);f++);return OsciTk.templates[a](b)}},OsciTk.models.BaseModel=Backbone.Model.extend(),OsciTk.models.Config=OsciTk.models.BaseModel.extend({}),OsciTk.models.Package=OsciTk.models.BaseModel.extend({defaults:function(){return{url:null,lang:null,spine:null,manifest:null,metadata:null,id:null,version:null,xmlns:null}},initialize:function(){var a=xmlToJson(loadXMLDoc(this.get("url")));this.set("lang",a["package"].lang),this.set("spine",a["package"].spine),this.set("manifest",a["package"].manifest),this.set("metadata",a["package"].metadata);var b=a["package"].metadata["dc:identifier"];_.isArray(b)||(b=[b]);for(var c=b.length,d=0;c>d;d++){var e=b[d];if(e.value.indexOf("urn:osci_tk_identifier:")!==!1){this.set("id",e.value.substr(23));break}}this.set("version",a["package"].version),this.set("xmlns",a["package"].xmlns),Backbone.trigger("packageLoaded",this)},sync:function(){},getTitle:function(){var a,b=this.get("metadata");return b["dc:title"]&&b["dc:title"].value&&(a=b["dc:title"].value),a},getPubId:function(){var a,b=this.get("metadata");if(!_.isUndefined(b["dc:identifier"]))if(_.isArray(b["dc:identifier"])){var c=_.find(b["dc:identifier"],function(a){return"publication-id"===a.id?!0:!1});c&&(a=c.value.split(":"))}else a=b["dc:identifier"].value.split(":");return a[2]}}),OsciTk.models.Figure=OsciTk.models.BaseModel.extend({defaults:function(){return{section_id:null,delta:null,caption:null,position:null,columns:null,aspect:0,body:null,options:{},plate:!1}},initialize:function(){this.parsePositionData(),this.set("content",$.trim(this.get("content")))},parsePositionData:function(){var a,b=this.get("position");return("plate"===b||"platefull"===b)&&(this.set("plate",!0),"plate"===b?b="p":"platefull"===b&&(b="ff")),a=2==b.length?{vertical:b[0],horizontal:b[1]}:"n"===b||"p"===b?{vertical:b,horizontal:b}:{vertical:b,horizontal:"na"},this.set("position",a),this}}),OsciTk.models.Footnote=OsciTk.models.BaseModel.extend({defaults:function(){return{body:"",section_id:"",delta:""}},sync:function(){}}),OsciTk.models.NavigationItem=OsciTk.models.BaseModel.extend({defaults:function(){return{title:null,subtitle:null,uri:null,parent:null,next:null,previous:null,depth:0,thumbnail:null,timestamp:null}}}),OsciTk.models.Account=OsciTk.models.BaseModel.extend({defaults:{username:"anonymous",id:0},initialize:function(){this.getSessionState()},sync:function(){},getSessionState:function(){var a=this;$.ajax({url:app.config.get("endpoints").OsciTkAccount,data:{action:"status"},type:"POST",dataType:"json",success:function(b){b.success===!0&&a.set(b.user)}})}}),OsciTk.models.Page=OsciTk.models.BaseModel.extend({defaults:function(){return{content:{},pageNumber:0}},addContent:function(a){var b=this.get("content"),c=$(a[0]).data("osci_content_id");return void 0===c&&(c=$(a[0]).attr("id")),void 0===c?(c="content",b[c]=void 0===b[c]?a.html():b[c]+a.html()):b[c]=a[0],this},removeContentAt:function(a){var b=this.get("content");return delete b[a],this},removeAllContent:function(){this.set("content",{})},contentLength:function(){return this.get("content").length},getContent:function(a){return this.get("content")[a]}}),OsciTk.models.Section=OsciTk.models.BaseModel.extend({defaults:function(){return{title:null,content:null,uri:null,media_type:"application/xhtml+xml",contentLoaded:!1,pages:null}},initialize:function(){pages=new OsciTk.collections.Pages},loadContent:function(){var a=null;if(this.get("contentLoaded")===!1){var b=loadHTMLDoc(this.get("uri")),c=[],d=/body([^>]*)class=(["']+)([^"']*)(["']+)/gi.exec(b.substring(b.indexOf("<body"),b.indexOf("</body>")+7));_.isArray(d)&&!_.isUndefined(d[3])&&(c=d[3].split(" ")),a=$("<div />").html(b),this.set("title",a.find("title").html()),this.set("content",a),this.set("contentLoaded",!0),this.set("classes",c)}null===a&&(a=$(this.get("content")));var e=a.find("section#footnotes"),f=a.find("figure");Backbone.trigger("footnotesAvailable",e),Backbone.trigger("figuresAvailable",f),Backbone.trigger("sectionLoaded",this)},removeAllPages:function(){this.set("pages",new OsciTk.collections.Pages)}}),OsciTk.collections.BaseCollection=Backbone.Collection.extend(),OsciTk.collections.Figures=OsciTk.collections.BaseCollection.extend({model:OsciTk.models.Figure,initialize:function(){this.listenTo(Backbone,"figuresAvailable",function(a){this.populateFromMarkup(a),Backbone.trigger("figuresLoaded",this)})},comparator:function(a){return a.get("delta")},populateFromMarkup:function(a){var b=[];_.each(a,function(a){var c=a.id.match(/\w+-(\d+)-(\d+)/),d=$(a),e={id:a.id,rawData:a,body:a.innerHTML,section_id:c[1],delta:c[2],title:d.attr("title"),caption:d.find("figcaption").html(),content:d.find(".figure_content").html(),position:d.data("position"),columns:d.data("columns"),options:d.data("options"),thumbnail_url:void 0,type:d.data("figure_type"),aspect:d.data("aspect"),order:d.data("order"),count:d.data("count")};if(e.options.previewUri)e.thumbnail_url=e.options.previewUri,e.preview_url=e.options.previewUri;else{var f=d.children("img.thumbnail").remove();if(f.length)e.thumbnail_url=f.attr("src"),e.preview_url=f.attr("src");else{var g=$(".figure_content img",a);g.length&&(e.thumbnail_url=g.attr("src"),e.preview_url=g.attr("src"))}}b.push(e)},this),this.reset(b)}}),OsciTk.collections.NavigationItems=OsciTk.collections.BaseCollection.extend({model:OsciTk.models.NavigationItem,currentNavigationItem:null,initialize:function(){this.listenTo(Backbone,"packageLoaded",function(a){var b=_.find(a.get("manifest").item,function(a){return"nav"==a.properties});if(b){for(var c=xmlToJson(loadXMLDoc(b.href)),d=c.html.body.nav,e=0,f=d.length;f>e;e++)if("toc"==d[e].type){var g=d[e].ol;this.parseChildren(g,null,0);break}Backbone.trigger("navigationLoaded",this)}})},parseChildren:function(a,b,c){_.isArray(a)===!1&&(a=[a]);for(var d=0,e=a.length;e>d;d++){var f=a[d];if(f.a){var g={id:f.a["data-section_id"],parent:b,depth:c,previous:this.at(this.length-1)||null,next:null,length:f.a["data-length"]||null,title:f.a.value,subtitle:f.a["data-subtitle"],thumbnail:f.a["data-thumbnail"],timestamp:f.a["data-timestamp"],uri:f.a.href};this.add(g);var h=this.at(this.length-1);if(null!==h.get("previous")&&h.get("previous").set("next",h),f.ol&&f.ol.li){var i;i=f.ol.li.length?f.ol.li:[f.ol.li];for(var j=c+1,k=0,l=i.length;l>k;k++)this.parseChildren(i[k],h,j)}}f.li&&this.parseChildren(f.li,b,c)}}}),OsciTk.collections.Footnotes=OsciTk.collections.BaseCollection.extend({model:OsciTk.models.Footnote,initialize:function(){this.listenTo(Backbone,"footnotesAvailable",function(a){this.populateFromMarkup(a),Backbone.trigger("footnotesLoaded",this)})},populateFromMarkup:function(a){this.reset();for(var b=a.find("aside"),c=b.length,d=[],e=0;c>e;e++){var f=b[e],g=f.id.match(/\w+-(\d+)-(\d+)/);d.push({id:f.id,rawData:f,body:f.innerHTML,section_id:g[1],delta:g[2],index:f.getAttribute("data-footnote_index")})}this.reset(d)}}),OsciTk.collections.Pages=OsciTk.collections.BaseCollection.extend({model:OsciTk.models.Page,initialize:function(){}}),OsciTk.views.BaseView=Backbone.View.extend({getChildViews:function(){return this.childViews||(this.childViews=[]),this.childViews},addView:function(a,b){return a.parent=this,"undefined"==typeof b?this.$el.append(a.el):this.$el.find(b).append(a.el),this._addViewReference(a),this},removeAllChildViews:function(){if(this.childViews){for(var a=0,b=this.childViews.length;b>a;a++)this.childViews[a].close();this.childViews=[]}return this},removeView:function(a,b){if(this.childViews)for(var c=0,d=this.childViews.length;d>c;c++)if(a.cid===this.childViews[c].cid){this.childViews.splice(c,1),a.$el.detach(),(b||void 0===b)&&a.close();break}return this},getChildViewById:function(a){var b;if(this.childViews)for(var c=0,d=this.childViews.length;d>c;c++)if(a===this.childViews[c].cid){b=this.childViews[c];break}return b},getChildViewByIndex:function(a){var b;return this.childViews&&this.childViews[a]&&(b=this.childViews[a]),b},getChildViewsByType:function(a){return _.filter(this.childViews,function(b){return b.$el.is(a)})},replaceView:function(a,b){return a.parent=this,"undefined"==typeof b?this.$el.html(a.el):this.$el.find(b).html(a.el),this._addViewReference(a),this},changeModel:function(a){return this.model=a,this},close:function(){this.removeAllChildViews(),this.remove(),this.unbind(),this.undelegateEvents(),this.onClose&&this.onClose()},_addViewReference:function(a){this.childViews||(this.childViews=[]);for(var b=!1,c=0,d=this.childViews.length;d>c;c++)if(a.cid===this.childViews[c].cid){b=!0;break}b||this.childViews.push(a)}}),OsciTk.views.App=OsciTk.views.BaseView.extend({id:"reader",template:OsciTk.templateManager.get("app"),initialize:function(){this.render(),app.toolbarItems=app.config.get("toolbarItems")?app.config.get("toolbarItems"):[],app.views={titleView:new OsciTk.views.Title,headerView:new OsciTk.views.Header,fontSizeView:new OsciTk.views.FontSize,fontStyleView:new OsciTk.views.FontStyle,tocView:new OsciTk.views.Toc,accountView:new OsciTk.views.Account,toolbarView:new OsciTk.views.Toolbar,sectionView:new OsciTk.views.Section,figuresView:new OsciTk.views.Figures,navigationView:new OsciTk.views.Navigation,footnotesView:new OsciTk.views.Footnotes},this.addView(app.views.headerView,"#header"),this.addView(app.views.toolbarView,"#toolbar"),this.addView(app.views.sectionView,"#section"),this.addView(app.views.figuresView,"#figures"),this.addView(app.views.navigationView,"#navigation"),this.listenTo(Backbone,"toolbarItemClicked",function(a){this.toolbarAction(a)})},render:function(){this.$el.html(this.template),$("body").append(this.el)},toolbarAction:function(a){if(this.toolbarToggle(a),!a.active){var b=_.pick(app.views,a.item.view);b=b[a.item.view],this.addView(b,"#"+a.item.text)}},toolbarToggle:function(){_.each(app.toolbarItems,function(a){var b=_.pick(app.views,a.view);b=b[a.view],this.removeView(b,!1)},this)}}),OsciTk.views.Section=OsciTk.views.BaseView.extend({id:"section-view",initialize:function(a){this.options=a?a:{},_.defaults(this.options,{pageView:"Page"}),this.listenTo(Backbone,"currentNavigationItemChanged",function(a){var b=this;$("#section-view").empty(),$(".header-view").empty(),$("#loader").show(),$("#loader").fadeTo(500,.7,function(){a&&(app.models.section=new OsciTk.models.Section({uri:a.get("uri"),id:a.get("id")}),app.models.section.loadContent(),b.changeModel(app.models.section),b.render()),$("#loader").hide()})})},render:function(){return this.model.removeAllPages(),this.removeAllChildViews(),Backbone.trigger("layoutStart"),this.renderContent(),Backbone.trigger("layoutComplete",{numPages:this.model.get("pages").length}),this},getPageForProcessing:function(a,b){var c;if(void 0!==a)c=this.getChildViewById(a);else if(c=_.filter(this.getChildViews(),function(a){return a.isPageComplete()===!1}),0===c.length){var d=this.model.get("pages");d.add({pageNumber:this.model.get("pages").length+1}),c=new OsciTk.views[this.options.pageView]({model:d.last(),pageNumber:this.model.get("pages").length}),this.addView(c,b)}else c=c.pop();return c},renderContent:function(){var a=this.getPageForProcessing();a.addContent($(this.model.get("content"))),a.render(),a.processingComplete()}}),OsciTk.views.Page=OsciTk.views.BaseView.extend({template:OsciTk.templateManager.get("page"),className:"page",initialize:function(a){this.options=a,this.processingData={complete:!1},this.$el.addClass("page-num-"+this.model.collection.length).attr("data-page_num",this.model.collection.length)},render:function(){return this.$el.html(this.template(this.model.toJSON())),this},processingComplete:function(){return this.processingData.complete=!0,this},addContent:function(a){return this.model.addContent(a),this},removeContent:function(a){return this.model.removeContent(a),this},getContentById:function(a){return this.model.getContent(a)},hasContent:function(){return this.model.contentLength()?!0:!1},isPageComplete:function(){return this.processingData.complete},removeAllContent:function(){return this.model.removeAllContent(),this},containsElementId:function(a){return 0!==this.$el.find("#"+a).length}}),OsciTk.views.Title=OsciTk.views.BaseView.extend({className:"title-view",template:OsciTk.templateManager.get("title"),initialize:function(){this.listenTo(Backbone,"packageLoaded",function(a){var b=a.getTitle();b&&this.$el.find("#publication-title").text(b)}),this.render()},render:function(){return this.$el.html(this.template()),this},events:{"click #publication-title":function(a){a.preventDefault();var b=app.collections.navigationItems.models[0].id;app.router.navigate("section/"+b,{trigger:!0})}}}),OsciTk.views.Toolbar=OsciTk.views.BaseView.extend({id:"toolbar-view",template:OsciTk.templateManager.get("toolbar"),initialize:function(){this.activeToolbarItemView=void 0,this.render(),this.listenTo(Backbone,"packageLoaded",function(a){var b=a.getTitle();b&&this.$el.find("#toolbar-title").text(b)})},render:function(){this.$el.html(this.template()),_.each(app.toolbarItems,function(a){var b=new OsciTk.views.ToolbarItem({toolbarItem:a});this.addView(b,"#toolbar-area"),b.render()},this)}}),OsciTk.views.ToolbarItem=OsciTk.views.BaseView.extend({tagName:"li",className:"toolbar-item-view",template:OsciTk.templateManager.get("toolbar-item"),initialize:function(a){this.options=a,this.$el.addClass(this.options.toolbarItem.view+"-toolbar-item")},events:{click:"itemClicked",touch:"itemClicked"},render:function(){return this.$el.html(this.template({text:'<a href="#">'+this.options.toolbarItem.text+"</a>"})),this},itemClicked:function(a){a.preventDefault(),a.stopPropagation(),this.e=a,this.view=app.views.toolbarView,this.$target=$(a.target),this.active=this.$target.hasClass("active"),this.$target.toggleClass("active"),this.$targetCheck=$(a.currentTarget),_.each(app.toolbarItems,function(a){0==this.$targetCheck.hasClass(a.view+"-toolbar-item")&&this.view.$el.find("li."+a.view+"-toolbar-item>a").removeClass("active")},this),Backbone.trigger("toolbarItemClicked",{item:this.options.toolbarItem,active:this.active})}}),OsciTk.views.Footnotes=OsciTk.views.BaseView.extend({id:"footnote-view",initialize:function(){this.listenTo(Backbone,"layoutComplete",function(){for(var a=app.views.sectionView.$el.find("a.footnote-reference"),b=0;b<a.length;b++){var c=$(a[b]),d=c.attr("href").slice(1),e=app.collections.footnotes.get(d),f=$(e.get("body")).text();c.attr("title",f),c.attr("data-toggle","tooltip"),c.attr("data-placement","bottom"),c.off("click"),c.bind("click",{caller:this},this.footnoteClicked),$('[data-toggle="tooltip"]').tooltip()}})},footnoteClicked:function(a){a.preventDefault(),a.stopPropagation()}}),OsciTk.views.Header=OsciTk.views.BaseView.extend({className:"header-view",template:OsciTk.templateManager.get("header"),initialize:function(){this.listenTo(Backbone,"sectionLoaded",function(a){this.sectionTitle=null,this.sectionSubtitle=null,this.sectionThumbnail=null,this.headerImage=null,this.headerImageCaption=null;var b=a.get("id");this.render(b)})},render:function(a){return _.each(app.collections.navigationItems.models,function(b){b.get("id")==a&&(this.sectionTitle=b.get("title"),this.sectionSubtitle=b.get("subtitle"),this.sectionThumbnail=b.get("thumbnail"))}),_.isEmpty(app.collections.figures.models)?(this.headerImage=null,this.headerImageCaption=null):_.each(app.collections.figures.models,function(a){1==a.get("plate")&&(this.headerImage=a.get("preview_url"),this.headerImageCaption=a.get("caption"))}),this.$el.html(this.template()),this}}),OsciTk.views.Navigation=OsciTk.views.BaseView.extend({id:"navigation-view",template:OsciTk.templateManager.get("navigation"),initialize:function(){this.numPages=null,this.identifier=null,this.currentNavigationItem=null,this.page=1,this.listenTo(Backbone,"layoutComplete",function(a){this.identifier?(Backbone.trigger("navigate",{identifier:this.identifier}),this.identifier=null):Backbone.trigger("navigate",{page:1}),this.numPages=a.numPages,this.render()}),this.listenTo(Backbone,"pageChanged",function(a){this.page=a.page,this.update(a.page)}),this.listenTo(Backbone,"routedToSection",function(a){if(this.identifier=a.identifier,a.section_id)this.setCurrentNavigationItem(a.section_id);else{var b=app.collections.navigationItems.at(0).id;this.setCurrentNavigationItem(b),app.router.navigate("section/"+b,{trigger:!1})}var c=app.models.docPackage.getTitle();c=c?c+" | ":"",c+=this.getCurrentNavigationItem().get("title"),document.title=c}),$(document).keydown(function(a){var b;switch(a.which){case 39:if(b=app.views.navigationView.page+1,b>app.views.navigationView.numPages){var c=app.views.navigationView.currentNavigationItem.get("next");c&&app.router.navigate("section/"+c.id,{trigger:!0})}else Backbone.trigger("navigate",{page:b});break;case 37:if(b=app.views.navigationView.page-1,1>b){var d=app.views.navigationView.currentNavigationItem.get("previous");d&&app.router.navigate("section/"+d.id+"/end",{trigger:!0})}else Backbone.trigger("navigate",{page:b})}})},render:function(){this.$el.html(this.template({numPages:this.numPages,chapter:this.currentNavigationItem.get("title")})),1==this.numPages?$(".pager").hide():$(".pager").show();var a=100/this.numPages;$(".pager .head",this.$el).css("width",a+"%"),$(".pager").mousedown(function(a){var b=parseInt(app.views.navigationView.numPages*a.offsetX/$(this).width(),10);Backbone.trigger("navigate",{page:b+1})}),this.update(this.page)},getCurrentNavigationItem:function(){return this.currentNavigationItem},setCurrentNavigationItem:function(a){var b=app.collections.navigationItems.get(a);this.currentNavigationItem=b?app.collections.navigationItems.get(a):app.collections.navigationItems.first(),Backbone.trigger("currentNavigationItemChanged",this.currentNavigationItem)},update:function(a){var b=100/this.numPages;if($(".pager .head",this.$el).css("left",b*(a-1)+"%"),this.$el.find(".prev-page").unbind("click"),this.$el.find(".next-page").unbind("click"),1==a){var c=this.currentNavigationItem.get("previous");c?(this.$el.find(".prev-page .label").html("Previous Section"),this.$el.find(".prev-page").removeClass("inactive").click(function(){app.router.navigate("section/"+c.id+"/end",{trigger:!0})})):(this.$el.find(".prev-page").addClass("inactive").unbind("click"),this.$el.find(".prev-page").hide())}else if(this.numPages>1){var d=this;this.$el.find(".prev-page .label").html("Previous"),this.$el.find(".prev-page").removeClass("inactive").click(function(){app.router.navigate("section/"+d.currentNavigationItem.id),Backbone.trigger("navigate",{page:a-1})})}if(a==this.numPages){var e=this.currentNavigationItem.get("next");e?(this.$el.find(".next-page .label").html("Next Section"),this.$el.find(".next-page").removeClass("inactive").click(function(){app.router.navigate("section/"+e.id,{trigger:!0})})):(this.$el.find(".next-page").addClass("inactive").unbind("click"),this.$el.find(".next-page").hide())}else this.numPages>1&&(this.$el.find(".next-page .label").html("Next"),this.$el.find(".next-page").removeClass("inactive").click(function(){Backbone.trigger("navigate",{page:a+1})}))}}),OsciTk.views.Figures=OsciTk.views.BaseView.extend({className:"figures-view",template:OsciTk.templateManager.get("figures"),initialize:function(){this.listenTo(app.collections.figures,"add remove reset",function(){this.render()})},render:function(){var a=app.collections.figures.toJSON();return _.isEmpty(a)||this.$el.html(this.template({figures:a})),this}}),OsciTk.views.Toc=OsciTk.views.BaseView.extend({className:"toc-view",template:OsciTk.templateManager.get("toc"),events:{"click li a":"itemClick"},initialize:function(){this.listenTo(Backbone,"currentNavigationItemChanged",function(){this.render()})},render:function(){return this.$el.html(this.template({items:app.collections.navigationItems.where({depth:0})})),this},itemClick:function(a){a.preventDefault();var b=$(a.currentTarget).attr("data-section-id");app.router.navigate("section/"+b,{trigger:!0})}}),OsciTk.views.Account=OsciTk.views.BaseView.extend({className:"account-view",template:null,initialize:function(){this.model=app.account,this.render()},render:function(){return this.model.get("id")>0?this.showProfile():this.showLoginForm(),this},events:{"click button.login":"login","click button.register":"register","click a.register":"showRegistrationForm","click a.login":"showLoginForm","click a.logout":"logout"},login:function(){var a=this,b=this.$el.find("#username").val(),c=this.$el.find("#password").val();$.ajax({url:app.config.get("endpoints").OsciTkAccount,data:{action:"login",username:b,password:c},type:"POST",dataType:"json",success:function(b){b.success===!0?(a.model.set(b.user),a.showProfile()):a.$el.find("div.form-error").html(b.error)}})},logout:function(){var a=this;$.ajax({url:app.config.get("endpoints").OsciTkAccount,data:{action:"logout"},type:"POST",dataType:"json",success:function(b){a.model.set(b.user),a.showLoginForm()}})},register:function(){var a=this,b=this.$el.find("#username").val(),c=this.$el.find("#password").val(),d=this.$el.find("#email").val();$.ajax({url:app.config.get("endpoints").OsciTkAccount,data:{action:"register",username:b,password:c,email:d},type:"POST",dataType:"json",success:function(b){b.success===!0?(a.model.set(b.user),a.showProfile()):a.$el.find("div.form-error").html(b.error)}})},showRegistrationForm:function(){this.template=OsciTk.templateManager.get("account-register"),this.$el.html(this.template())},showLoginForm:function(){this.template=OsciTk.templateManager.get("account-login"),this.$el.html(this.template())},showProfile:function(){this.template=OsciTk.templateManager.get("account-profile"),this.$el.html(this.template(this.model.toJSON()))}}),OsciTk.views.Font=OsciTk.views.BaseView.extend({className:"font-view",template:OsciTk.templateManager.get("font"),initialize:function(){this.currentFontSize=100,this.render()},render:function(){return this.$el.html(this.template()),this},events:{"click .font-button":"changeFontSize","click .theme-button":"changeTheme"},changeFontSize:function(a){a.preventDefault();var b=app.views.sectionView,c=$(a.target);"#font-larger"===c.attr("href")?this.currentFontSize+=25:this.currentFontSize-=25,b.$el.css({"font-size":this.currentFontSize+"%"}),Backbone.trigger("windowResized")},changeTheme:function(a){a.preventDefault();var b=$(a.target),c=b.attr("href").substr(1),d=$("body");d.removeClass("normal sepia night"),d.addClass(c)}}),OsciTk.views.FontSize=OsciTk.views.BaseView.extend({className:"font-size-view",template:OsciTk.templateManager.get("font-size"),initialize:function(){this.currentFontSize=100,this.render()},render:function(){return this.$el.html(this.template()),this},events:{"click .font-button":"changeFontSize"},changeFontSize:function(a){a.preventDefault();var b=app.views.sectionView,c=$(a.target);"#font-larger"===c.attr("href")?this.currentFontSize+=25:this.currentFontSize-=25,b.$el.css({"font-size":this.currentFontSize+"%"}),Backbone.trigger("windowResized")}}),OsciTk.views.FontStyle=OsciTk.views.BaseView.extend({className:"font-style-view",template:OsciTk.templateManager.get("font-style"),initialize:function(){this.render()},render:function(){return this.$el.html(this.template()),this},events:{"click .theme-button":"changeTheme"},changeTheme:function(a){a.preventDefault();var b=$(a.target),c=b.attr("href").substr(1),d=$("body");d.removeClass("normal sepia night"),d.addClass(c)}}),app={router:void 0,config:void 0,views:{},models:{},collections:{},bootstrap:function(a){this.config=new OsciTk.models.Config(a),this.router=new OsciTk.router,this.features=this.config.get("themeFeatures"),this.features.notes&&(this.collections.notes=new OsciTk.collections.Notes),this.features.account&&(this.account=new OsciTk.models.Account),this.collections.figures=new OsciTk.collections.Figures,this.collections.footnotes=new OsciTk.collections.Footnotes,this.collections.navigationItems=new OsciTk.collections.NavigationItems,this.features.glossary&&(this.collections.glossaryTerms=new OsciTk.collections.GlossaryTerms),window.onresize=function(){window.resizeTimer&&clearTimeout(window.resizeTimer);var a=function(){Backbone.trigger("windowResized")};window.resizeTimer=setTimeout(a,200)},this.views.app=new OsciTk.views.App},run:function(){this.models.docPackage=new OsciTk.models.Package({url:this.config.get("packageUrl")}),Backbone.history.start()}};