# config valid for current version and patch releases of Capistrano
lock "~> 3.16.0"

set :application, "black_rhinos"
set :repo_url, "git@github.com:warpas/black_rhinos.git"

# Default branch is :master
# ask :branch, `git rev-parse --abbrev-ref HEAD`.chomp

# Default deploy_to directory is /var/www/my_app_name
set :deploy_to, ENV.fetch("APP_DEPLOY_PATH")

# Default value for :format is :airbrussh.
# set :format, :airbrussh

# You can configure the Airbrussh format using :format_options.
# These are the defaults.
# set :format_options, command_output: true, log_file: "log/capistrano.log", color: :auto, truncate: :auto

# Default value for :pty is false
# set :pty, true

# Default value for :linked_files is []
# append :linked_files, "config/database.yml"

# Default value for linked_dirs is []
# append :linked_dirs, "log", "tmp/pids", "tmp/cache", "tmp/sockets", "public/system"

# Default value for default_env is {}
# set :default_env, { path: "/opt/ruby/bin:$PATH" }

# Default value for local_user is ENV['USER']
# set :local_user, -> { `git config user.name`.chomp }

# Default value for keep_releases is 5
# set :keep_releases, 5

# Uncomment the following to require manually verifying the host key before first deploy.
# set :ssh_options, verify_host_key: :secure

# Settings from https://github.com/capistrano/rails
set :migration_role, :app

# set :env_file, '.env'
# append :linked_files, ".env"
# invoke 'dotenv:read'

# # If the environment differs from the stage name
# set :rails_env, 'staging'

# # Defaults to :db role
# set :migration_role, :db

# # Defaults to the primary :db server
# set :migration_servers, -> { primary(fetch(:migration_role)) }

# # Defaults to `db:migrate`
# set :migration_command, 'db:migrate'

# # Defaults to false
# # Skip migration if files in db/migrate were not modified
# set :conditionally_migrate, true

# # Defaults to [:web]
# set :assets_roles, [:web, :app]

# # Defaults to 'assets'
# # This should match config.assets.prefix in your rails config/application.rb
# set :assets_prefix, 'prepackaged-assets'

# # Defaults to ["/path/to/release_path/public/#{fetch(:assets_prefix)}/.sprockets-manifest*", "/path/to/release_path/public/#{fetch(:assets_prefix)}/manifest*.*"]
# # This should match config.assets.manifest in your rails config/application.rb
# set :assets_manifests, ['app/assets/config/manifest.js']

# # RAILS_GROUPS env value for the assets:precompile task. Default to nil.
# set :rails_assets_groups, :assets

# # If you need to touch public/images, public/javascripts, and public/stylesheets on each deploy
# set :normalize_asset_timestamps, %w{public/images public/javascripts public/stylesheets}

# # Defaults to nil (no asset cleanup is performed)
# # If you use Rails 4+ and you'd like to clean up old assets after each deploy,
# # set this to the number of versions to keep
# set :keep_assets, 2

append :linked_files, "config/master.key"

namespace :deploy do
  namespace :check do
    before :linked_files, :set_master_key do
      on roles(:app), in: :sequence, wait: 10 do
        unless test("[ -f #{shared_path}/config/master.key ]")
          upload! 'config/master.key', "#{shared_path}/config/master.key"
        end
      end
    end
  end
end
