app.zotero = {
    init: function() {
        app.dispatcher.on('packageLoaded', function(model) {
            // Get date
            var d = new Date(model.attributes.metadata['dc:date'].value);
            d = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();

            // Build COInS data
            var coins = [
                'ctx_ver=Z39.88-2004',
                'rft_val_fmt=info%3Aofi%2Ffmt%3Akev%3Amtx%3Abook',
                'rft.genre=book',
                'rft.date=' + d, 
                'rfr_id=' + model.attributes.metadata['dc:identifier'].value,      
                'rft.btitle=' + model.attributes.metadata['dc:title'].value,
                'rft.atitle=' + model.attributes.metadata['dc:title'].value,
                'rft.au=' + model.attributes.metadata['dc:creator'].value,
                'rft.pub=' + model.attributes.metadata['dc:publisher'].value
            ];

            // Append coins data to body
            var span = $('<span></span>');
            span.addClass('Z3988');
            span.attr('title', coins.join('&'));
            span.appendTo($('body'));
        
            // Trigger zotero to search for biblio data
            var ev = document.createEvent('HTMLEvents');
            ev.initEvent('ZoteroItemUpdated', true, true);
            document.dispatchEvent(ev);
        });
    }
}
