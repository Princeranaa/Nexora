import app from "./src/app.js";
import config from "./src/config/config.js";
import {connectDB} from "./src/config/databse.js";
import http from 'http'
import { initliseSocektIO } from "./src/services/socket.service.js";
const server = http.createServer(app);
initliseSocektIO(server);

const PORT = config.PORT;





connectDB();

server.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
