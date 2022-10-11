import app from "./src/config/server.config.js";
import { config } from "dotenv";
config();

app.set(`port`, process.env.PORT);
app.listen(app.get(`port`));
console.log(`Server on port ${app.get(`port`)}`);
