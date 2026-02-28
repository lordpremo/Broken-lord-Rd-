// plugins/download.js
import axios from "axios";

export default {
    async handleCommand({ sock, from, senderJid, isRuntimeOwner, command, args, m }) {

        const send = (text) => sock.sendMessage(from, { text });

        // Helper: validate URL
        const needUrl = async (usage) => {
            const url = args[0];
            if (!url || !url.startsWith("http")) {
                await send(`⚙️ Tumia: .${command} ${usage}`);
                return null;
            }
            return url;
        };

        // =============================
        // GITCLONE
        // =============================
        if (command === "gitclone") {
            const url = await needUrl("https://github.com/user/repo");
            if (!url) return;

            await send(
                `📦 *GIT CLONE INFO*\n` +
                `• Repo: ${url}\n` +
                `• Command: git clone ${url}\n\n` +
                `POWERED BY BROKEN LORD`
            );
            return;
        }

        // =============================
        // IMAGE (simple random image API)
        // =============================
        if (command === "image") {
            const query = args.join(" ");
            if (!query) return send("⚙️ Tumia: .image cat / car / anime ...");

            const url = `https://source.unsplash.com/600x400/?${encodeURIComponent(query)}`;
            await sock.sendMessage(from, {
                image: { url },
                caption: `🖼️ Image for: *${query}*\nPOWERED BY BROKEN LORD`
            }, { quoted: m });
            return;
        }

        // =============================
        // SONG (yt search + audio via public API placeholder)
        // =============================
        if (command === "song") {
            const query = args.join(" ");
            if (!query) return send("⚙️ Tumia: .song song title");

            await send(
                "🎵 SONG downloader inahitaji YouTube/MP3 API.\n" +
                "Tayari structure ipo, ongeza API yako ya kupakua audio.\n\n" +
                "POWERED BY BROKEN LORD"
            );
            return;
        }

        // =============================
        // VIDEO (yt search + video via public API placeholder)
        // =============================
        if (command === "video") {
            const query = args.join(" ");
            if (!query) return send("⚙️ Tumia: .video video title");

            await send(
                "🎬 VIDEO downloader inahitaji YouTube/MP4 API.\n" +
                "Tayari structure ipo, ongeza API yako ya kupakua video.\n\n" +
                "POWERED BY BROKEN LORD"
            );
            return;
        }

        // =============================
        // INSTAGRAM (placeholder)
        // =============================
        if (command === "instagram" || command === "ig") {
            const url = await needUrl("https://www.instagram.com/p/XXXX");
            if (!url) return;

            await send(
                "📸 INSTAGRAM downloader inahitaji API ya IG.\n" +
                "Ongeza endpoint yako ya kupakua reels/posts.\n\n" +
                "POWERED BY BROKEN LORD"
            );
            return;
        }

        // =============================
        // FACEBOOK (placeholder)
        // =============================
        if (command === "facebook" || command === "fb") {
            const url = await needUrl("https://www.facebook.com/...");
            if (!url) return;

            await send(
                "📘 FACEBOOK downloader inahitaji API ya FB.\n" +
                "Ongeza endpoint yako ya kupakua video.\n\n" +
                "POWERED BY BROKEN LORD"
            );
            return;
        }

        // =============================
        // TIKTOK (placeholder)
        // =============================
        if (command === "tiktok") {
            const url = await needUrl("https://www.tiktok.com/...");
            if (!url) return;

            await send(
                "🎵 TIKTOK downloader inahitaji API ya TT.\n" +
                "Ongeza endpoint yako ya kupakua no‑wm.\n\n" +
                "POWERED BY BROKEN LORD"
            );
            return;
        }

        // =============================
        // TIKTOKAUDIO (placeholder)
        // =============================
        if (command === "tiktokaudio") {
            const url = await needUrl("https://www.tiktok.com/...");
            if (!url) return;

            await send(
                "🎧 TIKTOK AUDIO inahitaji API ya TT.\n" +
                "Ongeza endpoint yako ya kupakua audio.\n\n" +
                "POWERED BY BROKEN LORD"
            );
            return;
        }

        // =============================
        // TWITTER (placeholder)
        // =============================
        if (command === "twitter" || command === "x") {
            const url = await needUrl("https://twitter.com/.../status/...");
            if (!url) return;

            await send(
                "🐦 TWITTER/X downloader inahitaji API.\n" +
                "Ongeza endpoint yako ya kupakua video.\n\n" +
                "POWERED BY BROKEN LORD"
            );
            return;
        }

        // =============================
        // MEDIAFIRE (basic info via HTML)
        // =============================
        if (command === "mediafire") {
            const url = await needUrl("https://www.mediafire.com/file/XXXX");
            if (!url) return;

            try {
                const res = await axios.get(url);
                const match = res.data.match(/aria-label="Download file" href="([^"]+)"/);
                if (!match) {
                    await send("❌ Imeshindikana kupata direct link ya Mediafire.");
                    return;
                }
                const direct = match[1].startsWith("http") ? match[1] : `https://www.mediafire.com${match[1]}`;
                await send(
                    `📁 *MEDIAFIRE LINK FOUND*\n` +
                    `• Original: ${url}\n` +
                    `• Direct: ${direct}\n\n` +
                    `POWERED BY BROKEN LORD`
                );
            } catch {
                await send("❌ Imeshindikana kusoma Mediafire page.");
            }
            return;
        }

        // =============================
        // APK (placeholder)
        // =============================
        if (command === "apk") {
            const query = args.join(" ");
            if (!query) return send("⚙️ Tumia: .apk app name");

            await send(
                "📦 APK downloader inahitaji API ya PlayStore/third‑party.\n" +
                "Ongeza endpoint yako ya kutafuta na kupakua APK.\n\n" +
                "POWERED BY BROKEN LORD"
            );
            return;
        }

        // =============================
        // PIN (Pinterest placeholder)
        // =============================
        if (command === "pin") {
            const query = args.join(" ");
            if (!query) return send("⚙️ Tumia: .pin keyword");

            await send(
                "📌 PINTEREST downloader inahitaji API.\n" +
                "Ongeza endpoint yako ya kutafuta na kupakua picha.\n\n" +
                "POWERED BY BROKEN LORD"
            );
            return;
        }

        // =============================
        // SAVESTATUS (placeholder)
        // =============================
        if (command === "savestatus") {
            await send(
                "🟢 SAVESTATUS inahitaji logic ya kuscan status list.\n" +
                "Hii inategemea structure ya bot yako ya Baileys.\n\n" +
                "POWERED BY BROKEN LORD"
            );
            return;
        }

        // =============================
        // TELesticker (placeholder)
        // =============================
        if (command === "telesticker") {
            const url = await needUrl("https://t.me/addstickers/...");
            if (!url) return;

            await send(
                "🧩 TELEGRAM STICKER importer inahitaji API/logic ya kuscrape TG.\n" +
                "Ongeza script yako ya ku-convert kuwa WA sticker.\n\n" +
                "POWERED BY BROKEN LORD"
            );
            return;
        }

        // =============================
        // DOWNLOAD (generic placeholder)
        // =============================
        if (command === "download") {
            const url = await needUrl("https://link-ya-kupakua");
            if (!url) return;

            await send(
                "⬇️ GENERIC downloader inahitaji API/logic ya kutambua source.\n" +
                "Ongeza handler yako ya kuchambua link na kupakua.\n\n" +
                "POWERED BY BROKEN LORD"
            );
            return;
        }

        // =============================
        // VIDEODOC (placeholder)
        // =============================
        if (command === "videodoc") {
            const query = args.join(" ");
            if (!query) return send("⚙️ Tumia: .videodoc video title/link");

            await send(
                "📄 VIDEODOC inahitaji API ya video + kutuma kama document.\n" +
                "Structure ipo tayari, ongeza API yako.\n\n" +
                "POWERED BY BROKEN LORD"
            );
            return;
        }

        // =============================
        // XVIDEOS (placeholder, sensitive)
        // =============================
        if (command === "xvideos") {
            await send(
                "⚠️ XVideos downloader haijawezeshwa kwa sababu ya maudhui ya watu wazima.\n" +
                "POWERED BY BROKEN LORD"
            );
            return;
        }

        // =============================
        // ITUNES (simple search)
        // =============================
        if (command === "itunes") {
            const query = args.join(" ");
            if (!query) return send("⚙️ Tumia: .itunes song/artist");

            try {
                const res = await axios.get("https://itunes.apple.com/search", {
                    params: { term: query, limit: 5 }
                });
                if (!res.data.results.length) {
                    await send("❌ Hakuna matokeo.");
                    return;
                }
                const list = res.data.results
                    .map((x, i) => `${i + 1}. ${x.trackName} — ${x.artistName}`)
                    .join("\n");
                await send(`🎧 *iTunes Results:*\n${list}\n\nPOWERED BY BROKEN LORD`);
            } catch {
                await send("❌ Imeshindikana kuwasiliana na iTunes API.");
            }
            return;
        }

        // =============================
        // GDRIVE (placeholder)
        // =============================
        if (command === "gdrive") {
            const url = await needUrl("https://drive.google.com/file/d/ID/view");
            if (!url) return;

            await send(
                "📂 GDRIVE downloader inahitaji API/logic ya kuchambua ID.\n" +
                "Ongeza script yako ya kupata direct link.\n\n" +
                "POWERED BY BROKEN LORD"
            );
            return;
        }
    }
};
