OsciTk.views.Modal = OsciTk.views.BaseView.extend({
    template: OsciTk.templateManager.get('modal'),
    templateNotes: OsciTk.templateManager.get('note-form'),
    templateCites: OsciTk.templateManager.get('citation'),
    initialize: function(data) {

        this.render(data);
    },

    render: function(data) {
        data.noteForm = this.templateNotes(data);

        var citeData = new OsciTk.views.Citation(data);

        if ( $('#note-' + data.id).length === 0 ) {
            $('#section-view').append(this.template(data));
        }

        return this;
    }
});