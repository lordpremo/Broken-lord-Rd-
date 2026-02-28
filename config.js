// config.js — BROKEN LORD MD

const config = {

    // =============================
    // BOT INFORMATION
    // =============================
    bot: {
        name: "BROKEN LORD MD",
        version: "1.0.0",
    },

    // =============================
    // MODE SYSTEM
    // private = owner tu
    // public = kila mtu
    // =============================
    mode: "private",

    // =============================
    // OWNER INFORMATION
    // Huyu ndiye anayeonekana kwa .owner
    // =============================
    projectOwner: {
        name: "BROKENLORD",
        number: "255773001107" // bila +
    },

    // =============================
    // PREFIX SYSTEM
    // =============================
    prefix: [".", "!", "/"],
    defaultPrefix: ".",

    // =============================
    // DEFAULT GROUP SETTINGS
    // =============================
    defaults: {
        antilink: false,
        antibadword: false,
        antidelete: false,
        welcome: false
    }
};

export default config;
