const express = require("express");
const loggerMiddleWare = require("morgan");
const cors = require("cors");
const { PORT } = require("./config/constants");
const authRouter = require("./routers/auth");
const artworkRouter = require("./routers/artworks");
const bodyParserMiddleWare = express.json();
const app = express();

app.use(loggerMiddleWare("dev"));
app.use(bodyParserMiddleWare);
app.use(cors());

if (process.env.DELAY) {
  app.use((req, res, next) => {
    setTimeout(() => next(), parseInt(process.env.DELAY));
  });
}

app.use("/", authRouter);
app.use("/artworks", artworkRouter);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Listening on port: ${PORT}`);
});
