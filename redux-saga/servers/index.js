process.env.DEV_PORT = 8080
process.env.API_PORT = 8081
process.env.WS_PORT = 8082
require('./dev')
require('./api')
require('./ws')