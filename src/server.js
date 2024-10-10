const Hapi = require("@hapi/hapi");
const routing = require('./route')
const init = async () => {
  const server = Hapi.Server({
    port: 3000,
    host: "localhost",
    routes: {
        cors: {
            origin: ['*']
        }
      },


  });

  server.route(routing)
  await server.start();
  console.log(`server berjalan di ${server.info.uri}`);
};

init();
