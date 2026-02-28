// plugins/settings.js
import config from "../config.js";
import fs from "fs-extra";

const settingsFile = "./settings.json";
let settings = {};

if (fs.existsSync(settingsFile)) {
    settings = JSON.parse(fs.readFileSync(settingsFile));
} else {
    settings = {
        alwaysonline: false,
        antibug: false,
        anticall: false,
        antidelete: false,
        antiedit: false,
        antiviewonce: false,
        autobio: false,
        autoblock: false,
        autoreact: false,
        autoread: false,
        autorecord: false,
        autotype: false,
        autoviewstatus: false,
        chatbot: false,
        timezone: "Africa/Dar_es_Salaam",
        menuImage: "default",
        botName: config.bot.name,
        ownerName: config.projectOwner.name,
        ownerNumber: config.projectOwner.number,
        prefix: config.defaultPrefix
    };
    fs.writeFileSync(settingsFile, JSON.stringify(settings, null, 2));
}

function saveSettings() {
    fs.writeFileSync(settingsFile, JSON.stringify(settings, null, 2));
}

export default {
    async handleCommand({ sock, from, senderJid, isRuntimeOwner, command, args }) {

        // Only owner (aliye-pair) anaweza kutumia SETTINGS
        if (!isRuntimeOwner) {
            await sock.sendMessage(from, { text: "❌ Command hii ni ya OWNER pekee." });
            return;
        }

        // Helper function
        const toggle = async (key, label) => {
            const opt = (args[0] || "").toLowerCase();
            if (!["on", "off"].includes(opt)) {
                await sock.sendMessage(from, { text: `⚙️ Tumia: .${command} on/off` });
                return;
            }
            settings[key] = opt === "on";
            saveSettings();
            await sock.sendMessage(from, { text: `✅ ${label} imewekwa: *${opt.toUpperCase()}*\nPOWERED BY BROKEN LORD` });
        };

        // =============================
        // SETTINGS TOGGLES
        // =============================

        if (command === "alwaysonline") return toggle("alwaysonline", "ALWAYS ONLINE");
        if (command === "antibug") return toggle("antibug", "ANTIBUG");
        if (command === "anticall") return toggle("anticall", "ANTICALL");
        if (command === "antidelete") return toggle("antidelete", "ANTIDELETE");
        if (command === "antiedit") return toggle("antiedit", "ANTIEDIT");
        if (command === "antiviewonce") return toggle("antiviewonce", "ANTIVIEWONCE");
        if (command === "autobio") return toggle("autobio", "AUTOBIO");
        if (command === "autoblock") return toggle("autoblock", "AUTOBLOCK");
        if (command === "autoreact") return toggle("autoreact", "AUTOREACT");
        if (command === "autoread") return toggle("autoread", "AUTOREAD");
        if (command === "autorecord") return toggle("autorecord", "AUTORECORD");
        if (command === "autotype") return toggle("autotype", "AUTOTYPE");
        if (command === "autoviewstatus") return toggle("autoviewstatus", "AUTOVIEWSTATUS");
        if (command === "chatbot") return toggle("chatbot", "CHATBOT");

        // =============================
        // SET PREFIX
        // =============================
        if (command === "setprefix") {
            const p = args[0];
            if (!p) {
                await sock.sendMessage(from, { text: "⚙️ Tumia: .setprefix !" });
                return;
            }
            settings.prefix = p;
            config.defaultPrefix = p;
            saveSettings();
            await sock.sendMessage(from, { text: `🔧 Prefix mpya: *${p}*\nPOWERED BY BROKEN LORD` });
            return;
        }

        // =============================
        // SET BOT NAME
        // =============================
        if (command === "setbotname") {
            const name = args.join(" ");
            if (!name) {
                await sock.sendMessage(from, { text: "⚙️ Tumia: .setbotname BROKEN LORD MD" });
                return;
            }
            settings.botName = name;
            config.bot.name = name;
            saveSettings();
            await sock.sendMessage(from, { text: `🤖 Bot name limebadilishwa kuwa:\n*${name}*\nPOWERED BY BROKEN LORD` });
            return;
        }

        // =============================
        // SET OWNER NAME
        // =============================
        if (command === "setownername") {
            const name = args.join(" ");
            if (!name) {
                await sock.sendMessage(from, { text: "⚙️ Tumia: .setownername BROKENLORD" });
                return;
            }
            settings.ownerName = name;
            config.projectOwner.name = name;
            saveSettings();
            await sock.sendMessage(from, { text: `👑 Owner name limebadilishwa kuwa:\n*${name}*\nPOWERED BY BROKEN LORD` });
            return;
        }

        // =============================
        // SET OWNER NUMBER
        // =============================
        if (command === "setownernumber") {
            const num = args[0]?.replace(/[^0-9]/g, "");
            if (!num) {
                await sock.sendMessage(from, { text: "⚙️ Tumia: .setownernumber 2557XXXXXXX" });
                return;
            }
            settings.ownerNumber = num;
            config.projectOwner.number = num;
            saveSettings();
            await sock.sendMessage(from, { text: `📞 Owner number limebadilishwa kuwa:\n*${num}*\nPOWERED BY BROKEN LORD` });
            return;
        }

        // =============================
        // SET TIMEZONE
        // =============================
        if (command === "settimezone") {
            const tz = args[0];
            if (!tz) {
                await sock.sendMessage(from, { text: "⚙️ Tumia: .settimezone Africa/Dar_es_Salaam" });
                return;
            }
            settings.timezone = tz;
            saveSettings();
            await sock.sendMessage(from, { text: `⏰ Timezone imewekwa: *${tz}*\nPOWERED BY BROKEN LORD` });
            return;
        }

        // =============================
        // SET MENU IMAGE
        // =============================
        if (command === "setmenuimage") {
            const url = args[0];
            if (!url || !url.startsWith("http")) {
                await sock.sendMessage(from, { text: "⚙️ Tumia: .setmenuimage https://image-url" });
                return;
            }
            settings.menuImage = url;
            saveSettings();
            await sock.sendMessage(from, { text: `🖼️ Menu image imebadilishwa.\nPOWERED BY BROKEN LORD` });
            return;
        }

        // =============================
        // GET SETTINGS
        // =============================
        if (command === "getsettings") {
            await sock.sendMessage(from, {
                text: `⚙️ *CURRENT SETTINGS*\n\n${Object.entries(settings)
                    .map(([k, v]) => `• ${k}: ${v}`)
                    .join("\n")}\n\nPOWERED BY BROKEN LORD`
            });
            return;
        }

        // =============================
        // RESET SETTINGS
        // =============================
        if (command === "resetsetting") {
            fs.unlinkSync(settingsFile);
            await sock.sendMessage(from, { text: "♻️ Settings zote zimerudishwa default.\nPOWERED BY BROKEN LORD" });
            return;
        }
    }
};
