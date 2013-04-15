define('LocationView', [
  'backbone',
  'underscore',
  'text!templates/locationView.html'
], function(Backbone, _, template) {
  var LocationView = Backbone.View.extend({
    events: {
      'click .edit'   : 'editInline',
      'click .cancel' : 'editInline',
      'click .submit' : 'updateModel'
    },

    initialize: function() {
      this.template = _.template(template);
      // Start in edit mode if we're a new model
      this.editing  = !this.model.id;
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
      });

      this.model.save();

      // Switch back to non-edit mode
      this.editInline();
    },

    render: function() {
      this.$el.html(this.template({
        editing: this.editing,
        location: this.model.toJSON()
      }));

      return this;
    }
  });

  return LocationView;
});
