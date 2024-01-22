const { default: mongoose } = require("mongoose");
const { MONGODB_URI, PORT } = require("./Utils/config");
const app = require("./app");

mongoose.set("strictQuery", false);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server running on http://127.0.0.1:${PORT}`);
    });
  })
  .catch((err) => {
    console.log("err connecting to MongoDB", err);
  });
