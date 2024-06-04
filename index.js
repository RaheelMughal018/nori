import express from "express";
const app = express();
const PORT = 8000;
import urlRouter from "./routes/url.routes.js";
import DBconnection from "./configDB.js";

app.use(express.json());
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

DBconnection("mongodb://127.0.0.1:27017/")
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log("err: ", err);
  });

app.use("/url", urlRouter);
