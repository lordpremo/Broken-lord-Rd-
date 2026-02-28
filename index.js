// index.js — BROKEN LORD MD
import makeWASocket, {
    useMultiFileAuthState,
    DisconnectReason,
    fetchLatestBaileysVersion
} from "@whiskeysockets/baileys";
import pino from "pino";
import handler from "./handler.js";
import config from "./config.js";

async function startBot() {
    const { state, saveCreds } = await useMultiFileAuthState("./session");
    const { version } = await fetchLatestBaileysVersion();

    const sock = makeWASocket({
        version,
        auth: state,
        printQRInTerminal: true,
        logger: pino({ level: "silent" }),
        browser: ["BROKEN LORD MD", "Chrome", "1.0.0"]
    });

    console.log("🔥 BROKEN LORD MD is starting...");
    console.log("📲 Scan QR kwenye *Linked Devices* kuunganisha bot.");

    sock.ev.on("creds.update", saveCreds);

    sock.ev.on("connection.update", (update) => {
        const { connection, lastDisconnect } = update;
        if (connection === "close") {
            const shouldReconnect =
                lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;
            console.log("❌ Connection closed. Reconnect:", shouldReconnect);
            if (shouldReconnect) startBot();
        } else if (connection === "open") {
            console.log("✅ BROKEN LORD MD Connected!");
        }
    });

    sock.ev.on("messages.upsert", async ({ messages, type }) => {
        if (type !== "notify") return;
        const m = messages[0];
        if (!m.message) return;

        try {
            await handler(sock, m);
        } catch (e) {
            console.log("Handler error:", e);
        }
    });
}

startBot().catch((e) => console.log("Fatal error:", e));
