import config from "../config.js";
import fs from "fs-extra";
import groupPlugin from "../plugins/group.js";
import otherPlugin from "../plugins/other.js";

const dbFile = "./database.json";
let db = { groups: {} };

if (fs.existsSync(dbFile)) {
  db = JSON.parse(fs.readFileSync(dbFile));
}

function saveDB() {
  fs.writeFileSync(dbFile, JSON.stringify(db, null, 2));
}

export default async function handler(sock, msg) {
  try {
    const m = msg.messages[0];
    if (!m.message) return;

    const from = m.key.remoteJid;
    const isGroup = from.endsWith("@g.us");
    const senderJid = isGroup ? m.key.participant || "" : from;
    const fromMe = m.key.fromMe;

    const text =
      m.message.conversation ||
      m.message.extendedTextMessage?.text ||
      m.message.imageMessage?.caption ||
      m.message.videoMessage?.caption ||
      "";

    const prefixUsed = config.prefix.find((p) => text.startsWith(p));
    const command = prefixUsed
      ? text.slice(prefixUsed.length).trim().split(" ")[0].toLowerCase()
      : null;
    const args = prefixUsed ? text.trim().split(" ").slice(1) : [];

    if (isGroup && !db.groups[from]) {
      db.groups[from] = {
        antilink: config.defaults.antilink,
        antibadword: config.defaults.antibadword,
        antidelete: config.defaults.antidelete,
        badwords: []
      };
      saveDB();
    }

    const groupSettings = isGroup ? db.groups[from] : null;

    if (isGroup) {
      await groupPlugin.protectMessage({
        sock,
        m,
        text,
        from,
        senderJid,
        fromMe,
        groupSettings,
        saveDB,
        db
      });
    }

    if (!prefixUsed || !command) return;

    const runtimeOwner = senderJid || from;
    const isRuntimeOwner =
      fromMe || runtimeOwner.includes(config.projectOwner.number);

    // OWNER CMD
    if (command === "owner") {
      await sock.sendMessage(from, {
        text:
          `*OWNER INFORMATION*\n\n` +
          `• Name: ${config.projectOwner.name}\n` +
          `• Number: ${config.projectOwner.number}\n` +
          `• Prefix: ${config.defaultPrefix}\n\n` +
          `POWERED BY BROKEN LORD`
      });
      return;
    }

    // MENU CMD (FULL STYLE)
    if (command === "menu") {
      const header = await otherPlugin.getHeaderStats();
      await sock.sendMessage(from, {
        image: {
          url: "https://upcdn.io/kW2K8mM/raw/uploads/2026/02/17/4j9r78e4Jt-image.jpg%20(20).png"
        },
        caption: `
┏▣ ◈ *${config.bot.name}* ◈
┃ *ᴏᴡɴᴇʀ* : ${config.projectOwner.name}
┃ *ᴘʀᴇғɪx* : [ ${config.defaultPrefix} ]
┃ *ᴍᴏᴅᴇ* : ${config.bot.mode.charAt(0).toUpperCase() + config.bot.mode.slice(1)}
┃ *ᴠᴇʀsɪᴏɴ* : ${config.bot.version}
┃ *sᴘᴇᴇᴅ* : ${header.speed}
┃ *ᴜsᴀɢᴇ* : ${header.usage}
┃ *ʀᴀᴍ:* ${header.ramBar}
┗▣ 

┏▣ ◈ *AI MENU* ◈
│➽ analyze
│➽ blackbox
│➽ code
│➽ dalle
│➽ deepseek
│➽ doppleai
│➽ gemini
│➽ generate
│➽ gpt
│➽ programming
│➽ recipe
│➽ story
│➽ summarize
│➽ teach
│➽ translate2
┗▣ 

┏▣ ◈ *AUDIO MENU* ◈
│➽ bass
│➽ blown
│➽ deep
│➽ earrape
│➽ reverse
│➽ robot
│➽ tomp3
│➽ toptt
│➽ volaudio
┗▣ 

┏▣ ◈ *DOWNLOAD MENU* ◈
│➽ apk
│➽ download
│➽ facebook
│➽ gdrive
│➽ gitclone
│➽ image
│➽ instagram
│➽ itunes
│➽ mediafire
│➽ pin
│➽ savestatus
│➽ song
│➽ song2
│➽ telesticker
│➽ tiktok
│➽ tiktokaudio
│➽ twitter
│➽ video
│➽ videodoc
│➽ xvideos
┗▣ 

┏▣ ◈ *EPHOTO360 MENU* ◈
│➽ 1917style
│➽ advancedglow
│➽ blackpinklogo
│➽ blackpinkstyle
│➽ cartoonstyle
│➽ deletingtext
│➽ dragonball
│➽ effectclouds
│➽ flag3dtext
│➽ flagtext
│➽ freecreate
│➽ galaxystyle
│➽ galaxywallpaper
│➽ glitchtext
│➽ glowingtext
│➽ gradienttext
│➽ graffiti
│➽ incandescent
│➽ lighteffects
│➽ logomaker
│➽ luxurygold
│➽ makingneon
│➽ matrix
│➽ multicoloredneon
│➽ neonglitch
│➽ papercutstyle
│➽ pixelglitch
│➽ royaltext
│➽ sand
│➽ summerbeach
│➽ topography
│➽ typography
│➽ watercolortext
│➽ writetext
┗▣ 

┏▣ ◈ *FUN MENU* ◈
│➽ fact
│➽ jokes
│➽ memes
│➽ quotes
│➽ trivia
│➽ truthdetector
│➽ xxqc
┗▣ 

┏▣ ◈ *GAMES MENU* ◈
│➽ dare
│➽ truth
│➽ truthordare
┗▣ 

┏▣ ◈ *GROUP MENU* ◈
│➽ add
│➽ addcode
│➽ allow
│➽ announcements
│➽ antibadword
│➽ antibot
│➽ antidemote
│➽ antiforeign
│➽ antigroupmention
│➽ antilink
│➽ antilinkgc
│➽ antisticker
│➽ antitag
│➽ antitagadmin
│➽ approve
│➽ approveall
│➽ cancelkick
│➽ close
│➽ closetime
│➽ delallowed
│➽ delcode
│➽ delppgroup
│➽ demote
│➽ disapproveall
│➽ editsettings
│➽ getgrouppp
│➽ hidetag
│➽ invite
│➽ kick
│➽ kickall
│➽ kickinactive
│➽ link
│➽ listactive
│➽ listallowed
│➽ listcode
│➽ listinactive
│➽ listrequests
│➽ mediatag
│➽ open
│➽ opentime
│➽ poll
│➽ promote
│➽ reject
│➽ resetlink
│➽ setdesc
│➽ setgroupname
│➽ setppgroup
│➽ tag
│➽ tagadmin
│➽ tagall
│➽ tosgroup
│➽ totalmembers
│➽ userid
│➽ vcf
│➽ welcome
┗▣ 

┏▣ ◈ *IMAGE MENU* ◈
│➽ remini
│➽ wallpaper
┗▣ 

┏▣ ◈ *OTHER MENU* ◈
│➽ botstatus
│➽ pair
│➽ ping
│➽ ping2
│➽ repo
│➽ runtime
│➽ time
┗▣ 

┏▣ ◈ *OWNER MENU* ◈
│➽ autosavestatus
│➽ aza
│➽ block
│➽ delete
│➽ deljunk
│➽ delstickercmd
│➽ disk
│➽ dlvo
│➽ gcaddprivacy
│➽ groupid
│➽ hostip
│➽ join
│➽ lastseen
│➽ leave
│➽ listbadword
│➽ listblocked
│➽ listignorelist
│➽ listsudo
│➽ modestatus
│➽ online
│➽ owner
│➽ ppprivacy
│➽ react
│➽ readreceipts
│➽ resetaza
│➽ restart
│➽ setaza
│➽ setbio
│➽ setprofilepic
│➽ setstickercmd
│➽ tostatus
│➽ toviewonce
│➽ unblock
│➽ unblockall
│➽ update
│➽ vv2
│➽ warn
┗▣ 

┏▣ ◈ *RELIGION MENU* ◈
│➽ bible
│➽ quran
┗▣ 

┏▣ ◈ *SEARCH MENU* ◈
│➽ define
│➽ define2
│➽ imdb
│➽ lyrics
│➽ shazam
│➽ weather
│➽ yts
┗▣ 

┏▣ ◈ *SETTINGS MENU* ◈
│➽ addbadword
│➽ addcountrycode
│➽ addignorelist
│➽ addsudo
│➽ alwaysonline
│➽ antibug
│➽ anticall
│➽ antidelete
│➽ antideletestatus
│➽ antiedit
│➽ antiviewonce
│➽ autobio
│➽ autoblock
│➽ autoreact
│➽ autoreactstatus
│➽ autoread
│➽ autorecord
│➽ autorecordtyping
│➽ autotype
│➽ autoviewstatus
│➽ chatbot
│➽ delanticallmsg
│➽ delcountrycode
│➽ deletebadword
│➽ delgoodbye
│➽ delignorelist
│➽ delsudo
│➽ delwelcome
│➽ getsettings
│➽ listcountrycode
│➽ listwarn
│➽ mode
│➽ resetsetting
│➽ resetwarn
│➽ setanticallmsg
│➽ setbotname
│➽ setcontextlink
│➽ setfont
│➽ setgoodbye
│➽ setmenu
│➽ setmenuimage
│➽ setownername
│➽ setownernumber
│➽ setprefix
│➽ setstatusemoji
│➽ setstickerauthor
│➽ setstickerpackname
│➽ settimezone
│➽ setwarn
│➽ setwatermark
│➽ setwelcome
│➽ showanticallmsg
│➽ showgoodbye
│➽ showwelcome
│➽ testanticallmsg
│➽ testgoodbye
│➽ testwelcome
┗▣ 

┏▣ ◈ *SPORTS MENU* ◈
│➽ bundesligamatches
│➽ bundesligascorers
│➽ bundesligastandings
│➽ bundesligaupcoming
│➽ clmatches
│➽ clscorers
│➽ clstandings
│➽ clupcoming
│➽ eflmatches
│➽ eflscorers
│➽ eflstandings
│➽ eflupcoming
│➽ elmatches
│➽ elscorers
│➽ elstandings
│➽ elupcoming
│➽ eplmatches
│➽ eplscorers
│➽ eplstandings
│➽ eplupcoming
│➽ laligamatches
│➽ laligascorers
│➽ laligastandings
│➽ laligaupcoming
│➽ ligue1matches
│➽ ligue1scorers
│➽ ligue1standings
│➽ ligue1upcoming
│➽ serieamatches
│➽ serieascorers
│➽ serieastandings
│➽ serieaupcoming
│➽ wcmatches
│➽ wcscorers
│➽ wcstandings
│➽ wcupcoming
│➽ wrestlingevents
│➽ wwenews
│➽ wweschedule
┗▣ 

┏▣ ◈ *SUPPORT MENU* ◈
│➽ feedback
│➽ helpers
┗▣ 

┏▣ ◈ *TOOLS MENU* ◈
│➽ browse
│➽ calculate
│➽ device
│➽ emojimix
│➽ fancy
│➽ filtervcf
│➽ fliptext
│➽ genpass
│➽ getabout
│➽ getpp
│➽ gsmarena
│➽ obfuscate
│➽ qrcode
│➽ runeval
│➽ say
│➽ ssweb
│➽ sswebpc
│➽ sswebtab
│➽ sticker
│➽ take
│➽ texttopdf
│➽ tinyurl
│➽ toimage
│➽ tourl
│➽ vcc
┗▣ 

┏▣ ◈ *TOSTATUS MENU* ◈
│➽ togstatus
┗▣ 

┏▣ ◈ *TRANSLATE MENU* ◈
│➽ translate
┗▣ 

┏▣ ◈ *VIDEO MENU* ◈
│➽ toaudio
│➽ tovideo
│➽ volvideo
┗▣ 

POWERED BY BROKEN LORD
        `
      });
      return;
    }

    // OTHER BASIC COMMANDS (no API key)
    if (["ping", "ping2", "runtime", "time", "botstatus"].includes(command)) {
      await otherPlugin.handleCommand({
        sock,
        from,
        command,
        args
      });
      return;
    }

    // GROUP COMMANDS
    if (isGroup) {
      await groupPlugin.handleCommand({
        sock,
        from,
        senderJid,
        isRuntimeOwner,
        command,
        args,
        groupSettings,
        db,
        saveDB
      });
    }
  } catch (e) {
    console.log("Handler error:", e);
  }
}
