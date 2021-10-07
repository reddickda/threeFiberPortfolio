const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.static(path.join(__dirname, "build")));

// This route serves the React app
app.get('/', (req, res) => res.sendFile(path.resolve(__dirname, "build", "index.html")));

app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
  });

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});