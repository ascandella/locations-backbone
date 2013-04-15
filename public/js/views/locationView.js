define('LocationView', [
  'backbone',
  'underscore',
  'text!templates/locationView.html'
], function(Backbone, _, template) {
  var LocationView = Backbone.View.extend({
    initialize: function() {
      this.template = _.template(template);
    },

    render: function() {
      this.$el.html(this.template({
        location: this.model.toJSON()
      }));

      return this;
    }
  });

  return LocationView;
});
