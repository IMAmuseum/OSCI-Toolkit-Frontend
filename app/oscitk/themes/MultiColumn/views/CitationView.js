OsciTk.views.Citation = OsciTk.views.BaseView.extend({
    template: OsciTk.templateManager.get('citation'),
    initialize: function() {

        this.listenTo(Backbone, "toggleCiteDialog", function(data) {
            this.render(data);
        });
    },
    render: function(data) {

        var citationView = this;

        var content = $('p[data-paragraph_number=' + data.paragraphNumber + ']');
        var contentId = content.attr('data-osci_content_id');

        var citationRequestParams = {
            'section_id': app.models.section.get('id'),
            'publication_id': app.models.docPackage.get('id'),
            'element_id': data.contentId,
            'field': content.attr('data-sectionId')
        };

        $.ajax({
            url: app.config.get('endpoints').OsciTkCitation,
            data: citationRequestParams,
            success: function(data, status) {
                if (data.success) {
                    //add reference text to the response
                    data.citation.referenceText = content.text();
                    data.citation.paragraphNumber = content.data('paragraph_number');
                    data.citation.date = new Date(data.citation.date);
                    data.citation.formattedDate = (data.citation.date.getMonth() + 1) + "/" + data.citation.date.getDate() + "/" + data.citation.date.getFullYear();

                    // url is a bit tricky...
                    var url = document.location.href.match(/(^[^#]*)/)[0];
                        url += '#section/' + app.models.section.get('id');
                        url += '/p-' + content.data('paragraph_number');

                    data.citation.url = url;

                    //make sure data exists for all variables in templates
                    data.citation.creator = data.citation.creator ? data.citation.creator : '';
                    data.citation.description = data.citation.description ? data.citation.description : '';
                    data.citation.editor = data.citation.editor ? data.citation.editor : '';
                    data.citation.publicationTitle = data.citation.publicationTitle ? data.citation.publicationTitle : '';
                    data.citation.publisher = data.citation.publisher ? data.citation.publisher : '';
                    data.citation.rights = data.citation.rights ? data.citation.rights : '';
                    data.citation.title = data.citation.title ? data.citation.title : '';

                    $.fancybox({
                        'padding'       : 0,
                        'content'       : citationView.template(data.citation),
                        'type'          : 'inline',
                        'titleShow'     : false
                    });

                    $(".citation-wrapper").on('click', 'a', function(e) {
                        e.preventDefault();
                        var $this = $(this);

                        var container = $this.parents(".citations");
                        container.find('.citation').hide();
                        container.find($this.attr('href')).show();

                        container.find('li').removeClass('active');
                        $this.parent().addClass('active');
                    });
                }
            }
        });
    }
});