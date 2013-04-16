module Configuration
  class << self
    attr_accessor :settings
    attr_reader :db

    def setup!
      return if @setup

      if url = database_url
        @db = Sequel.connect(url)
      elsif settings.environment == :test
        @db = Sequel.connect('sqlite:/')
      else
        fail "no database configured for env: #{settings.environment}"
      end

      # Needs to wait until after we set up the database
      require 'models/favorite_location'

      @setup = true
    end

    # Usually only called from test code. Could be useful to auto-migrate if the
    # schema was frequently changing and we really trusted ourselves.
    def migrate!
      require 'sequel/extensions/migration'
      Sequel::Migrator.apply(db, 'db/migrate')
    end

  private

    def database_url
      ENV['DATABASE_URL']
    end
  end
end
