import config from "../config.js";

export default async function handler(sock, msg) {
    try {
        const m = msg.messages[0];
        if (!m.message) return;

        const sender = m.key.remoteJid;
        const fromMe = m.key.fromMe;

        const text = m.message.conversation ||
                     m.message.extendedTextMessage?.text ||
                     "";

        const prefixUsed = config.prefix.find(p => text.startsWith(p));
        if (!prefixUsed) return;

        const command = text.slice(prefixUsed.length).trim().split(" ")[0].toLowerCase();
        const args = text.split(" ").slice(1);

        const runtimeOwner = m.key.participant || sender;

        const isOwner = fromMe || runtimeOwner.includes(config.projectOwner.number);

        // OWNER COMMAND
        if (command === "owner") {
            await sock.sendMessage(sender, {
                text: `*OWNER INFORMATION*\n\n` +
                      `• Name: ${config.projectOwner.name}\n` +
                      `• Number: ${config.projectOwner.number}\n` +
                      `• Prefix: ${config.defaultPrefix}`
            });
            return;
        }

        // MENU COMMAND
        if (command === "menu") {
            await sock.sendMessage(sender, {
                image: { url: "https://upcdn.io/kW2K8mM/raw/uploads/2026/02/17/4j9r78e4Jt-image.jpg%20(20).png" },
                caption: `
┏▣ ◈ *${config.bot.name}* ◈
┃ *Owner*: ${config.projectOwner.name}
┃ *Prefix*: ${config.defaultPrefix}
┃ *Mode*: ${config.bot.mode}
┃ *Version*: ${config.bot.version}
┗▣

Andika command yoyote kuendelea...
                `
            });
            return;
        }

    } catch (e) {
        console.log("Handler error:", e);
    }
}
