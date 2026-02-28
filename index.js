import makeWASocket, { useMultiFileAuthState, DisconnectReason } from "@whiskeysockets/baileys";
import pino from "pino";
import fs from "fs";
import path from "path";
import config from "./config.js";
import handler from "./lib/handler.js";

async function startBot() {
    const sessionPath = "./sessions";
    if (!fs.existsSync(sessionPath)) fs.mkdirSync(sessionPath);

    const { state, saveCreds } = await useMultiFileAuthState(sessionPath);

    const sock = makeWASocket({
        logger: pino({ level: "silent" }),
        printQRInTerminal: true,
        auth: state,
        browser: ["BROKEN LORD MD", "Chrome", "1.0.0"]
    });

    sock.ev.on("creds.update", saveCreds);

    sock.ev.on("connection.update", async (update) => {
        const { connection, lastDisconnect } = update;

        if (connection === "close") {
            const reason = lastDisconnect?.error?.output?.statusCode;

            if (reason !== DisconnectReason.loggedOut) {
                console.log("Reconnecting...");
                startBot();
            } else {
                console.log("Logged out. Delete sessions and scan again.");
            }
        }

        if (connection === "open") {
            console.log("BROKEN LORD MD Connected Successfully!");
        }
    });

    sock.ev.on("messages.upsert", async (msg) => {
        await handler(sock, msg);
    });
}

startBot();
