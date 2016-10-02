import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import MenuSection from 'ember-app/mixins/routes/menu-section';

export default Ember.Route.extend(AuthenticatedRouteMixin, MenuSection, {
    currentSection: 'deal',
    setupController: function(controller, model) {
        var deal = this.modelFor('dashboard.deals.edit');
        controller.set('model', this.get('store').createRecord('deal_comment'));
        controller.set('deal', deal);
        controller.set('comments', deal.get('comments'))
    }
});
