// handler.js — BROKEN LORD MD
import config from "./config.js";
import menuPlugin from "./plugins/menu.js";
import groupPlugin from "./plugins/group.js";
import ownerPlugin from "./plugins/owner.js";
import settingsPlugin from "./plugins/settings.js";
import toolsPlugin from "./plugins/tools.js";
import downloadPlugin from "./plugins/download.js";

export default async function handler(sock, m) {
    try {
        const from = m.key.remoteJid;
        const isGroup = from.endsWith("@g.us");
        const senderJid = m.key.participant || m.key.remoteJid;
        const text = m.message?.conversation ||
                     m.message?.extendedTextMessage?.text ||
                     m.message?.imageMessage?.caption ||
                     m.message?.videoMessage?.caption ||
                     "";

        // =============================
        // PREFIX SYSTEM
        // =============================
        const prefixes = [".", "!", "/"];
        let prefix = null;

        for (const p of prefixes) {
            if (text.startsWith(p)) {
                prefix = p;
                break;
            }
        }

        if (!prefix) return; // sio command

        const body = text.slice(prefix.length).trim();
        const args = body.split(" ");
        const command = args.shift().toLowerCase();

        // =============================
        // OWNER DETECTION
        // =============================
        const runtimeOwner = sock.user.id.split(":")[0] + "@s.whatsapp.net";
        const isRuntimeOwner = senderJid === runtimeOwner;

        // =============================
        // DATABASE (GROUP SETTINGS)
        // =============================
        if (!global.db) global.db = { groups: {} };
        if (isGroup && !global.db.groups[from]) {
            global.db.groups[from] = {
                antilink: false,
                antibadword: false,
                antidelete: false
            };
        }

        const groupSettings = global.db.groups[from] || {};
        const saveDB = () => {};

        // =============================
        // PROTECTIONS (antilink, antibadword, antidelete)
        // =============================
        if (isGroup) {
            await groupPlugin.protectMessage({
                sock,
                m,
                text,
                from,
                senderJid,
                groupSettings
            });
        }

        // =============================
        // ROUTING TO PLUGINS
        // =============================

        // MENU
        await menuPlugin.handleCommand({
            sock, from, senderJid, isRuntimeOwner, command, args, m, prefix, mode: config.mode
        });

        // GROUP
        if (isGroup) {
            await groupPlugin.handleCommand({
                sock, from, senderJid, isRuntimeOwner, command, args, groupSettings, db: global.db, saveDB, m
            });
        }

        // OWNER
        await ownerPlugin.handleCommand({
            sock, from, senderJid, isRuntimeOwner, command, args, m
        });

        // SETTINGS
        await settingsPlugin.handleCommand({
            sock, from, senderJid, isRuntimeOwner, command, args
        });

        // TOOLS
        await toolsPlugin.handleCommand({
            sock, from, senderJid, isRuntimeOwner, command, args, m
        });

        // DOWNLOAD
        await downloadPlugin.handleCommand({
            sock, from, senderJid, isRuntimeOwner, command, args, m
        });

    } catch (e) {
        console.log("Handler Error:", e);
    }
}
