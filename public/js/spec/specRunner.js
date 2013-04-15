define('SpecRunner', [
  'mocha',
  'chai',
  'spec/models/favoriteLocation.spec',
  'spec/views/index.spec',
  'spec/views/locationView.spec'
], function(mocha, chai) {
  window.assert = chai.assert;
  window.expect = chai.expect;
  chai.should(); // Extend all objects with .should()

  return {
    run: function() {
      mocha.run();

    }
  }
});
