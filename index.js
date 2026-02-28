import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import qrcode from "qrcode";
import makeWASocket, { useMultiFileAuthState } from "@whiskeysockets/baileys";
import pino from "pino";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5000;

// hakikisha sessions folder ipo
if (!fs.existsSync("./sessions")) fs.mkdirSync("./sessions");

// serve frontend
app.use(express.static(path.join(__dirname, "public")));

app.get("/generate", async (req, res) => {
  try {
    const number = (req.query.number || "").trim();

    if (!number) {
      return res.status(400).json({ error: "Number is required" });
    }

    const sessionPath = path.join(__dirname, "sessions", number);
    const { state, saveCreds } = await useMultiFileAuthState(sessionPath);

    const sock = makeWASocket({
      logger: pino({ level: "silent" }),
      printQRInTerminal: false,
      auth: state,
      browser: ["BROKEN LORD DR", "Chrome", "1.0.0"]
    });

    sock.ev.on("creds.update", saveCreds);

    let pairCode = null;
    let qrImage = null;

    try {
      pairCode = await sock.requestPairingCode(number);
      if (pairCode) {
        qrImage = await qrcode.toDataURL(pairCode);
      }
    } catch (e) {
      console.log("Pairing error:", e.message);
    }

    setTimeout(() => {
      try { sock.end(); } catch {}
    }, 3000);

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
