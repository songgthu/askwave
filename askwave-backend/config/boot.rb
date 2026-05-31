ENV["BUNDLE_GEMFILE"] ||= File.expand_path("../Gemfile", __dir__)

required_ruby_version = File.read(File.expand_path("../.ruby-version", __dir__)).strip.delete_prefix("ruby-")

if Gem::Version.new(RUBY_VERSION) != Gem::Version.new(required_ruby_version)
  abort <<~MSG
    AskWave backend requires Ruby #{required_ruby_version}, but you are using #{RUBY_VERSION}.
    Install the correct Ruby version, then rerun bin/rails or bin/setup.
  MSG
end

require "bundler/setup" # Set up gems listed in the Gemfile.
require "bootsnap/setup" # Speed up boot time by caching expensive operations.
