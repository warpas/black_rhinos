# Black Rhinos

## What is this repo?

**Description to be added**

## Getting Started

- Make sure you have Ruby on Rails installed
  - On Windows I recommend [RailsInstaller](http://railsinstaller.org)
  - On Mac and Linux I recommend installation through [ASDF](https://github.com/asdf-vm/asdf)
- Make sure you have Postgres installed. I suggest to get the version from the `.tool-versions` file.
  - You could use [this guide](https://learnsql.com/blog/how-to-install-postgresql-on-windows-in-5-minutes/) for Windows 10. Once you open pgAdmin you can set the master password.
  - It's a bit different on Mac & Linux. I suggest using your favourite package manager (apt, brew, asdf).
- Create `config/database.yml`. Use `config/database.yml.example`
- Run `bundle install` in the project directory
- Create and migrate the database `bundle exec rails db:create` and `bundle exec rails db:migrate` in the project directory
- Install JS dependencies with `bundle exec rails webpacker:install` in the project directory
- Run webpacker with `bundle exec rails webpacker:install` in the project directory
- Once the configuration above is complete you can start the application server with `bundle exec rails server`

## Old README to incorporate

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...
