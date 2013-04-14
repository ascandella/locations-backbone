require 'sequel/extensions/migration'

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

      migrate!

      # Needs to wait until after we set up the database
      require 'models/favorite_location'
    end

  private

    def migrate!
      Sequel::Migrator.apply(db, 'db/migrate')
    end

    def database_url
      ENV['DATABASE_URL']
    end
  end
end
