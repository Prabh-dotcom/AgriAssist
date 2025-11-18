// server.js
import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Backend Proxy Route
app.get("/api/market-price", async (req, res) => {
  const { commodity, state, market } = req.query;

  if (!commodity || !state || !market) {
    return res.status(400).json({ error: "Missing parameters." });
  }

  try {
    // CEDA/Agmarknet dataset endpoint (example source)
    const apiUrl = `https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?api-key=579b464db66ec23bdd000001f5363ab688e046c45f8c3dc26f65528b&format=json&filters[commodity]=${commodity}&filters[state]=${state}&filters[market]=${market}`;

    const response = await fetch(apiUrl);
    const data = await response.json();

    if (!data.records || data.records.length === 0) {
      return res.status(404).json({ error: "No data found." });
    }

    res.json(data.records);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error fetching data." });
  }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
