import express from "express";
import expressLayouts from "express-ejs-layouts";
import backendApp from "./modules/backend/routes/backend-app.js";
import frontendApp from "./modules/frontend/routes/frontend-app.js";

const app = express();

app.set("view engine", "ejs");

app.use(express.json(), express.urlencoded({ extended: true }), expressLayouts);

app.use(express.static("public"));

app.use("/api", backendApp);
app.use("/", frontendApp);

app.listen(3000, () => {
  console.log("listening to port 3000");
});
