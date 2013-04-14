require 'bundler/setup'
require 'json'
require 'sequel'
require 'sinatra/base'

require 'configuration'

class WebUI < Sinatra::Base
  # Keeping files organized, otherwise it expects the `views` directory to be a
  # subdirectory of `lib`.
  set :root, File.join(File.dirname(__FILE__), '..')

  configure do
    Configuration.settings = settings
    Configuration.setup!
  end

  # Somewhat kludgy, but keeps the URLs nice without having to template out
  # anything server-side, since this Sinatra app is solely responsible for the
  # data access layer. No presentational logic here.
  get '/' do
    send_file File.join(settings.public_folder, 'index.html')
  end

  before '/api/*' do
    content_type :json
  end

  get '/api/locations' do
    # If this was a production app we'd have multi-user/pagination. Despite my
    # aversion to *ever* writing an endpoint that returns all rows in a table,
    # this seems like the right path for a demo app.
    FavoriteLocation.naked.all.to_json
  end

  post '/api/locations' do
    location = FavoriteLocation.create(JSON.parse(request.body.read))

    location.to_json
  end

  put '/api/locations/:id' do
    location = get_location

    # Generally this would need to be sanitized, but the fields on this model
    # are all user-accessible, so we take the easy road.
    location.update(JSON.parse(request.body.read))

    location.to_json
  end

  delete '/api/locations/:id' do
    location = get_location

    location.delete

    { message: 'successfully deleted' }.to_json
  end

  def get_location
    location = FavoriteLocation.where(id: params[:id]).first

    unless location
      halt({ error: true, message: 'not found' }.to_json)
    end

    location
  end
end
