import Ember from 'ember';

export default Ember.Component.extend({
    models: [],
    rendersCount: 0,
    cancelNextSearchFlag: true,
    hidden: true,
    selectedFlag: true,
    // Ask new models when input text changed
    getModels: function() {
        if(this.get('cancelNextSearchFlag')) {
            this.set('cancelNextSearchFlag', false);
        } else {
            if(this.get('selected') && this.get('selected').get('id')) {
                this.set('selected', null);
                this.set('inputText', '');
            }
            this.sendAction('searchedUpdated', this.get('inputText'));
        }

    }.observes('inputText'),
    modelsDidGet: function() {
        var rendersCount = this.get('rendersCount');
        this.set('rendersCount', rendersCount + 1);
        this.set('hidden', !(rendersCount + 1));
    }.observes('models'),
    inputTextChange: function () {
        this.set('cancelNextSearchFlag', true);
        this.set('inputText', this.get('selectedText'));
    }.observes('selectedText'),
    setupInit: function(){
        this.setProperties({
            inputText: this.get('selectedText')
        });
    }.on("init"),
    actions: {
        focusIn() {
            this.sendAction('searchedUpdated', this.get('inputText'));
            this.set('hidden', !this.get('rendersCount'));
        },
        focusOut() {
            this.set('hidden', true);
        },
        // Handle item selecting
        selected(item) {
            this.set('cancelNextSearchFlag', true);
            this.set('selected', item);
            this.set('hidden', true);
            this.set('selectedFlag', true);
            this.set('inputText', this.get('selectedText'));
        }
    }
});
