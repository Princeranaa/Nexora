import app from "./src/app.js";
import config from "./src/config/config.js";
import {connectDB} from "./src/config/databse.js";

const PORT = config.PORT;

connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
