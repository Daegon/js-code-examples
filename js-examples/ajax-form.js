var AjaxForm = (function () {
    function AjaxForm($form) {
        var self = this;
        this.errorClass = 'input-error';
        this.$form = $form;
        this.processing = false;
        this.$form.on('submit', function () {
            self.submitForm();
            return false;
        });
        this.inputs = this.$form.find('input, select, textarea');
        this.inputs.on('click focus', function () {
            $(this).removeClass(self.errorClass);
        });
    }

    AjaxForm.prototype.submitForm = function () {
        if(!this.processing) {
            this.processing = true;
            $.ajax({
                url: this.$form.attr('action'),
                data: this.$form.serialize(),
                dataType: "json",
                type: "POST",
                success: function() {
                    this.processing = false;
                    this.successSubmit.apply(this, arguments);
                }.bind(this),
                error: this.errorSubmit.bind(this)
            });
        }
        return false;
    };

    AjaxForm.prototype.successSubmit = function (responce) {
        if (responce.message) {
            messages.alert(responce.message)
        }
    };

    AjaxForm.prototype.errorSubmit = function (responce) {
        if (responce.status == 422) {
            $.each(responce.responseJSON, function (name, error) {
                this.$form.find('[name="' + name + '"]').addClass(this.errorClass);
            }.bind(this));
        }
    };

    return AjaxForm;
})();

var AutoSubmitAjaxForm = (function (superClass) {
    extend(AutoSubmitAjaxForm, superClass);

    function AutoSubmitAjaxForm() {
        AutoSubmitAjaxForm.__super__.constructor.apply(this, arguments);
        this.$form.find('input, select, textarea').on('change', this.submitForm.bind(this));
    }

    return AutoSubmitAjaxForm;
})(AjaxForm);