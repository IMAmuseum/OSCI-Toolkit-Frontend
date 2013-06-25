OsciTk.models.Package = OsciTk.models.BaseModel.extend({
    defaults: function() {
        return {
            url: null,
            lang: null,
            spine: null,
            manifest: null,
            metadata: null,
            id: null,
            version: null,
            xmlns: null
        };
    },

    initialize: function() {
        // TODO: ERROR CHECK THE RETURN XML
        var data = xmlToJson(loadXMLDoc(this.get('url')));

        this.set('lang', data['package'].lang);
        this.set('spine', data['package'].spine);
        this.set('manifest', data['package'].manifest);
        this.set('metadata', data['package'].metadata);

        //get the publication id
        var ids = data['package']['metadata']['dc:identifier'];
        if (!_.isArray(ids)) {
            ids = [ids];
        }
        var numIds = ids.length;
        for (var i = 0; i < numIds; i++) {
            var pubId = ids[i];
            if (pubId.value.indexOf('urn:osci_tk_identifier:') !== false) {
                this.set('id', pubId.value.substr(23));
                break;
            }
        }

        this.set('version', data['package'].version);
        this.set('xmlns', data['package'].xmlns);

        Backbone.trigger('packageLoaded', this);
    },

    sync: function(method, model, options) {
    },

    getTitle: function() {
        var title;
        var metadata = this.get("metadata");
        if (metadata['dc:title'] && metadata['dc:title']['value']) {
            title = metadata['dc:title']['value'];
        }

        return title;
    },
    getPubId: function() {
        var metadata = this.get("metadata");
        var vals;

        if (!_.isUndefined(metadata['dc:identifier'])) {
            if (_.isArray(metadata['dc:identifier'])) {
                var pubId = _.find(metadata['dc:identifier'], function(ident) {
                    return ident.id === "publication-id" ? true : false;
                });
                if (pubId) {
                    vals = pubId.value.split(":");
                }
            } else {
                vals = metadata['dc:identifier'].value.split(":");
            }
        }
        return vals[2];
    }
});
