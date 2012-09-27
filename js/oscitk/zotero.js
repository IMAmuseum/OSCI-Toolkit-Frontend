app.zotero = {
    init: function() {
        app.dispatcher.on('packageLoaded', function(model) {
            // Get date
            var d = new Date(model.get('dc:date'));
            d = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();

            // Build COInS data
            var coins = [
                'ctx_ver=Z39.88-2004',
                'rft_val_fmt=info%3Aofi%2Ffmt%3Akev%3Amtx%3Abook',
                'rft.genre=book',
                'rft.date=' + d,
                'rfr_id=' + model.get('dc:identifier'),
                'rft.btitle=' + model.get('dc:title'),
                'rft.atitle=' + model.get('dc:title'),
                'rft.au=' + model.get('dc:creator'),
                'rft.pub=' + model.get('dc:publisher')
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
};
