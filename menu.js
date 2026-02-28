// plugins/menu.js
const OWNER_NUMBER = "255773001107";
const OWNER_NAME = "BROKENLORD";

export default {
    async handleCommand({ sock, from, senderJid, isRuntimeOwner, command, args, m, prefix, mode }) {

        if (!["menu", "help"].includes(command)) return;

        const start = Date.now();
        const usedPrefix = prefix || ".";
        const botMode = mode || "Private";

        const headerImage = "https://upcdn.io/kW2K8mM/raw/uploads/2026/02/17/4j9r78e4Jt-image.jpg%20(20).png";

        const speed = (Date.now() - start).toFixed(4);
        const fakeUsage = "120 MB of 8 GB";
        const fakeRamBar = "[████████░░] 80%";
        const pluginsCount = 326; // unaweza kubadilisha baadaye
        const version = "1.0.0";

        const menuText = `
┏▣ ◈ *BROKEN LORD MD* ◈
┃ *ᴏᴡɴᴇʀ* : ${OWNER_NAME} (${OWNER_NUMBER})
┃ *ᴘʀᴇғɪx* : [ . ! / ]
┃ *ᴍᴏᴅᴇ* : ${botMode}
┃ *ᴘʟᴜɢɪɴs* : ${pluginsCount}
┃ *ᴠᴇʀsɪᴏɴ* : ${version}
┃ *sᴘᴇᴇᴅ* : ${speed} ms
┃ *ᴜsᴀɢᴇ* : ${fakeUsage}
┃ *ʀᴀᴍ:* ${fakeRamBar}
┗▣ 

┏▣ ◈ *AI MENU* ◈
│➽ ${usedPrefix}analyze
│➽ ${usedPrefix}blackbox
│➽ ${usedPrefix}code
│➽ ${usedPrefix}dalle
│➽ ${usedPrefix}deepseek
│➽ ${usedPrefix}doppleai
│➽ ${usedPrefix}gemini
│➽ ${usedPrefix}generate
│➽ ${usedPrefix}gpt
│➽ ${usedPrefix}programming
│➽ ${usedPrefix}recipe
│➽ ${usedPrefix}story
│➽ ${usedPrefix}summarize
│➽ ${usedPrefix}teach
│➽ ${usedPrefix}translate2
┗▣ 

┏▣ ◈ *AUDIO MENU* ◈
│➽ ${usedPrefix}bass
│➽ ${usedPrefix}blown
│➽ ${usedPrefix}deep
│➽ ${usedPrefix}earrape
│➽ ${usedPrefix}reverse
│➽ ${usedPrefix}robot
│➽ ${usedPrefix}tomp3
│➽ ${usedPrefix}toptt
│➽ ${usedPrefix}volaudio
┗▣ 

┏▣ ◈ *DOWNLOAD MENU* ◈
│➽ ${usedPrefix}apk
│➽ ${usedPrefix}download
│➽ ${usedPrefix}facebook
│➽ ${usedPrefix}gdrive
│➽ ${usedPrefix}gitclone
│➽ ${usedPrefix}image
│➽ ${usedPrefix}instagram
│➽ ${usedPrefix}itunes
│➽ ${usedPrefix}mediafire
│➽ ${usedPrefix}pin
│➽ ${usedPrefix}savestatus
│➽ ${usedPrefix}song
│➽ ${usedPrefix}song2
│➽ ${usedPrefix}telesticker
│➽ ${usedPrefix}tiktok
│➽ ${usedPrefix}tiktokaudio
│➽ ${usedPrefix}twitter
│➽ ${usedPrefix}video
│➽ ${usedPrefix}videodoc
│➽ ${usedPrefix}xvideos
┗▣ 

┏▣ ◈ *EPHOTO360 MENU* ◈
│➽ ${usedPrefix}1917style
│➽ ${usedPrefix}advancedglow
│➽ ${usedPrefix}blackpinklogo
│➽ ${usedPrefix}blackpinkstyle
│➽ ${usedPrefix}cartoonstyle
│➽ ${usedPrefix}deletingtext
│➽ ${usedPrefix}dragonball
│➽ ${usedPrefix}effectclouds
│➽ ${usedPrefix}flag3dtext
│➽ ${usedPrefix}flagtext
│➽ ${usedPrefix}freecreate
│➽ ${usedPrefix}galaxystyle
│➽ ${usedPrefix}galaxywallpaper
│➽ ${usedPrefix}glitchtext
│➽ ${usedPrefix}glowingtext
│➽ ${usedPrefix}gradienttext
│➽ ${usedPrefix}graffiti
│➽ ${usedPrefix}incandescent
│➽ ${usedPrefix}lighteffects
│➽ ${usedPrefix}logomaker
│➽ ${usedPrefix}luxurygold
│➽ ${usedPrefix}makingneon
│➽ ${usedPrefix}matrix
│➽ ${usedPrefix}multicoloredneon
│➽ ${usedPrefix}neonglitch
│➽ ${usedPrefix}papercutstyle
│➽ ${usedPrefix}pixelglitch
│➽ ${usedPrefix}royaltext
│➽ ${usedPrefix}sand
│➽ ${usedPrefix}summerbeach
│➽ ${usedPrefix}topography
│➽ ${usedPrefix}typography
│➽ ${usedPrefix}watercolortext
│➽ ${usedPrefix}writetext
┗▣ 

┏▣ ◈ *FUN MENU* ◈
│➽ ${usedPrefix}fact
│➽ ${usedPrefix}jokes
│➽ ${usedPrefix}memes
│➽ ${usedPrefix}quotes
│➽ ${usedPrefix}trivia
│➽ ${usedPrefix}truthdetector
│➽ ${usedPrefix}xxqc
┗▣ 

┏▣ ◈ *GAMES MENU* ◈
│➽ ${usedPrefix}dare
│➽ ${usedPrefix}truth
│➽ ${usedPrefix}truthordare
┗▣ 

┏▣ ◈ *GROUP MENU* ◈
│➽ ${usedPrefix}add
│➽ ${usedPrefix}addcode
│➽ ${usedPrefix}allow
│➽ ${usedPrefix}announcements
│➽ ${usedPrefix}antibadword
│➽ ${usedPrefix}antibot
│➽ ${usedPrefix}antidemote
│➽ ${usedPrefix}antiforeign
│➽ ${usedPrefix}antigroupmention
│➽ ${usedPrefix}antilink
│➽ ${usedPrefix}antilinkgc
│➽ ${usedPrefix}antisticker
│➽ ${usedPrefix}antitag
│➽ ${usedPrefix}antitagadmin
│➽ ${usedPrefix}approve
│➽ ${usedPrefix}approveall
│➽ ${usedPrefix}cancelkick
│➽ ${usedPrefix}close
│➽ ${usedPrefix}closetime
│➽ ${usedPrefix}delallowed
│➽ ${usedPrefix}delcode
│➽ ${usedPrefix}delppgroup
│➽ ${usedPrefix}demote
│➽ ${usedPrefix}disapproveall
│➽ ${usedPrefix}editsettings
│➽ ${usedPrefix}getgrouppp
│➽ ${usedPrefix}hidetag
│➽ ${usedPrefix}invite
│➽ ${usedPrefix}kick
│➽ ${usedPrefix}kickall
│➽ ${usedPrefix}kickinactive
│➽ ${usedPrefix}link
│➽ ${usedPrefix}listactive
│➽ ${usedPrefix}listallowed
│➽ ${usedPrefix}listcode
│➽ ${usedPrefix}listinactive
│➽ ${usedPrefix}listrequests
│➽ ${usedPrefix}mediatag
│➽ ${usedPrefix}open
│➽ ${usedPrefix}opentime
│➽ ${usedPrefix}poll
│➽ ${usedPrefix}promote
│➽ ${usedPrefix}reject
│➽ ${usedPrefix}resetlink
│➽ ${usedPrefix}setdesc
│➽ ${usedPrefix}setgroupname
│➽ ${usedPrefix}setppgroup
│➽ ${usedPrefix}tag
│➽ ${usedPrefix}tagadmin
│➽ ${usedPrefix}tagall
│➽ ${usedPrefix}tosgroup
│➽ ${usedPrefix}totalmembers
│➽ ${usedPrefix}userid
│➽ ${usedPrefix}vcf
│➽ ${usedPrefix}welcome
┗▣ 

┏▣ ◈ *IMAGE MENU* ◈
│➽ ${usedPrefix}remini
│➽ ${usedPrefix}wallpaper
┗▣ 

┏▣ ◈ *OTHER MENU* ◈
│➽ ${usedPrefix}botstatus
│➽ ${usedPrefix}pair
│➽ ${usedPrefix}ping
│➽ ${usedPrefix}ping2
│➽ ${usedPrefix}repo
│➽ ${usedPrefix}runtime
│➽ ${usedPrefix}time
┗▣ 

┏▣ ◈ *OWNER MENU* ◈
│➽ ${usedPrefix}autosavestatus
│➽ ${usedPrefix}aza
│➽ ${usedPrefix}block
│➽ ${usedPrefix}delete
│➽ ${usedPrefix}deljunk
│➽ ${usedPrefix}delstickercmd
│➽ ${usedPrefix}disk
│➽ ${usedPrefix}dlvo
│➽ ${usedPrefix}gcaddprivacy
│➽ ${usedPrefix}groupid
│➽ ${usedPrefix}hostip
│➽ ${usedPrefix}join
│➽ ${usedPrefix}lastseen
│➽ ${usedPrefix}leave
│➽ ${usedPrefix}listbadword
│➽ ${usedPrefix}listblocked
│➽ ${usedPrefix}listignorelist
│➽ ${usedPrefix}listsudo
│➽ ${usedPrefix}modestatus
│➽ ${usedPrefix}online
│➽ ${usedPrefix}owner
│➽ ${usedPrefix}ppprivacy
│➽ ${usedPrefix}react
│➽ ${usedPrefix}readreceipts
│➽ ${usedPrefix}resetaza
│➽ ${usedPrefix}restart
│➽ ${usedPrefix}setaza
│➽ ${usedPrefix}setbio
│➽ ${usedPrefix}setprofilepic
│➽ ${usedPrefix}setstickercmd
│➽ ${usedPrefix}tostatus
│➽ ${usedPrefix}toviewonce
│➽ ${usedPrefix}unblock
│➽ ${usedPrefix}unblockall
│➽ ${usedPrefix}update
│➽ ${usedPrefix}vv2
│➽ ${usedPrefix}warn
┗▣ 

┏▣ ◈ *RELIGION MENU* ◈
│➽ ${usedPrefix}bible
│➽ ${usedPrefix}quran
┗▣ 

┏▣ ◈ *SEARCH MENU* ◈
│➽ ${usedPrefix}define
│➽ ${usedPrefix}define2
│➽ ${usedPrefix}imdb
│➽ ${usedPrefix}lyrics
│➽ ${usedPrefix}shazam
│➽ ${usedPrefix}weather
│➽ ${usedPrefix}yts
┗▣ 

┏▣ ◈ *SETTINGS MENU* ◈
│➽ ${usedPrefix}addbadword
│➽ ${usedPrefix}addcountrycode
│➽ ${usedPrefix}addignorelist
│➽ ${usedPrefix}addsudo
│➽ ${usedPrefix}alwaysonline
│➽ ${usedPrefix}antibug
│➽ ${usedPrefix}anticall
│➽ ${usedPrefix}antidelete
│➽ ${usedPrefix}antideletestatus
│➽ ${usedPrefix}antiedit
│➽ ${usedPrefix}antiviewonce
│➽ ${usedPrefix}autobio
│➽ ${usedPrefix}autoblock
│➽ ${usedPrefix}autoreact
│➽ ${usedPrefix}autoreactstatus
│➽ ${usedPrefix}autoread
│➽ ${usedPrefix}autorecord
│➽ ${usedPrefix}autorecordtyping
│➽ ${usedPrefix}autotype
│➽ ${usedPrefix}autoviewstatus
│➽ ${usedPrefix}chatbot
│➽ ${usedPrefix}delanticallmsg
│➽ ${usedPrefix}delcountrycode
│➽ ${usedPrefix}deletebadword
│➽ ${usedPrefix}delgoodbye
│➽ ${usedPrefix}delignorelist
│➽ ${usedPrefix}delsudo
│➽ ${usedPrefix}delwelcome
│➽ ${usedPrefix}getsettings
│➽ ${usedPrefix}listcountrycode
│➽ ${usedPrefix}listwarn
│➽ ${usedPrefix}mode
│➽ ${usedPrefix}resetsetting
│➽ ${usedPrefix}resetwarn
│➽ ${usedPrefix}setanticallmsg
│➽ ${usedPrefix}setbotname
│➽ ${usedPrefix}setcontextlink
│➽ ${usedPrefix}setfont
│➽ ${usedPrefix}setgoodbye
│➽ ${usedPrefix}setmenu
│➽ ${usedPrefix}setmenuimage
│➽ ${usedPrefix}setownername
│➽ ${usedPrefix}setownernumber
│➽ ${usedPrefix}setprefix
│➽ ${usedPrefix}setstatusemoji
│➽ ${usedPrefix}setstickerauthor
│➽ ${usedPrefix}setstickerpackname
│➽ ${usedPrefix}settimezone
│➽ ${usedPrefix}setwarn
│➽ ${usedPrefix}setwatermark
│➽ ${usedPrefix}setwelcome
│➽ ${usedPrefix}showanticallmsg
│➽ ${usedPrefix}showgoodbye
│➽ ${usedPrefix}showwelcome
│➽ ${usedPrefix}testanticallmsg
│➽ ${usedPrefix}testgoodbye
│➽ ${usedPrefix}testwelcome
┗▣ 

┏▣ ◈ *SPORTS MENU* ◈
│➽ ${usedPrefix}bundesligamatches
│➽ ${usedPrefix}bundesligascorers
│➽ ${usedPrefix}bundesligastandings
│➽ ${usedPrefix}bundesligaupcoming
│➽ ${usedPrefix}clmatches
│➽ ${usedPrefix}clscorers
│➽ ${usedPrefix}clstandings
│➽ ${usedPrefix}clupcoming
│➽ ${usedPrefix}eflmatches
│➽ ${usedPrefix}eflscorers
│➽ ${usedPrefix}eflstandings
│➽ ${usedPrefix}eflupcoming
│➽ ${usedPrefix}elmatches
│➽ ${usedPrefix}elscorers
│➽ ${usedPrefix}elstandings
│➽ ${usedPrefix}elupcoming
│➽ ${usedPrefix}eplmatches
│➽ ${usedPrefix}eplscorers
│➽ ${usedPrefix}eplstandings
│➽ ${usedPrefix}eplupcoming
│➽ ${usedPrefix}laligamatches
│➽ ${usedPrefix}laligascorers
│➽ ${usedPrefix}laligastandings
│➽ ${usedPrefix}laligaupcoming
│➽ ${usedPrefix}ligue1matches
│➽ ${usedPrefix}ligue1scorers
│➽ ${usedPrefix}ligue1standings
│➽ ${usedPrefix}ligue1upcoming
│➽ ${usedPrefix}serieamatches
│➽ ${usedPrefix}serieascorers
│➽ ${usedPrefix}serieastandings
│➽ ${usedPrefix}serieaupcoming
│➽ ${usedPrefix}wcmatches
│➽ ${usedPrefix}wcscorers
│➽ ${usedPrefix}wcstandings
│➽ ${usedPrefix}wcupcoming
│➽ ${usedPrefix}wrestlingevents
│➽ ${usedPrefix}wwenews
│➽ ${usedPrefix}wweschedule
┗▣ 

┏▣ ◈ *SUPPORT MENU* ◈
│➽ ${usedPrefix}feedback
│➽ ${usedPrefix}helpers
┗▣ 

┏▣ ◈ *TOOLS MENU* ◈
│➽ ${usedPrefix}browse
│➽ ${usedPrefix}calculate
│➽ ${usedPrefix}device
│➽ ${usedPrefix}emojimix
│➽ ${usedPrefix}fancy
│➽ ${usedPrefix}filtervcf
│➽ ${usedPrefix}fliptext
│➽ ${usedPrefix}genpass
│➽ ${usedPrefix}getabout
│➽ ${usedPrefix}getpp
│➽ ${usedPrefix}gsmarena
│➽ ${usedPrefix}obfuscate
│➽ ${usedPrefix}qrcode
│➽ ${usedPrefix}runeval
│➽ ${usedPrefix}say
│➽ ${usedPrefix}ssweb
│➽ ${usedPrefix}sswebpc
│➽ ${usedPrefix}sswebtab
│➽ ${usedPrefix}sticker
│➽ ${usedPrefix}take
│➽ ${usedPrefix}texttopdf
│➽ ${usedPrefix}tinyurl
│➽ ${usedPrefix}toimage
│➽ ${usedPrefix}tourl
│➽ ${usedPrefix}vcc
┗▣ 

POWERED BY BROKEN LORD
`.trim();

        await sock.sendMessage(from, {
            image: { url: headerImage },
            caption: menuText
        }, { quoted: m });
    }
};
