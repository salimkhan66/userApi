const express = require("express");
require("./db/connection");
require("dotenv").config();

const app = express();
const User = require("./Models/user");
app.use(express.urlencoded({ extended: false }));
const cookieParser = require("cookie-parser");
const userRoute = require("./Routes/UserRoute");
const { sendEmail } = require("./services/Email");
const port = process.env.PORT || 3000;
const { getRandom } = require("./utility/getRandom");

const bodyParser = require("body-parser");


app.use(express.json());
app.use(cookieParser());

app.use("/api/user", userRoute);



// ==========================================Register Route===============================

app.get("/home", (req, res) => {
  res.send(email(getRandom()));
});

app.use((req, resp) => {
  resp.status(200).json({ error: "The route you were looking was not found" });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
