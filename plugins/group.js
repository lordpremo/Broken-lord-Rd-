// plugins/group.js
import config from "../config.js";
import fs from "fs-extra";

// =============================
// BADWORD STORAGE
// =============================
const badwordFile = "./badwords.json";
let badwords = [];

if (fs.existsSync(badwordFile)) {
    badwords = JSON.parse(fs.readFileSync(badwordFile));
} else {
    badwords = ["fuck", "shit", "tukana"]; 
    fs.writeFileSync(badwordFile, JSON.stringify(badwords, null, 2));
}

function saveBadwords() {
    fs.writeFileSync(badwordFile, JSON.stringify(badwords, null, 2));
}

// =============================
// HELPERS
// =============================
function containsLink(text) {
    if (!text) return false;
    const regex = /(https?:\/\/|chat\.whatsapp\.com|wa\.me\/|t\.me\/|facebook\.com|instagram\.com|tiktok\.com|x\.com)/i;
    return regex.test(text);
}

function containsBadword(text) {
    if (!text) return false;
    const lower = text.toLowerCase();
    return badwords.some((w) => lower.includes(w));
}

async function getMetadata(sock, jid) {
    try {
        return await sock.groupMetadata(jid);
    } catch {
        return null;
    }
}

function isAdmin(user, metadata) {
    if (!metadata) return false;
    const admins = metadata.participants.filter((p) => p.admin !== null).map((p) => p.id);
    return admins.includes(user);
}

function isBotAdmin(sock, metadata) {
    if (!metadata) return false;
    const bot = metadata.participants.find((p) => p.id === sock.user.id);
    return bot && bot.admin !== null;
}

// =============================
// PROTECTIONS
// =============================
async function protectMessage({ sock, m, text, from, senderJid, groupSettings }) {
    const metadata = await getMetadata(sock, from);
    const botIsAdmin = isBotAdmin(sock, metadata);

    // ANTILINK
    if (groupSettings.antilink && containsLink(text)) {
        if (botIsAdmin) {
            await sock.sendMessage(from, {
                text: `⚠️ *ANTILINK*: @${senderJid.split("@")[0]} ametuma link, anafutwa.`,
                mentions: [senderJid]
            });
            await sock.groupParticipantsUpdate(from, [senderJid], "remove");
        } else {
            await sock.sendMessage(from, {
                text: `⚠️ ANTILINK imewashwa lakini mimi si admin.`,
            });
        }
        return;
    }

    // ANTIBADWORD
    if (groupSettings.antibadword && containsBadword(text)) {
        if (botIsAdmin) {
            await sock.sendMessage(from, {
                text: `⚠️ *ANTIBADWORD*: @${senderJid.split("@")[0]} ametukana, anafutwa.`,
                mentions: [senderJid]
            });
            await sock.groupParticipantsUpdate(from, [senderJid], "remove");
        } else {
            await sock.sendMessage(from, {
                text: `⚠️ ANTIBADWORD imewashwa lakini mimi si admin.`,
            });
        }
        return;
    }

    // ANTIDELETE (placeholder)
}

// =============================
// GROUP COMMANDS
// =============================
async function handleCommand({
    sock,
    from,
    senderJid,
    isRuntimeOwner,
    command,
    args,
    groupSettings,
    db,
    saveDB,
    m
}) {
    const metadata = await getMetadata(sock, from);
    if (!metadata) return;

    const botIsAdmin = isBotAdmin(sock, metadata);
    const userIsAdmin = isAdmin(senderJid, metadata);
    const privileged = userIsAdmin || isRuntimeOwner;

    // Commands requiring admin
    const adminNeeded = ["add", "kick", "promote", "demote", "tagall", "hidetag", "resetlink"];

    if (adminNeeded.includes(command) && !botIsAdmin) {
        await sock.sendMessage(from, { text: "❌ Mimi si admin kwenye group hili." });
        return;
    }

    if (!privileged) {
        await sock.sendMessage(from, { text: "❌ Command hii inahitaji admin wa group au owner wa bot." });
        return;
    }

    // =============================
    // IMPLEMENTATION
    // =============================

    // antilink
    if (command === "antilink") {
        const opt = (args[0] || "").toLowerCase();
        if (!["on", "off"].includes(opt)) {
            await sock.sendMessage(from, { text: "⚙️ Tumia: .antilink on/off" });
            return;
        }
        groupSettings.antilink = opt === "on";
        db.groups[from] = groupSettings;
        saveDB();
        await sock.sendMessage(from, { text: `✅ ANTILINK: *${opt.toUpperCase()}*\nPOWERED BY BROKEN LORD` });
        return;
    }

    // antibadword
    if (command === "antibadword") {
        const opt = (args[0] || "").toLowerCase();
        if (!["on", "off"].includes(opt)) {
            await sock.sendMessage(from, { text: "⚙️ Tumia: .antibadword on/off" });
            return;
        }
        groupSettings.antibadword = opt === "on";
        db.groups[from] = groupSettings;
        saveDB();
        await sock.sendMessage(from, { text: `✅ ANTIBADWORD: *${opt.toUpperCase()}*\nPOWERED BY BROKEN LORD` });
        return;
    }

    // addbadword
    if (command === "addbadword") {
        const word = args.join(" ").trim().toLowerCase();
        if (!word) return sock.sendMessage(from, { text: "⚙️ Tumia: .addbadword neno" });

        if (!badwords.includes(word)) {
            badwords.push(word);
            saveBadwords();
        }

        await sock.sendMessage(from, { text: `✅ Badword imeongezwa: *${word}*\nPOWERED BY BROKEN LORD` });
        return;
    }

    // deletebadword
    if (command === "deletebadword") {
        const word = args.join(" ").trim().toLowerCase();
        if (!word) return sock.sendMessage(from, { text: "⚙️ Tumia: .deletebadword neno" });

        badwords = badwords.filter((w) => w !== word);
        saveBadwords();

        await sock.sendMessage(from, { text: `🗑️ Badword imefutwa: *${word}*\nPOWERED BY BROKEN LORD` });
        return;
    }

    // listbadword
    if (command === "listbadword") {
        if (!badwords.length) {
            await sock.sendMessage(from, { text: "📃 Hakuna badwords." });
            return;
        }
        await sock.sendMessage(from, {
            text: `📃 *BADWORDS LIST:*\n${badwords.map((w, i) => `${i + 1}. ${w}`).join("\n")}\n\nPOWERED BY BROKEN LORD`
        });
        return;
    }

    // add
    if (command === "add") {
        const num = args[0]?.replace(/[^0-9]/g, "");
        if (!num) return sock.sendMessage(from, { text: "⚙️ Tumia: .add 2557XXXXXXX" });

        await sock.groupParticipantsUpdate(from, [`${num}@s.whatsapp.net`], "add");
        await sock.sendMessage(from, { text: `➕ Nimejaribu kumuingiza: *${num}*\nPOWERED BY BROKEN LORD` });
        return;
    }

    // kick
    if (command === "kick") {
        const quoted = m?.message?.extendedTextMessage?.contextInfo?.participant;
        const target = quoted || `${args[0]?.replace(/[^0-9]/g, "")}@s.whatsapp.net`;

        if (!target) return sock.sendMessage(from, { text: "⚙️ Tumia: .kick @member" });

        await sock.groupParticipantsUpdate(from, [target], "remove");
        await sock.sendMessage(from, { text: `❌ Member ameondolewa.\nPOWERED BY BROKEN LORD` });
        return;
    }

    // promote
    if (command === "promote") {
        const quoted = m?.message?.extendedTextMessage?.contextInfo?.participant;
        const target = quoted || `${args[0]?.replace(/[^0-9]/g, "")}@s.whatsapp.net`;

        await sock.groupParticipantsUpdate(from, [target], "promote");
        await sock.sendMessage(from, { text: `⬆️ Member amepandishwa kuwa admin.\nPOWERED BY BROKEN LORD` });
        return;
    }

    // demote
    if (command === "demote") {
        const quoted = m?.message?.extendedTextMessage?.contextInfo?.participant;
        const target = quoted || `${args[0]?.replace(/[^0-9]/g, "")}@s.whatsapp.net`;

        await sock.groupParticipantsUpdate(from, [target], "demote");
        await sock.sendMessage(from, { text: `⬇️ Admin ameshushwa kuwa member.\nPOWERED BY BROKEN LORD` });
        return;
    }

    // tagall
    if (command === "tagall") {
        const mentions = metadata.participants.map((p) => p.id);
        const list = mentions.map((m, i) => `${i + 1}. @${m.split("@")[0]}`).join("\n");

        await sock.sendMessage(from, {
            text: `📢 *TAGALL:*\n\n${list}\n\nPOWERED BY BROKEN LORD`,
            mentions
        });
        return;
    }

    // hidetag
    if (command === "hidetag") {
        const msg = args.join(" ") || "Hidetag message";
        const mentions = metadata.participants.map((p) => p.id);

        await sock.sendMessage(from, { text: msg, mentions });
        return;
    }

    // link
    if (command === "link") {
        const code = await sock.groupInviteCode(from);
        await sock.sendMessage(from, {
            text: `🔗 *GROUP LINK:*\nhttps://chat.whatsapp.com/${code}\n\nPOWERED BY BROKEN LORD`
        });
        return;
    }

    // resetlink
    if (command === "resetlink") {
        await sock.groupRevokeInvite(from);
        const code = await sock.groupInviteCode(from);

        await sock.sendMessage(from, {
            text: `♻️ Link imewekwa upya:\nhttps://chat.whatsapp.com/${code}\n\nPOWERED BY BROKEN LORD`
        });
        return;
    }

    // totalmembers
    if (command === "totalmembers") {
        await sock.sendMessage(from, {
            text: `👥 Members: *${metadata.participants.length}*\nPOWERED BY BROKEN LORD`
        });
        return;
    }

    // userid
    if (command === "userid") {
        const quoted = m?.message?.extendedTextMessage?.contextInfo?.participant;
        const target = quoted || senderJid;

        await sock.sendMessage(from, {
            text: `🆔 User ID:\n${target}\nPOWERED BY BROKEN LORD`
        });
        return;
    }

    // vcf
    if (command === "vcf") {
        const quoted = m?.message?.extendedTextMessage?.contextInfo?.participant;
        const target = quoted || senderJid;
        const num = target.split("@")[0];

        await sock.sendMessage(from, {
            contacts: {
                displayName: num,
                contacts: [
                    {
                        displayName: num,
                        vcard: `BEGIN:VCARD\nVERSION:3.0\nFN:${num}\nTEL;type=CELL;waid=${num}:${num}\nEND:VCARD`
                    }
                ]
            }
        });
        return;
    }
}

// =============================
// EXPORT
// =============================
export default {
    protectMessage,
    handleCommand
};
