
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import qrcode from "qrcode";
import makeWASocket, { useMultiFileAuthState } from "@whiskeysockets/baileys";
import pino from "pino";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, "public")));

app.get("/generate", async (req, res) => {
  try {
    const number = (req.query.number || "").trim();

    if (!number) {
      return res.status(400).json({ error: "Number is required" });
    }

    // Create separate session per number
    const sessionPath = path.join(__dirname, "sessions", number);
    const { state, saveCreds } = await useMultiFileAuthState(sessionPath);

    const sock = makeWASocket({
      logger: pino({ level: "silent" }),
      printQRInTerminal: false,
      auth: state,
      browser: ["BROKEN LORD DR", "Chrome", "1.0.0"]
    });

    sock.ev.on("creds.update", saveCreds);

    // Generate pairing code
    let pairCode = null;

    try {
      pairCode = await sock.requestPairingCode(number);
    } catch (e) {
      console.log("Error requesting pairing code:", e.message);
    }

    // Generate QR from pairing code (so user has both options)
    let qrImage = null;
    if (pairCode) {
      qrImage = await qrcode.toDataURL(pairCode);
    }

    // Close socket after generating
    setTimeout(() => {
      try {
        sock.end();
      } catch {}
    }, 5000);

    return res.json({
      success: true,
      number,
      pairCode: pairCode || null,
      qrImage: qrImage || null
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`BROKEN LORD DR Pair Server running on port ${PORT}`);
});
