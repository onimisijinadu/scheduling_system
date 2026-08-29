const app = require("./app");
const dotenv = require("dotenv");

dotenv.config({
  path: "./.env",
});

const port = process.env.PORT || 3000;

app.listen(port, () =>
  console.log(`server has started on PORT http://localhost:${port} `),
);
