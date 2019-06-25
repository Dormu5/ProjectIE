
const app = require("./app");
import config from './config/config';

// app.set('port', process.env.PORT || 8080);

const server = app.listen(config.server.port, () =>{
   console.log(`Listening on port ${server.address().port}`);
});
