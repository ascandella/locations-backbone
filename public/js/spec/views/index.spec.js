define([
  'LocationListView'
], function(LocationListView) {
  describe('LocationListView', function() {
    beforeEach(function() {
      var that = this;
      this.view = new LocationListView({ collection: new Backbone.Collection() });

      this.fragment = function() {
        return that.view.render().$el.html();
      };
    });

    describe('with no locations', function() {
      it('prompts you to add', function() {
        expect(this.fragment()).to.have.string('any locations');
      });

      it('has a button', function() {
        expect(this.fragment()).to.have.string('add-location');
      });
    });
  });
});
