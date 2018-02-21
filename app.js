const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
  console.log('I am ready!');
});

client.on('messageReactionAdd', async (messageReaction, user) => {
  if (messageReaction.emoji.name !== '📌') {
    return;
  }
  if (!user.dmChannel) {
    await user.createDM();
  }

  let time = new Date(messageReaction.message.createdTimestamp).toISOString().replace(/T/, ' ').replace(/\..+/, '');
  let info = time + '(UTC)' + ' <@' + messageReaction.message.author.id + '> ' + 'in <#' + messageReaction.message.channel.id + '>';
  let message = '[' + info + '] ' + messageReaction.message.content;
  user.dmChannel.send(message);
});

client.login(process.env.DISCORD_BOT_TOKEN);
