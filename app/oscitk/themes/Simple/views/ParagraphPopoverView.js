OsciTk.views.ParagraphPopover = OsciTk.views.BaseView.extend({
    template: OsciTk.templateManager.get('popover'),
    templateCites: OsciTk.templateManager.get('citation'),

    initialize: function(data) {
        this.render(data);
    },

    events: {
        'click #cite': 'getCitation',
    },

    render: function(data) {
        data.noteForm = this.templateNotes(data);

        var citeData = new OsciTk.views.Citation(data);

        if ( $('#note-' + data.id).length === 0 ) {
            $('#section-view').append(this.template(data));
        }

        return this;
    },

    getCitation: function() {
        console.log('getCite');
    }
});