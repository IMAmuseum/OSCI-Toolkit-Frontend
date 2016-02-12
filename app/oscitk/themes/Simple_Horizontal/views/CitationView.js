OsciTk.views.Citation = OsciTk.views.BaseView.extend({
    template: OsciTk.templateManager.get('paragraph-citation'),
    initialize: function(data) {
        this.render(data);
    },
    render: function(data) {
        var citationView = this;
        var contentId = data.contentId;
        var content = $('#' + contentId);

        var citationRequestParams = {
            'section_id': app.models.section.get('id'),
            'publication_id': app.models.docPackage.get('id'),
            'element_id': data.contentId,
            'field': content.attr('data-sectionId')
        };

        console.log(citationRequestParams);

        $.ajax({
            url: app.config.get('endpoints').OsciTkCitation,
            data: citationRequestParams,
            success: function(data, status) {
                if (data.success) {
                    //add reference text to the response
                    data.citation.referenceText = content.text();
                    data.citation.url = document.URL + "/p-" + app.models.section.get('id') + "-" + content.data('paragraph_number');
                    data.citation.paragraphNumber = content.data('paragraph_number');
                    data.citation.date = new Date(data.citation.date);
                    data.citation.formattedDate = (data.citation.date.getMonth() + 1) + "/" + data.citation.date.getDate() + "/" + data.citation.date.getFullYear();

                    //make sure data exists for all variables in templates
                    data.citation.creator = data.citation.creator ? data.citation.creator : '';
                    data.citation.description = data.citation.description ? data.citation.description : '';
                    data.citation.editor = data.citation.editor ? data.citation.editor : '';
                    data.citation.publicationTitle = data.citation.publicationTitle ? data.citation.publicationTitle : '';
                    data.citation.publisher = data.citation.publisher ? data.citation.publisher : '';
                    data.citation.rights = data.citation.rights ? data.citation.rights : '';
                    data.citation.title = data.citation.title ? data.citation.title : '';

                    $('.citation').html(citationView.template(data.citation));
                }
            }
        });
    }
});