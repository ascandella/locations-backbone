define('LocationView', [
  'backbone',
  'underscore',
  'googlemaps',
  'text!templates/locationView.html'
], function(Backbone, _, maps, template) {
  var LocationView = Backbone.View.extend({
    events: {
      'keyup .address'          : 'goecodeAddress',
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
        address   : this.$('.address').val(),
        latitude  : this.$('.latitude').val(),
        longitude : this.$('.longitude').val(),
        name      : this.$('.name').val()
      }, { validate: true });

      if (this.model.validate(this.model.toJSON())) {
        return false;
      }

      this.model.save();

      // Switch back to non-edit mode
      this.editInline();
    },

    goecodeAddress: function() {
      var that = this,
          address = this.$('.address').val();

      if (this.geocoding) {
        return;
      }

      this.geocoding = true;
      maps.geoCode(address, function(results, error) {
        that.geocoding = false;
        if (!results.length) {
          return;
        }

        var bestMatch = results[0],
            position;

        if (!bestMatch.geometry || !bestMatch.geometry.location) {
          throw('invalid response received from google');
        }

        position = bestMatch.geometry.location;
        that.$('.latitude').val(position.lat());
        that.$('.longitude').val(position.lng());
      });
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
