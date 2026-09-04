# frozen_string_literal: true

require "webrick"
require "pathname"

root = File.expand_path(ARGV.fetch(0, "_site"))
port = Integer(ARGV.fetch(1, "4173"))
base_path = ARGV.fetch(2, "/kmp-lens-docs").sub(%r{/+\z}, "")

server = WEBrick::HTTPServer.new(
  BindAddress: "127.0.0.1",
  Port: port,
  AccessLog: [],
  Logger: WEBrick::Log.new($stderr, WEBrick::Log::WARN)
)

server.mount_proc("/") do |request, response|
  if request.path == base_path
    response.status = 301
    response["Location"] = "#{base_path}/"
    next
  end

  unless request.path.start_with?("#{base_path}/")
    response.status = 404
    next
  end

  relative = WEBrick::HTTPUtils.unescape(request.path.delete_prefix("#{base_path}/"))
  clean = Pathname.new(relative).cleanpath.to_s
  if clean == ".." || clean.start_with?("../")
    response.status = 404
    next
  end

  candidate = File.expand_path(clean == "." ? root : File.join(root, clean))
  candidate = File.join(candidate, "index.html") if File.directory?(candidate)
  unless candidate.start_with?("#{root}/") && File.file?(candidate)
    response.status = 404
    next
  end

  response.status = 200
  response["Content-Type"] = WEBrick::HTTPUtils.mime_type(
    File.extname(candidate),
    WEBrick::HTTPUtils::DefaultMimeTypes
  )
  response.body = File.binread(candidate)
end

trap("INT") { server.shutdown }
trap("TERM") { server.shutdown }
server.start
