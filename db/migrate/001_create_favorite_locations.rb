Sequel.migration do
  up do
    create_table :favorite_locations do
      primary_key :id
      Float :latitude
      Float :longitude
      # This probably will never be > 255 characters, but we don't need to
      # index/do a text search on it so allowing overflow seems reasonable
      String :address, text: true
      String :name
    end
  end

  down do
    drop_table :favorite_locations
  end
end
