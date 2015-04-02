function loadXMLDoc(a){var b=new XMLHttpRequest;return b.overrideMimeType&&b.overrideMimeType("text/xml"),b.open("GET",a,!1),b.send(),b.responseXML}function loadHTMLDoc(a){var b=new XMLHttpRequest;b.overrideMimeType&&b.overrideMimeType("text/html"),b.open("GET",a,!1),b.send();var c=b.responseText;return c=c.replace('xmlns="http://www.w3.org/1999/xhtml"',""),c=c.replace('xmlns:epub="http://www.idpf.org/2007/ops"',"")}function xmlToJson(a,b){var c=0;if(!b)for(b=["xml:"],c=0;c<a.documentElement.attributes.length;c++)-1!=a.documentElement.attributes.item(c).nodeName.indexOf("xmlns")&&b.push(a.documentElement.attributes.item(c).nodeName.replace("xmlns:","")+":");var d=!0;if(a.attributes&&a.attributes.length>0){var e;d={};for(var f=0;f<a.attributes.length;f++)e=a.attributes.item(f),d[e.nodeName.replaceArray(b,"").toCamel()]=e.value}if(a.hasChildNodes()){var g,h,i;d===!0&&(d={});for(var j=0;j<a.childNodes.length;j++)i=a.childNodes.item(j),1===(7&i.nodeType)?(g=i.nodeName.replaceArray(b,"").toCamel(),h=xmlToJson(i,b),d.hasOwnProperty(g)?(d[g].constructor!==Array&&(d[g]=[d[g]]),d[g].push(h)):d[g]=h):3===(i.nodeType-1|1)&&(g="value",h=3===i.nodeType?i.nodeValue.replace(/^\s+|\s+$/g,""):i.nodeValue,d.hasOwnProperty(g)?d[g]+=h:(4===i.nodeType||""!==h)&&(d[g]=h))}return d}function objectToArray(a){return void 0!==a?"[object Array]"!==Object.prototype.toString.call(a)?[a]:a:void 0}OsciTk={},OsciTk.collections={},OsciTk.models={},OsciTk.templates={},OsciTk.views={figureTypeRegistry:{}},OsciTk.router=Backbone.Router.extend({routes:{"":"routeToSection","section/:section_id":"routeToSection","section/:section_id/:identifier":"routeToSection"},initialize:function(){this.on("all",this._trackPageView)},routeToSection:function(a,b){Backbone.trigger("routedToSection",{section_id:a,identifier:b})},_trackPageView:function(){var a=Backbone.history.getFragment();_.isUndefined(window._gaq)||_gaq.push(["_trackPageview","/#"+a])}}),String.prototype.replaceArray=function(a,b){for(var c=this,d=0;d<a.length;d++)c=c.replace(a[d],b);return c},String.prototype.toCamel=function(){return this.replace(/\s(.)/g,function(a){return a.toUpperCase()}).replace(/\s/g,"").replace(/^(.)/,function(a){return a.toLowerCase()})},OsciTk.templateManager={get:function(a){return function(b){return OsciTk.templateManager.useTemplate(a,b)}},useTemplate:function(a,b){if(void 0===OsciTk.templates[a])for(var c=app.config.get("templateUrls"),d=!1,e=c.length,f=0;e>f&&($.ajax({async:!1,dataType:"html",url:c[f]+a+".tpl.html",success:function(b){OsciTk.templates[a]=_.template(b),d=!0}}),!d);f++);return OsciTk.templates[a](b)}},OsciTk.models.BaseModel=Backbone.Model.extend(),OsciTk.models.Config=OsciTk.models.BaseModel.extend({}),OsciTk.models.Package=OsciTk.models.BaseModel.extend({defaults:function(){return{url:null,lang:null,spine:null,manifest:null,metadata:null,id:null,version:null,xmlns:null}},initialize:function(){var a=xmlToJson(loadXMLDoc(this.get("url")));this.set("lang",a["package"].lang),this.set("spine",a["package"].spine),this.set("manifest",a["package"].manifest),this.set("metadata",a["package"].metadata);var b=a["package"].metadata["dc:identifier"];_.isArray(b)||(b=[b]);for(var c=b.length,d=0;c>d;d++){var e=b[d];if(e.value.indexOf("urn:osci_tk_identifier:")!==!1){this.set("id",e.value.substr(23));break}}this.set("version",a["package"].version),this.set("xmlns",a["package"].xmlns),Backbone.trigger("packageLoaded",this)},sync:function(){},getTitle:function(){var a,b=this.get("metadata");return b["dc:title"]&&b["dc:title"].value&&(a=b["dc:title"].value),a},getPubId:function(){var a,b=this.get("metadata");if(!_.isUndefined(b["dc:identifier"]))if(_.isArray(b["dc:identifier"])){var c=_.find(b["dc:identifier"],function(a){return"publication-id"===a.id?!0:!1});c&&(a=c.value.split(":"))}else a=b["dc:identifier"].value.split(":");return a[2]}}),OsciTk.models.Figure=OsciTk.models.BaseModel.extend({defaults:function(){return{section_id:null,delta:null,caption:null,position:null,columns:null,aspect:0,body:null,options:{},plate:!1}},initialize:function(){this.parsePositionData(),this.set("content",$.trim(this.get("content")))},parsePositionData:function(){var a,b=this.get("position");return("plate"===b||"platefull"===b)&&(this.set("plate",!0),"plate"===b?b="p":"platefull"===b&&(b="ff")),a=2==b.length?{vertical:b[0],horizontal:b[1]}:"n"===b||"p"===b?{vertical:b,horizontal:b}:{vertical:b,horizontal:"na"},this.set("position",a),this}}),OsciTk.models.Footnote=OsciTk.models.BaseModel.extend({defaults:function(){return{body:"",section_id:"",delta:""}},sync:function(){}}),OsciTk.models.NavigationItem=OsciTk.models.BaseModel.extend({defaults:function(){return{title:null,subtitle:null,uri:null,parent:null,next:null,previous:null,depth:0,thumbnail:null,timestamp:null}}}),OsciTk.models.Page=OsciTk.models.BaseModel.extend({defaults:function(){return{content:{},pageNumber:0}},addContent:function(a){var b=this.get("content"),c=$(a[0]).data("osci_content_id");return void 0===c&&(c=$(a[0]).attr("id")),void 0===c?(c="content",b[c]=void 0===b[c]?a.html():b[c]+a.html()):b[c]=a[0],this},removeContentAt:function(a){var b=this.get("content");return delete b[a],this},removeAllContent:function(){this.set("content",{})},contentLength:function(){return this.get("content").length},getContent:function(a){return this.get("content")[a]}}),OsciTk.models.Note=OsciTk.models.BaseModel.extend({defaults:function(){return{id:null,content_id:null,section_id:null,note:null,tags:[],paragraph_number:null}},initialize:function(){this.on("error",function(){throw new Error("an error has occured")})},sync:function(a,b,c){var d=app.config.get("endpoints").OsciTkNote;switch(a){case"create":c.data=b.toJSON(),delete c.data.id,c.success=function(a,d,e){var f=JSON.parse(a);f.success?(b.set("id",f.note.id),b.trigger("change")):c.error(b,e)},c.type="POST",$.ajax(d,c);break;case"update":c.data=b.toJSON(),c.success=function(a,d,e){var f=JSON.parse(a);f.success?b.trigger("change"):c.error(b,e)},c.type="POST",$.ajax(d,c);break;case"delete":c.data=b.toJSON(),c.data["delete"]=1,c.type="POST",c.success=function(a,d,e){var f=JSON.parse(a);f.success?b.trigger("change"):c.error(b,e)},$.ajax(d,c)}}}),OsciTk.models.Section=OsciTk.models.BaseModel.extend({defaults:function(){return{title:null,content:null,uri:null,media_type:"application/xhtml+xml",contentLoaded:!1,pages:null}},initialize:function(){pages=new OsciTk.collections.Pages},loadContent:function(){var a=null;if(this.get("contentLoaded")===!1){var b=loadHTMLDoc(this.get("uri")),c=[],d=/body([^>]*)class=(["']+)([^"']*)(["']+)/gi.exec(b.substring(b.indexOf("<body"),b.indexOf("</body>")+7));_.isArray(d)&&!_.isUndefined(d[3])&&(c=d[3].split(" ")),a=$("<div />").html(b),this.set("title",a.find("title").html()),this.set("content",a),this.set("contentLoaded",!0),this.set("classes",c)}null===a&&(a=$(this.get("content")));var e=a.find("section#footnotes"),f=a.find("figure");Backbone.trigger("footnotesAvailable",e),Backbone.trigger("figuresAvailable",f),Backbone.trigger("sectionLoaded",this)},removeAllPages:function(){this.set("pages",new OsciTk.collections.Pages)}}),OsciTk.models.Account=OsciTk.models.BaseModel.extend({defaults:{username:"anonymous",email:null,id:0},initialize:function(){this.getSessionState()},sync:function(){},getSessionState:function(){var a=this;$.ajax({url:app.config.get("endpoints").OsciTkAccount,data:{action:"status"},type:"POST",dataType:"json",success:function(b){b.success===!0&&a.set(b.user)}}).done(function(){Backbone.trigger("accountReady")})}}),OsciTk.collections.BaseCollection=Backbone.Collection.extend(),OsciTk.collections.Figures=OsciTk.collections.BaseCollection.extend({model:OsciTk.models.Figure,initialize:function(){this.listenTo(Backbone,"figuresAvailable",function(a){this.populateFromMarkup(a),Backbone.trigger("figuresLoaded",this)})},comparator:function(a){return a.get("delta")},populateFromMarkup:function(a){var b=[];_.each(a,function(a){var c=a.id.match(/\w+-(\d+)-(\d+)/),d=$(a),e={id:a.id,rawData:a,body:a.innerHTML,section_id:c[1],delta:c[2],title:d.attr("title"),caption:d.find("figcaption").html(),content:d.find(".figure_content").html(),position:d.data("position"),columns:d.data("columns"),options:d.data("options"),thumbnail_url:void 0,type:d.data("figure_type"),aspect:d.data("aspect"),order:d.data("order"),count:d.data("count")};if(e.options.previewUri)e.thumbnail_url=e.options.previewUri,e.preview_url=e.options.previewUri;else{var f=d.children("img.thumbnail").remove();if(f.length)e.thumbnail_url=f.attr("src"),e.preview_url=f.attr("src");else{var g=$(".figure_content img",a);g.length&&(e.thumbnail_url=g.attr("src"),e.preview_url=g.attr("src"))}}b.push(e)},this),this.reset(b)}}),OsciTk.collections.NavigationItems=OsciTk.collections.BaseCollection.extend({model:OsciTk.models.NavigationItem,currentNavigationItem:null,initialize:function(){this.listenTo(Backbone,"packageLoaded",function(a){var b=_.find(a.get("manifest").item,function(a){return"nav"==a.properties});if(b){for(var c=xmlToJson(loadXMLDoc(b.href)),d=c.html.body.nav,e=0,f=d.length;f>e;e++)if("toc"==d[e].type){var g=d[e].ol;this.parseChildren(g,null,0);break}Backbone.trigger("navigationLoaded",this)}})},parseChildren:function(a,b,c){_.isArray(a)===!1&&(a=[a]);for(var d=0,e=a.length;e>d;d++){var f=a[d];if(f.a){var g={id:f.a["data-section_id"],parent:b,depth:c,previous:this.at(this.length-1)||null,next:null,length:f.a["data-length"]||null,title:f.a.value,subtitle:f.a["data-subtitle"],thumbnail:f.a["data-thumbnail"],timestamp:f.a["data-timestamp"],uri:f.a.href};this.add(g);var h=this.at(this.length-1);if(null!==h.get("previous")&&h.get("previous").set("next",h),f.ol&&f.ol.li){var i;i=f.ol.li.length?f.ol.li:[f.ol.li];for(var j=c+1,k=0,l=i.length;l>k;k++)this.parseChildren(i[k],h,j)}}f.li&&this.parseChildren(f.li,b,c)}}}),OsciTk.collections.Footnotes=OsciTk.collections.BaseCollection.extend({model:OsciTk.models.Footnote,initialize:function(){this.listenTo(Backbone,"footnotesAvailable",function(a){this.populateFromMarkup(a),Backbone.trigger("footnotesLoaded",this)})},populateFromMarkup:function(a){this.reset();for(var b=a.find("aside"),c=b.length,d=[],e=0;c>e;e++){var f=b[e],g=f.id.match(/\w+-(\d+)-(\d+)/);d.push({id:f.id,rawData:f,body:f.innerHTML,section_id:g[1],delta:g[2],index:f.getAttribute("data-footnote_index")})}this.reset(d)}}),OsciTk.collections.Notes=OsciTk.collections.BaseCollection.extend({model:OsciTk.models.Note,initialize:function(){this.listenTo(Backbone,"currentNavigationItemChanged",function(a){a.id&&this.getNotesForSection(a.id)})},parse:function(a){return a.success?a.notes:!1},getNotesForSection:function(a){$.ajax({url:app.config.get("endpoints").OsciTkNote,data:{section_id:a},type:"GET",dataType:"json",success:function(a){a.success===!0&&(app.collections.notes.reset(a.notes),Backbone.trigger("notesLoaded",app.collections.notes))}})}}),OsciTk.collections.Pages=OsciTk.collections.BaseCollection.extend({model:OsciTk.models.Page}),OsciTk.views.BaseView=Backbone.View.extend({getChildViews:function(){return this.childViews||(this.childViews=[]),this.childViews},addView:function(a,b){return a.parent=this,"undefined"==typeof b?this.$el.append(a.el):this.$el.find(b).append(a.el),this._addViewReference(a),this},removeAllChildViews:function(){if(this.childViews){for(var a=0,b=this.childViews.length;b>a;a++)this.childViews[a].close();this.childViews=[]}return this},removeView:function(a,b){if(this.childViews)for(var c=0,d=this.childViews.length;d>c;c++)if(a.cid===this.childViews[c].cid){this.childViews.splice(c,1),a.$el.detach(),(b||void 0===b)&&a.close();break}return this},getChildViewById:function(a){var b;if(this.childViews)for(var c=0,d=this.childViews.length;d>c;c++)if(a===this.childViews[c].cid){b=this.childViews[c];break}return b},getChildViewByIndex:function(a){var b;return this.childViews&&this.childViews[a]&&(b=this.childViews[a]),b},getChildViewsByType:function(a){return _.filter(this.childViews,function(b){return b.$el.is(a)})},replaceView:function(a,b){return a.parent=this,"undefined"==typeof b?this.$el.html(a.el):this.$el.find(b).html(a.el),this._addViewReference(a),this},changeModel:function(a){return this.model=a,this},close:function(){this.removeAllChildViews(),this.remove(),this.unbind(),this.undelegateEvents(),this.onClose&&this.onClose()},_addViewReference:function(a){this.childViews||(this.childViews=[]);for(var b=!1,c=0,d=this.childViews.length;d>c;c++)if(a.cid===this.childViews[c].cid){b=!0;break}b||this.childViews.push(a)}}),OsciTk.views.App=OsciTk.views.BaseView.extend({id:"reader",template:OsciTk.templateManager.get("app"),initialize:function(){this.render(),app.toolbarItems=app.config.get("toolbarItems")?app.config.get("toolbarItems"):[],app.views={titleView:new OsciTk.views.Title,headerView:new OsciTk.views.Header,fontSizeView:new OsciTk.views.FontSize,printView:new OsciTk.views.Print,tocView:new OsciTk.views.Toc,toolbarView:new OsciTk.views.Toolbar,sectionView:new OsciTk.views.Section,navigationView:new OsciTk.views.Navigation,footnotesView:new OsciTk.views.Footnotes,paragraphControlsView:new OsciTk.views.ParagraphControls,notesView:new OsciTk.views.Notes,citationsView:new OsciTk.views.Citation,accountView:new OsciTk.views.Account,navbarView:new OsciTk.views.Navbar},this.addView(app.views.headerView,"#header"),this.addView(app.views.toolbarView,"#toolbar"),this.addView(app.views.navbarView,"#navbar"),this.addView(app.views.sectionView,"#section"),this.addView(app.views.navigationView,"#navigation"),this.listenTo(Backbone,"toolbarInline",function(a){this.toolbarInline(a)}),this.listenTo(Backbone,"toolbarItemClicked",function(a){this.toolbarAction(a)}),this.listenTo(Backbone,"toolbarRemoveViews",function(){this.toolbarToggle()})},render:function(){this.$el.html(this.template),$("body").append(this.el)},toolbarInline:function(a){var b=_.pick(app.views,a.view);b=b[a.view],this.removeView(b,!1),this.addView(b,"#"+a.text)},toolbarAction:function(a){if(this.toolbarToggle(),!a.active){var b=_.pick(app.views,a.item.view);b=b[a.item.view],this.addView(b,"#"+a.item.text)}},toolbarToggle:function(){_.each(app.toolbarItems,function(a){if($("."+a.view+"-toolbar-item > a").removeClass("active"),"default"==a.style){var b=_.pick(app.views,a.view);b=b[a.view],this.removeView(b,!1)}},this)}}),OsciTk.views.Section=OsciTk.views.BaseView.extend({id:"section-view",template:OsciTk.templateManager.get("section"),events:{scroll:"updateProgress","click .content-paragraph":"paragraphClicked","click .paragraph-button":"paragraphClicked","click #note-submit":"noteSubmit"},initialize:function(){_.bindAll(this,"updateProgress"),$(window).scroll(this.updateProgress),this.maxHeightSet=!1,this.listenTo(Backbone,"currentNavigationItemChanged",function(a){$("#section-view").empty(),$(".header-view").empty(),$("#loader").show(),$("#loader").fadeTo(500,.7),a&&(app.models.section=new OsciTk.models.Section({uri:a.get("uri"),id:a.get("id")}),this.ContentId=a.get("id"),app.models.section.loadContent())}),this.listenTo(Backbone,"windowResized",function(){this.maxHeightSet=!1,this.render()}),this.listenTo(Backbone,"sectionLoaded",function(a){this.makeIds(a),this.sectionId=a.get("id"),this.getSectionTitles(this.sectionId)}),this.listenTo(Backbone,"figuresAvailable",function(a){this.figures=a,this.setFigureStyles()})},render:function(){return $("#loader").hide(),this.$el.html(this.template({sectionTitle:this.sectionTitle,content:$(this.content).html()})),Backbone.trigger("layoutComplete"),this},getSectionTitles:function(a){_.each(app.collections.navigationItems.models,function(b){b.get("id")==a&&(this.sectionTitle=b.get("title"),this.sectionSubtitle=b.get("subtitle"),this.sectionThumbnail=b.get("thumbnail"))},this),this.render()},updateProgress:function(){var a=$(window).scrollTop(),b=400;a>=b?($(".progress").removeClass("hidden"),$("#navigation").removeClass("hidden")):($(".progress").addClass("hidden"),$("#navigation").addClass("hidden"));var c=a-b;if($(".progress .progress-bar").attr("aria-valuenow",a),!this.maxHeightSet){var d=$(document).height(),e=(window,document),f=(e.documentElement,e.getElementsByTagName("body")[0]),g=f.clientHeight,h=d-g-b;$(".progress .progress-bar").attr("aria-valuemax",h);var i=Math.floor(c/h*100);$(".progress .progress-bar").attr("style","height: "+i+"%")}},makeIds:function(a){var b=a.get("content")[0].children.body;this.content=b;var c=0,d=1;_.each(this.content.children,function(a){$(a).is("p")&&($(a).attr({"data-paragraph_number":d,"data-osci_content_id":"osci-content-"+c,"data-sectionid":"body",id:"osci-content-"+c}).addClass("content-paragraph"),d++),c++},this)},paragraphClicked:function(a){var b=$(a.currentTarget),c=b.data("paragraph_number");Backbone.trigger("paragraphClicked",c)},noteSubmit:function(a){var b=$(a.currentTarget).parent().find("textarea"),c=b.val(),d=b.data("id"),e=b.data("paragraph_number");if(""!=c){console.log(c);var f=app.collections.notes.get(d);f.set("note",c),f.save(),b.html(c)}$("#paragraph-"+e).popover({content:function(){return $("#popover-content").html()}}),$("#paragraph-"+e).popover("destroy")},setFigureStyles:function(){_.each(this.figures,function(a){var b=$(a).data("position");switch(b){case"p":var c="fullpage";break;case"plate":var c="plate";break;case"platefull":var c="platefull";break;case"tl":var c="top left";break;case"bl":var c="bottom left";break;case"tr":var c="top right";break;case"br":var c="bottom right";break;case"i":case"t":case"b":var c="center"}$(a).addClass(c),$(a).find("div > object > div > img").addClass(c)},this)}}),OsciTk.views.ParagraphControls=OsciTk.views.BaseView.extend({initialize:function(){this.listenTo(Backbone,"layoutComplete",function(){this.sectionId=app.models.section.get("id")}),this.listenTo(Backbone,"notesLoaded",function(){this.notesLoaded=!0,this.render()}),this.listenTo(Backbone,"paragraphClicked",function(a){this.togglePopover(a)}),this.listenTo(Backbone,"windowResized",function(){this.notesLoaded&&this.render()})},render:function(){return this.addParagraphControls(),this},addParagraphControls:function(){var a=$(".content-paragraph"),b=1;_.each(a,function(a){var c=this.checkForNote({content_id:"osci-content-"+b,section_id:this.sectionId,paragraph_number:b}),d=c.get("note")?"btn-warning":"";$(a).before('<div class="paragraph-controls" data-osci_content_id="osci-content-'+b+'" data-paragraph_identifier="'+b+'" ><button class="btn btn-default '+d+' btn-xs paragraph-button" type="button" id="paragraph-'+b+'" data-paragraph_number="'+b+'"><span class="paragraph-identifier" paragraph-identifier="'+b+'">'+b+"</span></button></div>"),b++},this)},togglePopover:function(a){var b=this.checkForNote({content_id:"osci-content-"+a,section_id:this.sectionId,paragraph_number:a}),c=b?b.get("note"):"";c=null===c?"":c;var d="<textarea data-paragraph_number='"+a+"' data-id='"+b.cid+"'>"+c+"</textarea><button id='note-submit' type='button' class='btn btn-primary btn-block'>Add Note</button>";$("#paragraph-"+a).popover({html:!0,trigger:"manual",placement:"top",title:"note",content:d}),$("#paragraph-"+a).popover("toggle")},checkForNote:function(a){var b,c=app.collections.notes.where({content_id:a.content_id});return c[0]?b=c[0]:(b=new OsciTk.models.Note({content_id:a.content_id,section_id:a.section_id,paragraph_number:a.paragraph_number}),app.collections.notes.add(b)),b}}),OsciTk.views.Page=OsciTk.views.BaseView.extend({template:OsciTk.templateManager.get("page"),className:"page",initialize:function(a){this.options=a,this.processingData={complete:!1},this.$el.addClass("page-num-"+this.model.collection.length).attr("data-page_num",this.model.collection.length)},render:function(){return this.$el.html(this.template(this.model.toJSON())),this},processingComplete:function(){return this.processingData.complete=!0,this},addContent:function(a){return this.model.addContent(a),this},removeContent:function(a){return this.model.removeContent(a),this},getContentById:function(a){return this.model.getContent(a)},hasContent:function(){return this.model.contentLength()?!0:!1},isPageComplete:function(){return this.processingData.complete},removeAllContent:function(){return this.model.removeAllContent(),this},containsElementId:function(a){return 0!==this.$el.find("#"+a).length}}),OsciTk.views.Title=OsciTk.views.BaseView.extend({className:"title-view",template:OsciTk.templateManager.get("title"),initialize:function(){this.listenTo(Backbone,"packageLoaded",function(a){var b=a.getTitle();b&&this.$el.find("#publication-title").text(b)}),this.render()},render:function(){return this.$el.html(this.template()),this},events:{"click #publication-title":function(a){a.preventDefault();var b=app.collections.navigationItems.models[0].id;app.router.navigate("section/"+b,{trigger:!0})}}}),OsciTk.views.Toolbar=OsciTk.views.BaseView.extend({id:"toolbar-view",template:OsciTk.templateManager.get("toolbar"),initialize:function(){this.activeToolbarItemView=void 0,this.listenTo(Backbone,"packageLoaded",function(a){this.title=a.getTitle()}),this.listenTo(Backbone,"figuresAvailable",function(a){this.figureSize=a.size(),this.render()})},render:function(){this.$el.html(this.template({title:this.title})),_.each(app.toolbarItems,function(a){if("figures"!=a.text||0!=this.figureSize){var b=new OsciTk.views.ToolbarItem({toolbarItem:a});this.addView(b,"#toolbar-area"),b.render()}},this)}}),OsciTk.views.ToolbarItem=OsciTk.views.BaseView.extend({tagName:"li",className:"toolbar-item-view",template:OsciTk.templateManager.get("toolbar-item"),events:{click:"itemClicked",touch:"itemClicked"},initialize:function(a){this.options=a,this.$el.addClass(this.options.toolbarItem.view+"-toolbar-item")},render:function(){return this.$el.html(this.template({text:this.options.toolbarItem.text,style:this.options.toolbarItem.style})),"default"!=this.options.toolbarItem.style&&Backbone.trigger("toolbarInline",this.options.toolbarItem),this},itemClicked:function(a){a.preventDefault(),a.stopPropagation(),this.setActiveStates(a)},setActiveStates:function(a){this.e=a,this.view=app.views.toolbarView,this.$target=$(a.target),this.href=$(a.target).attr("href"),"#"!=this.href&&Backbone.trigger("toolbarInlineClicked",this.href),this.active=this.$target.hasClass("active"),this.$target.toggleClass("active"),this.$targetCheck=$(a.currentTarget),_.each(app.toolbarItems,function(a){0==this.$targetCheck.hasClass(a.view+"-toolbar-item")&&this.view.$el.find("li."+a.view+"-toolbar-item>a").removeClass("active")},this),Backbone.trigger("toolbarItemClicked",{item:this.options.toolbarItem,active:this.active})}}),OsciTk.views.Footnotes=OsciTk.views.BaseView.extend({id:"footnote-view",initialize:function(){this.listenTo(Backbone,"layoutComplete",function(){for(var a=app.views.sectionView.$el.find("a.footnote-reference"),b=0;b<a.length;b++){var c=$(a[b]),d=c.attr("href").slice(1),e=app.collections.footnotes.get(d),f=$(e.get("body")).text();c.attr("title",f),c.attr("data-toggle","tooltip"),c.attr("data-placement","bottom"),c.off("click"),c.bind("click",{caller:this},this.footnoteClicked)}$('[data-toggle="tooltip"]').tooltip()})},footnoteClicked:function(a){a.preventDefault(),a.stopPropagation()}}),OsciTk.views.Header=OsciTk.views.BaseView.extend({className:"header-view",template:OsciTk.templateManager.get("header"),initialize:function(){this.listenTo(Backbone,"packageLoaded",function(a){this.creator=$(a)[0].attributes.metadata["dc:creator"].value,this.pubTitle=a.getTitle()}),this.listenTo(Backbone,"sectionLoaded",function(a){this.sectionTitle=null,this.sectionSubtitle=null,this.sectionThumbnail=null,this.headerImage=null,this.headerImageCaption=null;var b=a.get("id");this.render(b)})},render:function(a){return _.each(app.collections.navigationItems.models,function(b){b.get("id")==a&&(this.sectionTitle=b.get("title"),this.sectionSubtitle=b.get("subtitle"),this.sectionThumbnail=b.get("thumbnail"))}),_.isEmpty(app.collections.figures.models)?(this.headerImage=null,this.headerImageCaption=null):_.each(app.collections.figures.models,function(a){1==a.get("plate")&&(this.headerImage=a.get("preview_url"),this.headerImageCaption=a.get("caption"))}),this.$el.html(this.template({creator:this.creator,title:this.pubTitle,sectionTitle:this.sectionTitle,sectionSubtitle:this.sectionSubtitle})),this}}),OsciTk.views.Navigation=OsciTk.views.BaseView.extend({id:"navigation-view",template:OsciTk.templateManager.get("navigation"),events:{"click .next-page":"nextPageClicked","click .prev-page":"prevPageClicked"},initialize:function(){this.identifier=null,this.currentNavigationItem=null,this.listenTo(Backbone,"layoutComplete",function(){this.identifier?(Backbone.trigger("navigate",{identifier:this.identifier}),this.identifier=null):Backbone.trigger("navigate",{page:1}),this.render()}),this.listenTo(Backbone,"routedToSection",function(a){if(this.identifier=a.identifier,a.section_id)this.setCurrentNavigationItem(a.section_id);else{var b=app.collections.navigationItems.at(0).id;this.setCurrentNavigationItem(b),app.router.navigate("section/"+b,{trigger:!1})}this.setDocumentTitle()})},render:function(){this.$el.html(this.template({chapter:this.currentNavigationItem.get("title"),previousItem:this.currentNavigationItem.get("previous"),nextItem:this.currentNavigationItem.get("next")}))},nextPageClicked:function(){Backbone.trigger("scrollToPage","next")},prevPageClicked:function(){Backbone.trigger("scrollToPage","prev")},setDocumentTitle:function(){var a=app.models.docPackage.getTitle();a=a?a+" | ":"",a+=this.getCurrentNavigationItem().get("title"),document.title=a},getCurrentNavigationItem:function(){return this.currentNavigationItem},setCurrentNavigationItem:function(a){var b=app.collections.navigationItems.get(a);this.currentNavigationItem=b?app.collections.navigationItems.get(a):app.collections.navigationItems.first(),Backbone.trigger("currentNavigationItemChanged",this.currentNavigationItem)}}),OsciTk.views.Navbar=OsciTk.views.BaseView.extend({className:"navbar-view",template:OsciTk.templateManager.get("navbar"),events:{"click li a":"itemClick"},initialize:function(){this.listenTo(Backbone,"packageLoaded",function(a){this.creator=$(a)[0].attributes.metadata["dc:creator"].value,this.pubTitle=a.getTitle(),this.sections=app.collections.navigationItems.where({depth:0})}),this.listenTo(Backbone,"currentNavigationItemChanged",function(){this.render()})},render:function(){return this.$el.html(this.template({title:this.pubTitle,sections:this.sections})),this},itemClick:function(a){a.preventDefault();var b=$(a.currentTarget).attr("data-section-id");$("li.tocView-toolbar-item>a").removeClass("active"),Backbone.trigger("toolbarRemoveViews"),app.router.navigate("section/"+b,{trigger:!0})}}),OsciTk.views.Notes=OsciTk.views.BaseView.extend({className:"notes-view",template:OsciTk.templateManager.get("notes"),events:{"click .noteLink":"noteLinkClick"},initialize:function(){this.listenTo(app.collections.notes,"add remove change",function(){this.render()})},render:function(){var a=this.getSavedNotes();return this.$el.html(this.template({notes:a})),this.active(),this},noteLinkClick:function(a){a.preventDefault();var b=$(a.target),c=b.attr("data-content_id");c&&(Backbone.trigger("navigate",{identifier:c}),Backbone.trigger("toggleNoteDialog",{contentId:c}),$("#"+c).click(),app.views.toolbarView.contentClose())},getSavedNotes:function(){var a=_.filter(app.collections.notes.models,function(a){return null!==a.id?!0:!1});return a},active:function(){if(app.collections.notes.length>1){var a=this.$el.find(".notesListItem");this.$el.find(".notesList").width(a.length*a.first().outerWidth(!0))}}}),OsciTk.views.Citation=OsciTk.views.BaseView.extend({template:OsciTk.templateManager.get("citation"),initialize:function(){this.listenTo(Backbone,"toggleCiteDialog",function(a){this.render(a)})},render:function(a){var b=a.contentId,c=$("#"+b),d={section_id:app.models.section.get("id"),publication_id:app.models.docPackage.get("id"),element_id:a.contentId,field:c.attr("data-sectionId")};$.ajax({url:app.config.get("endpoints").OsciTkCitation,data:d,success:function(a){a.success&&(a.citation.referenceText=c.text(),a.citation.url=document.URL+"/p-"+app.models.section.get("id")+"-"+c.data("paragraph_number"),a.citation.paragraphNumber=c.data("paragraph_number"),a.citation.date=new Date(a.citation.date),a.citation.formattedDate=a.citation.date.getMonth()+1+"/"+a.citation.date.getDate()+"/"+a.citation.date.getFullYear(),a.citation.creator=a.citation.creator?a.citation.creator:"",a.citation.description=a.citation.description?a.citation.description:"",a.citation.editor=a.citation.editor?a.citation.editor:"",a.citation.publicationTitle=a.citation.publicationTitle?a.citation.publicationTitle:"",a.citation.publisher=a.citation.publisher?a.citation.publisher:"",a.citation.rights=a.citation.rights?a.citation.rights:"",a.citation.title=a.citation.title?a.citation.title:"",$(".citation-wrapper").on("click","a",function(a){a.preventDefault();var b=$(this),c=b.parents(".citations");c.find(".citation").hide(),c.find(b.attr("href")).show(),c.find("li").removeClass("active"),b.parent().addClass("active")}))}})}}),OsciTk.views.Toc=OsciTk.views.BaseView.extend({className:"toc-view",template:OsciTk.templateManager.get("toc"),events:{"click li a":"itemClick","click #dismiss":"closeOverlay"},initialize:function(){this.listenTo(Backbone,"currentNavigationItemChanged",function(){this.render()})},render:function(){return this.$el.html(this.template({items:app.collections.navigationItems.where({depth:0})})),this},itemClick:function(a){a.preventDefault();var b=$(a.currentTarget).attr("data-section-id");$("li.tocView-toolbar-item>a").removeClass("active"),Backbone.trigger("toolbarRemoveViews"),app.router.navigate("section/"+b,{trigger:!0})},closeOverlay:function(){Backbone.trigger("toolbarRemoveViews")}}),OsciTk.views.Account=OsciTk.views.BaseView.extend({events:{"click button.login":"login","click button.register":"register","click a.register":"showRegistrationForm","click a.login":"showLoginForm","click a.logout":"logout","click #dismiss":"closeOverlay"},className:"account-view",template:null,initialize:function(){this.listenTo(Backbone,"accountReady",function(){this.model=app.account,this.render()})},render:function(){return this.model.get("id")>0?this.showProfile():this.showLoginForm(),this},login:function(){var a=this,b=this.$el.find("#username").val(),c=this.$el.find("#password").val();$.ajax({url:app.config.get("endpoints").OsciTkAccount,data:{action:"login",username:b,password:c},type:"POST",dataType:"json",success:function(b){b.success===!0?(a.model.set(b.user),a.showProfile()):a.$el.find("div.form-error").html(b.error)}})},logout:function(){var a=this;$.ajax({url:app.config.get("endpoints").OsciTkAccount,data:{action:"logout"},type:"POST",dataType:"json",success:function(b){a.model.set(b.user),a.showLoginForm()}})},register:function(){var a=this,b=this.$el.find("#username").val(),c=this.$el.find("#password").val(),d=this.$el.find("#email").val();$.ajax({url:app.config.get("endpoints").OsciTkAccount,data:{action:"register",username:b,password:c,email:d},type:"POST",dataType:"json",success:function(b){b.success===!0?(a.model.set(b.user),a.showProfile()):a.$el.find("div.form-error").html(b.error)}})},showRegistrationForm:function(){this.template=OsciTk.templateManager.get("account-register"),this.$el.html(this.template())},showLoginForm:function(){this.template=OsciTk.templateManager.get("account-login"),this.$el.html(this.template())},showProfile:function(){this.template=OsciTk.templateManager.get("account-profile"),this.$el.html(this.template(this.model.toJSON()))},closeOverlay:function(){Backbone.trigger("toolbarRemoveViews")}}),OsciTk.views.FontSize=OsciTk.views.BaseView.extend({className:"font-size-view",template:OsciTk.templateManager.get("font-size"),initialize:function(){this.currentFontSize=100,this.listenTo(Backbone,"toolbarInlineClicked",function(a){this.changeFontSize(a)}),this.render()},render:function(){return this.$el.html(this.template()),this},changeFontSize:function(a){var b=app.views.sectionView;
"#font-larger"===a&&(this.currentFontSize+=25),"#font-smaller"===a&&(this.currentFontSize-=25),b.$el.css({"font-size":this.currentFontSize+"%"}),Backbone.trigger("windowResized")}}),OsciTk.views.Print=OsciTk.views.BaseView.extend({className:"print-view",template:OsciTk.templateManager.get("print"),initialize:function(){this.render(),this.listenTo(Backbone,"toolbarInlineClicked",function(a){this.triggerPrint(a)})},render:function(){return this.$el.html(this.template()),this},triggerPrint:function(a){"#print"===a&&window.print()}}),app={router:void 0,config:void 0,views:{},models:{},collections:{},bootstrap:function(a){this.config=new OsciTk.models.Config(a),this.router=new OsciTk.router,this.features=this.config.get("themeFeatures"),this.collections.figures=new OsciTk.collections.Figures,this.collections.footnotes=new OsciTk.collections.Footnotes,this.collections.navigationItems=new OsciTk.collections.NavigationItems,this.features.notes&&(this.collections.notes=new OsciTk.collections.Notes),this.features.account&&(this.account=new OsciTk.models.Account),this.features.glossary&&(this.collections.glossaryTerms=new OsciTk.collections.GlossaryTerms),window.onresize=function(){window.resizeTimer&&clearTimeout(window.resizeTimer);var a=function(){Backbone.trigger("windowResized")};window.resizeTimer=setTimeout(a,200)},this.views.app=new OsciTk.views.App},run:function(){this.models.docPackage=new OsciTk.models.Package({url:this.config.get("packageUrl")}),Backbone.history.start()}};