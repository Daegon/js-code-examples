import DS from 'ember-data';
import EmberValidations from 'ember-validations';

var Model = DS.Model.extend(EmberValidations, {
    debtor: DS.belongsTo('debtor', {async: true}),
    country: DS.attr('string'),
    city: DS.attr('string'),
    index_code: DS.attr('string'),
    street: DS.attr('string'),
    status: DS.attr('boolean'),
    for_mail: DS.attr('boolean'),
    comment: DS.attr('string'),
    not_formatted: DS.attr('string')
});

Model.reopen({
    validations: {
        'country': {
            presence: true
        },
        'city': {
            presence: true
        },
        'index_code': {
            presence: true
        },
        'street': {
            presence: true
        }
    }
});

export default Model;