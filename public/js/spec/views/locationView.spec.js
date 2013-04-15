define([
  'mocha',
  'LocationView',
  'FavoriteLocation'
], function(mocha, LocationView, FavoriteLocation) {
  describe('LocationView', function() {
    describe('with no data', function() {
      beforeEach(function() {
        this.view = new LocationView({ model: new FavoriteLocation() });
      });

      it('starts in edit mode', function() {
        expect(this.view.editing).to.be.true;
      });
    });

    describe('with a model', function() {
      beforeEach(function() {
        this.name = 'Treasure Island';
        this.model = new FavoriteLocation({
          name: this.name
        });

        this.view = new LocationView({ model: this.model });
        this.fragment = this.view.render().$el.html();
      });

      it('renders the name', function() {
        expect(this.fragment).to.have.string(this.name);
      });
    });

    describe('editing an existing model', function() {
      beforeEach(function() {
        this.model = new FavoriteLocation({
          id: Math.floor(Math.random() * 100),
          name: 'not a real place'
        });

        this.view = new LocationView({ model: this.model });
        this.fragment = this.view.render().$el.html();
      });

      it('has an edit button', function() {
        expect(this.fragment).to.have.string('Edit');
      });
    });
  });
});
