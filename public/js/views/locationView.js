define('LocationView', [
  'backbone',
  'underscore',
  'text!templates/locationView.html'
], function(Backbone, _, template) {
  var LocationView = Backbone.View.extend({
    events: {
      'click .edit'             : 'editInline',
      'click .cancel'           : 'cancelInline',
      'click .cancel-deletion'  : 'toggleDangerZone',
      'click .confirm-deletion' : 'actuallyDelete',
      'click .delete'           : 'toggleDangerZone',
      'click .submit'           : 'updateModel'
    },

    initialize: function() {
      this.template = _.template(template);
      // Start in edit mode if we're a new model
      this.editing  = !this.model.id;

      this.listenTo(this.model, 'invalid', this.invalidForm);
      this.listenTo(this.model, 'valid', this.validForm);
    },

    actuallyDelete: function() {
      var that = this;
      this.model.destroy();
      this.$el.slideUp(function() {
        that.$el.remove();
      });
    },

    toggleDangerZone: function() {
      this.$el.find('.alert')
          .slideToggle()
          .end()
        .find('.controls')
          .slideToggle();
    },

    cancelInline: function() {
      // They hit 'Cancel' on creating a new entry
      if (this.editing && !this.model.id) {
        return this.remove();
      }

      return this.editInline();
    },

    editInline: function() {
      this.editing = !this.editing;

      this.render();
    },

    updateModel: function() {

      // This doesn't feel awesome
      this.model.set({
        address   : this.$el.find('.address').val(),
        latitude  : this.$el.find('.latitude').val(),
        longitude : this.$el.find('.longitude').val(),
        name      : this.$el.find('.name').val()
      }, { validate: true });

      if (this.model.validate(this.model.toJSON())) {
        return false;
      }

      this.model.save();

      // Switch back to non-edit mode
      this.editInline();
    },

    render: function() {
      this.$el.html(this.template({
        editing: this.editing,
        location: this.model.toJSON()
      }))
        .find('input:first').focus();


      this.$el.find('.alert')
          .hide()
          .removeClass('hide');

      return this;
    },

    invalidForm: function() {
      this.$el.addClass('error');
    },

    validForm: function() {
      this.$el.removeClass('error');
    }
  });

  return LocationView;
});
