const {Client, RichEmbed} = require('discord.js');
const client = new Client();
const Fortnite = require('fortnite');
const s = new Fortnite(process.env.TRN);

const p = "!" // البريفكس

client.on('message', async message => {
    if (!message.content.startsWith(p + "fortnite")) return;
    let args = message.content.slice(p.length + "fortnite".length).split(' ');
    var platform;
    let username;
    message.channel.send(args[1]); message.channel.send(args[2])
    if (!args[1].includes("pc")) return message.reply('** Please Include The PlatForm : `!fortnite [pc | xpl | psn] <username>`**');
    if (!args[2]) return message.reply("** Please Put The Username Of The Player **");
    platform = args[1].trim()
    username = args[2].trim()
    s.getInfo(username, platform).then(async d => {
        let embed = new RichEmbed()
        .setColor("RANDOM")
        .setTitle(`Stats For ${d.username}`)
        .setDescription(`**Top Placement**\n\n**Top 3s:** *${d.lifetimeStats[0].value}*/n**Top 5s:**
        *${d.lifetimeStats[1].value}*\n**Top 6s:** *${d.lifetimeStats[3].value}*\n**Top 12s:**
        *${d.lifetimeStats[4].value}*\n**Top 25s:** *${d.lifetimeStats[5].value}*`, true)
        .addField("Total Score", d.lifetimeStats[6].value)
        .addField("Matches Played", d.lifetimeStats[7].value, true)
        .addField('Wins', d.lifetimeStats[8].value, true)
        .addField('Win Percentage', d.lifetimeStats[9].value, true)
        .addField('Kills', d.lifetimeStats[10].value, true)
        .addField('K/D Ratio', d.lifetimeStats[11].value, true)
        .addField('Kills Per Minute', d.lifetimeStats[12].value, true)
        .addField('Time Played', d.lifetimeStats[13].value, true)
        .addField('Average Survival Time', d.lifetimeStats[14].value, true)
    })
});
client.login(process.env.BOT_TOKEN);
