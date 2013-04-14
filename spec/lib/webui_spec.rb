require 'spec_helper'

describe WebUI do
  include Rack::Test::Methods

  let(:app) { WebUI }

  # Sanity check
  it 'works' do
    get '/'

    last_response.should be_ok
  end

  describe 'JSON API' do
    describe '#index' do
      it 'works' do
        get '/api/locations'

        last_response.body.should == '[]'
      end

      context 'with a location' do
        let(:location) do
          {
            name: 'for the tests',
            latitude: 42,
            longitude: 42
          }
        end

        before do
          FavoriteLocation.create(location)
        end

        it 'returns the location' do
          get '/api/locations'

          last_response.body.should include location[:name]
        end
      end
    end

    describe 'creating a new record' do
      let(:location) do
        {
          name: 'newly created',
          latitude: 1,
          longitude: 2
        }
      end

      it 'creates the model with an id' do
        post '/api/locations', location: location.to_json

        created = JSON.parse(last_response.body)
        created[:name].should == location[:name]
        created[:id].should_not be_nil
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
