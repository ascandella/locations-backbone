# Favorite Locations

A simple demo app using [Sinatra](http://www.sinatrarb.com/),
[Backbone](http://backbonejs.org/), and a handful of other helpful libraries.
Written by [Aiden Scandella](https://github.com/sectioneight) one sunny weekend
in April 2013.

## Tests

There are two sets of tests: one for the API/backend, written in rspec; the
other for the backbone frontend.

To run the backend tests:

    rspec

This is not a comprehensive set of integration tests, but rather a safety
harness providing for easy refactoring. I did not, for example, test the ins and
outs of the `sequel` gem, since I trust that its finders have proper spec
coverage in the gem itself.


