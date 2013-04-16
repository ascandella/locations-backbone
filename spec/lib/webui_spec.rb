require 'spec_helper'

describe WebUI do
  include Rack::Test::Methods

  let(:app) { WebUI }

  # Sanity check
  it 'works' do
    get '/'

    puts last_response.inspect
    last_response.should be_ok
  end

  describe 'JSON API' do
    describe '#index' do
      it 'works' do
        get '/api/locations'

        last_response.body.should == '[]'
      end

      context 'with a location' do
        let!(:location) do
          {
            name: 'for the tests',
            latitude: 42,
            longitude: 42
          }
        end

        before do
          FavoriteLocation.insert(location)
        end

        it 'returns the location' do
          get '/api/locations'

          last_response.body.should include location[:name]
        end
      end
    end
  end

  describe 'a non-existent page' do
    it 'returns a 404' do
      get '/cant/touch/this'

      last_response.status.should == 404
    end
  end
end
