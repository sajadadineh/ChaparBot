import {
  Client,
  GatewayIntentBits,
  EmbedBuilder,
  REST,
  Routes,
} from "discord.js";

import config from "./config.js";

const { TOKEN, CLIENT_ID } = config;

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMessageTyping,
    GatewayIntentBits.DirectMessageReactions,
    GatewayIntentBits.DirectMessageTyping,
  ],
});

const rest = new REST({ version: 10 }).setToken(TOKEN);

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("interactionCreate", async (interaction) => {
  if (interaction.isChatInputCommand()) {
    console.log(interaction.commandName);
    // TODO
    await interaction.reply("comming soon... !");
  }
});

client.on("messageCreate", async (message) => {
  // TODO: not get the DM message
  // when send the DM message
  // if (!message.author.bot) {
  //   message.author.send(
  //     "Hello, I am a personal assistant and I am not allowed to talk to you"
  //   );
  // }

  if (message.author.bot) return;

  message.channel.send({
    embeds: [
      new EmbedBuilder()
        .setDescription("don't send message, just interaction")
        .setAuthor({
          name: client.user.tag,
        })
        .setFooter({ text: "pls type / and select your interaction" })
        .setColor("Red"),
    ],
  });
});

(async () => {
  const commands = [
    {
      name: "status",
      description: "status servers and logs",
    },
  ];

  try {
    console.log("Started refreshing application (/) commands.");
    await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands });
    console.log("Successfully reloaded application (/) commands.");
    client.login(TOKEN);
  } catch (error) {
    console.error(error);
  }
})();
