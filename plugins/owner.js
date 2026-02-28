// plugins/owner.js
import config from "../config.js";

export default {
    async handleCommand({ sock, from, senderJid, isRuntimeOwner, command, args, m }) {

        // Only owner (aliye-pair) anaweza kutumia commands hizi
        if (!isRuntimeOwner) {
            await sock.sendMessage(from, { text: "❌ Command hii ni ya OWNER pekee." });
            return;
        }

        // =============================
        // OWNER COMMANDS
        // =============================

        // .owner (already handled in handler.js)
        if (command === "owner") return;

        // block
        if (command === "block") {
            const quoted = m?.message?.extendedTextMessage?.contextInfo?.participant;
            const target = quoted || `${args[0]?.replace(/[^0-9]/g, "")}@s.whatsapp.net`;

            if (!target) {
                await sock.sendMessage(from, { text: "⚙️ Tumia: .block @user" });
                return;
            }

            await sock.updateBlockStatus(target, "block");
            await sock.sendMessage(from, { text: `⛔ User amezuiwa.\nPOWERED BY BROKEN LORD` });
            return;
        }

        // unblock
        if (command === "unblock") {
            const quoted = m?.message?.extendedTextMessage?.contextInfo?.participant;
            const target = quoted || `${args[0]?.replace(/[^0-9]/g, "")}@s.whatsapp.net`;

            if (!target) {
                await sock.sendMessage(from, { text: "⚙️ Tumia: .unblock @user" });
                return;
            }

            await sock.updateBlockStatus(target, "unblock");
            await sock.sendMessage(from, { text: `✅ User ameondolewa block.\nPOWERED BY BROKEN LORD` });
            return;
        }

        // unblockall
        if (command === "unblockall") {
            const blocklist = await sock.fetchBlocklist();
            for (const user of blocklist) {
                await sock.updateBlockStatus(user, "unblock");
            }
            await sock.sendMessage(from, { text: `♻️ Blocklist yote imefutwa.\nPOWERED BY BROKEN LORD` });
            return;
        }

        // join group
        if (command === "join") {
            const link = args[0];
            if (!link || !link.includes("chat.whatsapp.com")) {
                await sock.sendMessage(from, { text: "⚙️ Tumia: .join https://chat.whatsapp.com/XXXX" });
                return;
            }

            const code = link.split("/")[3];
            await sock.groupAcceptInvite(code);

            await sock.sendMessage(from, { text: `📥 Nimejiunga na group.\nPOWERED BY BROKEN LORD` });
            return;
        }

        // leave group
        if (command === "leave") {
            await sock.sendMessage(from, { text: "👋 Ninatoka group..." });
            await sock.groupLeave(from);
            return;
        }

        // restart bot (Render‑safe)
        if (command === "restart") {
            await sock.sendMessage(from, { text: "♻️ BROKEN LORD MD inarestart..." });
            process.exit(0);
        }

        // setprefix
        if (command === "setprefix") {
            const newPrefix = args[0];
            if (!newPrefix) {
                await sock.sendMessage(from, { text: "⚙️ Tumia: .setprefix !" });
                return;
            }

            config.defaultPrefix = newPrefix;
            await sock.sendMessage(from, { text: `🔧 Prefix mpya: *${newPrefix}*\nPOWERED BY BROKEN LORD` });
            return;
        }

        // setbotname
        if (command === "setbotname") {
            const name = args.join(" ");
            if (!name) {
                await sock.sendMessage(from, { text: "⚙️ Tumia: .setbotname BROKEN LORD MD" });
                return;
            }

            config.bot.name = name;
            await sock.sendMessage(from, { text: `🤖 Bot name limebadilishwa kuwa:\n*${name}*\nPOWERED BY BROKEN LORD` });
            return;
        }

        // setownername
        if (command === "setownername") {
            const name = args.join(" ");
            if (!name) {
                await sock.sendMessage(from, { text: "⚙️ Tumia: .setownername BROKENLORD" });
                return;
            }

            config.projectOwner.name = name;
            await sock.sendMessage(from, { text: `👑 Owner name limebadilishwa kuwa:\n*${name}*\nPOWERED BY BROKEN LORD` });
            return;
        }

        // setownernumber
        if (command === "setownernumber") {
            const num = args[0]?.replace(/[^0-9]/g, "");
            if (!num) {
                await sock.sendMessage(from, { text: "⚙️ Tumia: .setownernumber 2557XXXXXXX" });
                return;
            }

            config.projectOwner.number = num;
            await sock.sendMessage(from, { text: `📞 Owner number limebadilishwa kuwa:\n*${num}*\nPOWERED BY BROKEN LORD` });
            return;
        }

        // setbio
        if (command === "setbio") {
            const bio = args.join(" ");
            if (!bio) {
                await sock.sendMessage(from, { text: "⚙️ Tumia: .setbio Maelezo mapya" });
                return;
            }

            await sock.updateProfileStatus(bio);
            await sock.sendMessage(from, { text: `📝 Bio imebadilishwa.\nPOWERED BY BROKEN LORD` });
            return;
        }

        // setprofilepic
        if (command === "setprofilepic") {
            const quoted = m?.message?.extendedTextMessage?.contextInfo;
            const img = quoted?.quotedMessage?.imageMessage;

            if (!img) {
                await sock.sendMessage(from, { text: "⚙️ Reply picha na tumia: .setprofilepic" });
                return;
            }

            const buffer = await sock.downloadMediaMessage({ message: { imageMessage: img } });

            await sock.updateProfilePicture(sock.user.id, buffer);
            await sock.sendMessage(from, { text: `🖼️ Profile picture imebadilishwa.\nPOWERED BY BROKEN LORD` });
            return;
        }

        // hostip (Render‑safe)
        if (command === "hostip") {
            await sock.sendMessage(from, {
                text: `🌐 Render Host: *BROKEN LORD MD SERVER*\nPOWERED BY BROKEN LORD`
            });
            return;
        }

        // groupid
        if (command === "groupid") {
            await sock.sendMessage(from, {
                text: `🆔 Group ID:\n${from}\nPOWERED BY BROKEN LORD`
            });
            return;
        }
    }
};
