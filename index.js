import app from "./src/config/server.config.js";

app.set(`port`, process.env.PORT);
app.listen(app.get(`port`));
console.log(`Server on port ${app.get(`port`)}`);
