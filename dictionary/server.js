import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Serve script.js
app.get("/script.js", (req, res) => {
  res.sendFile(path.join(__dirname, "script.js"));
});

// API route
app.get("/searchword", async (req, res) => {
  const word = req.query.entry || "wat"; // default if no entry
  const url = `https://mashape-community-urban-dictionary.p.rapidapi.com/define?term=${word}`;

  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "773a90b179mshb951bd6ab8e54d6p11addbjsnd59747e4a137",
      "x-rapidapi-host": "mashape-community-urban-dictionary.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
