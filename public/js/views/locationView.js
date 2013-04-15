define('LocationView', [
  'backbone',
  'underscore',
  'text!templates/locationView.html'
], function(Backbone, _, template) {
  var LocationView = Backbone.View.extend({
    events: {
      'click .edit'             : 'editInline',
      'click .cancel'           : 'cancelInline',
      'click .cancel-deletion'  : 'cancelDeletion',
      'click .confirm-deletion' : 'actuallyDelete',
      'click .delete'           : 'confirmDeletion',
      'click .submit'           : 'updateModel'
    },

    initialize: function() {
      this.template = _.template(template);
      // Start in edit mode if we're a new model
      this.editing  = !this.model.id;
    },

    actuallyDelete: function() {
      var that = this;
      this.model.destroy();
      this.$el.slideUp(function() {
        that.$el.remove();
      });
    },

    confirmDeletion: function() {
      this.toggleDangerZone();
    },

    cancelDeletion: function() {
      this.toggleDangerZone();
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
      if (this.editing && !this.id) {
        return this.remove();
      }

      return this.editInline();
    },

    editInline: function() {
      this.editing = !this.editing;

      this.render();
    },

    updateModel: function() {
      this.$el.removeClass('error');

      // This doesn't feel awesome
      this.model.set({
        address   : this.$el.find('.address').val(),
        latitude  : this.$el.find('.latitude').val(),
        longitude : this.$el.find('.longitude').val(),
        name      : this.$el.find('.name').val()
      });

      if (!this.model.validate()) {
        this.$el.addClass('error');
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
      }));

      this.$el.find('.alert')
          .hide()
          .removeClass('hide');

      return this;
    }
  });

  return LocationView;
});
