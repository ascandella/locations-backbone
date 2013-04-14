# Not generally a nice thing to do, but Sinatra will assume we're in development
# if we don't specify this on the command line when running `rspec`.
ENV['RACK_ENV'] ||= 'test'

require_relative '../lib/webui'

require 'rack/test'

Configuration.setup!
