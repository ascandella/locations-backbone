require 'bundler/setup'
require 'json'
require 'sass'
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

  get '/api/locations' do
    content_type :json
    # If this was a production app we'd have multi-user/pagination. Despite my
    # aversion to *ever* writing an endpoint that returns all rows in a table,
    # this seems like the right path for a demo app.
    FavoriteLocation.naked.all.to_json
  end
end
