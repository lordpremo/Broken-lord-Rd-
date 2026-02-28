// server.js — Website + Pair Code API
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import makeWASocket, { useMultiFileAuthState, fetchLatestBaileysVersion } from "@whiskeysockets/baileys";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(express.static("public"));

let globalSock = null;

// START BOT + RETURN PAIR CODE
app.get("/pair", async (req, res) => {
    try {
        const { number } = req.query;
        if (!number) return res.json({ error: "Missing number" });

        const { state, saveCreds } = await useMultiFileAuthState("./session");
        const { version } = await fetchLatestBaileysVersion();

        const sock = makeWASocket({
            version,
            auth: state,
            printQRInTerminal: false,
            browser: ["BROKEN LORD MD", "Chrome", "1.0.0"]
        });

        globalSock = sock;

        sock.ev.on("creds.update", saveCreds);

        sock.ev.on("connection.update", (update) => {
            if (update.pairingCode) {
                return res.json({
                    number,
                    pairingCode: update.pairingCode,
                    qr: update.qr
                });
            }
        });

        await sock.requestPairingCode(number);

    } catch (e) {
        console.log("PAIR ERROR:", e);
        res.json({ error: "Failed to generate pair code" });
    }
});

// HOME PAGE
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

app.listen(3000, () => {
    console.log("🌍 BROKEN LORD MD Website running on port 3000");
});
