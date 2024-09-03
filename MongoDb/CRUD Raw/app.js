const express = require("express");
const app = express();
const port = 3000;
const userModel = require("./userModel");
app.get("/", (req, res) => res.send("Hello World!"));

app.get("/create", async (req, res) => {
  const userCreated = await userModel.create({
    name: "Samar Shaikh",
    userName: "Samar",
    email: "samar@ayaan.com",
  });
  res.send(userCreated);
});

app.get("/update", async (req, res) => {
  const userCreated = await userModel.findOneAndUpdate(
    { userName: "Samar" },
    { name: "Samar_20" },
    { new: true }
  );
  res.send(userCreated);
});
app.get("/read", async (req, res) => {
  const userCreated = await userModel.find();
  res.send(userCreated);
});
app.get("/delete", async (req, res) => {
  const userCreated = await userModel.findOneAndDelete({ name: "Samar_20" });
  res.send(userCreated);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
