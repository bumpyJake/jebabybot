const Discord = require('discord.js');

const client = new Discord.Client();


const prefix = "?"





const fs = require('fs');
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}



var status = require("./status.json")
















// ready

client.once('ready', () => {
    console.log('Jebaby Bot is online!');
    const activity = 
    client.user.setActivity(status.status, { //write msg here
        type: "WATCHING", //LISTENING or PLAYING
        name: "itt"
      });
});













// welcome

client.on('guildMemberAdd', member => {
    const channel = member.guild.channels.cache.find(ch => ch.name === 'member-joins'); //channel to send msg
    if (!channel) return;
    var message = "Make sure to read the rules at " + member.guild.channels.cache.find(ch => ch.name === 'rules').toString();
    channel.send(`Welcome to The Mine, ${member}!!! ` + message); //welcome message
    member.send('Welcome The Mine! ' + message)
    member.roles.add('726494417741152256'); //role to add (id)
    const { Client, MessageEmbed } = require('discord.js');
    const embed = new MessageEmbed()
    .setTitle("Welcome To The Mine!")
    .setAuthor("Jebaby Bot", "https://i.imgur.com/7rqoEcU.png")
    .setColor('GREEN')
    .setThumbnail('https://i.imgur.com/Xzq4uyZ.png"')
    .setDescription(`This is the server to talk about all things gaming, makeup, and most of all, **aliyahyeet**! ` + message + `, and if you have any questions, please message <@&726272465667620986>/<@&726286298888798249>`)
    // .setFooter("The Mine", "https://i.imgur.com/Xzq4uyZ.png")
    channel.send({embed})

    
});



























// status command

client.on('message', message => {
    if (message.author.bot) return;
    
    const args = message.content.slice(prefix.length).trim().split(' ');
    const command = args.shift().toLowerCase();
    const text = args.join(' ');


    if (command === 'status') { 
        if(message.member.permissions.has("MANAGE_GUILD")){
            if (!args.length) {
                return message.channel.send(`Please enter a status.`);
            }
        
            client.user.setActivity(text, { //write msg here
                type: "WATCHING", //LISTENING or PLAYING
                name: "itt"
            });
            message.channel.send('Changed status to `' + text + '`')
            status.status = text
            fs.writeFile("./status.json", JSON.stringify(status, null, 4), "utf8", err => {
                if (err) throw err
            })
        } else {
            message.channel.send('You do not have permission to perform this command.')
        } 
        
    }
});















// test commands/normal commands

client.on('message', message =>{
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if(command === 'ping'){ // ping command (in seperate file)
        message.channel.send('pong!')
    } else if (command === 'twitch'){
        client.commands.get('twitch').execute(message,args);
    } else if (command === 'jebaby'){
        message.channel.send('**JEBABY!!!!**', {files: ['https://i.imgur.com/la5riXm.png']});
    } else if (command == 'members'){ // members command 
        const { Client, MessageEmbed } = require('discord.js');
        const embed = new MessageEmbed()
            .setTitle(`${message.guild.memberCount} Members`)
            .setColor('GREEN')
            .setFooter('The Mine', 'https://i.imgur.com/Xzq4uyZ.png')

        message.channel.send(embed);
    } else if (command == 'welcome-message'){
        const { Client, MessageEmbed } = require('discord.js');
        const embed = new MessageEmbed()
        .setTitle("Welcome To The Mine!")
        .setAuthor("Jebaby Bot", "https://i.imgur.com/7rqoEcU.png")
        .setColor('GREEN')
        .setThumbnail('https://i.imgur.com/Xzq4uyZ.png"')
        .setDescription(`This is the server to talk about all things gaming, makeup, and most of all, **aliyahyeet**! Please make sure to read and obide by the  ` + message.guild.channels.cache.find(ch => ch.name === 'rules').toString() + `, and if you have any questions, pelase message <@&726272465667620986>/<@&726286298888798249>`)
        // .setFooter("The Mine", "https://i.imgur.com/Xzq4uyZ.png")
        message.channel.send({embed})
    }
});










// mee6 stream announcements 

client.on('message', message => {
    // check to ensure message was sent by bot and contains embed
    if (!message.author.bot || !message.embeds[0]) return;
    if (message.channel.id === '746785301023686700'){
        const receivedEmbed = message.embeds[0];
        const exampleEmbed = new Discord.MessageEmbed(receivedEmbed);
      
        // send in same channel
        // message.channel.send(exampleEmbed);
      ~
        // send in different channel
        client.channels.fetch('726492895523242035').then(channel => {
            channel.send("Emerald is live!! Come chat!! \n<https://twitch.tv/aliyahyeet_> \n \n[ @everyone ] \n" + exampleEmbed)
        });
        
        // alternatively, you can use this (but the function must be asynchronous)
        // const channel = await client.channels.fetch(/* Channel ID */);
        // channel.send(exampleEmbed);
    }
  });




  // manual stream announcements

  client.on('message', message => {
    if (message.author.bot) return;
    
    const args = message.content.slice(prefix.length).trim().split(' ');
    const command = args.shift().toLowerCase();
    const text = args.join(' ');

    if (command === 'live') {
        if(message.member.permissions.has("MANAGE_GUILD")) {
            message.delete();
            const channel = client.channels.cache.get('726492895523242035');
            const testEmbed = new Discord.MessageEmbed()
                .setColor('GREEN')
                .setTitle('aliyahyeet_ is now live!!!')
                .setURL('https://twitch.tv/aliyahyeet_')
                .setThumbnail('https://i.imgur.com/HYRNmbW.png')
                .setImage('https://i.imgur.com/e2wNSP3.jpg')
                .setAuthor('aliyahyeet_', 'https://i.imgur.com/HYRNmbW.png')
            channel.send('Emerald is live!!! \n \n [ @everyone ]')
            channel.send(testEmbed);
        } else message.channel.send('You dont have permission')
    } 


})



//     if(message.member.permissions.has("MANAGE_GUILD")) {
//         if (command === 'live') {
//             message.delete();
//             const channel = client.channels.cache.get('726492895523242035');
//             const testEmbed = new Discord.MessageEmbed()
//                 .setColor('GREEN')
//                 .setTitle('aliyahyeet_ is now live!!!')
//                 .setURL('https://twitch.tv/aliyahyeet_')
//                 .setThumbnail('https://i.imgur.com/HYRNmbW.png')
//                 .setImage('https://i.imgur.com/e2wNSP3.jpg')
//                 .setAuthor('aliyahyeet_', 'https://i.imgur.com/HYRNmbW.png')
//             channel.send('Emerald is live!!! \n \n [ ]')
//             channel.send(testEmbed);
//         }
//     } else message.channel.send('You dont have permission')


// })














// COMMANDS REQUIRING ARGS 

client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(' ');
    const command = args.shift().toLowerCase();
    const text = args.join(' ');
// announce embed command
    if (command == 'announce-embed'){
        const channel = client.channels.cache.get('726269472582926366');
        if(message.member.permissions.has("MANAGE_GUILD")) {
            if (!args.length) {
                return message.channel.send(`Please tell the bot what to announce in an embed, ${message.author}`);
            }
        
            const { Client, MessageEmbed } = require('discord.js');
            const embedlol = new MessageEmbed()
                .setTitle(`${text}`)
                .setColor('GREEN')
    
            channel.send(embedlol);
            channel.send("@everyone")
        } else message.channel.send('You dont have permission.');
// announce command
    } else if (command == 'announce'){
        const channel = client.channels.cache.get('726269472582926366');
        if(message.member.permissions.has("MANAGE_GUILD")) {
            if (!args.length) {
                return message.channel.send(`Please tell the bot what to announce in an embed, ${message.author}`);
            }
        
    
            channel.send(text);
        } else message.channel.send('You dont have permission.');
    } else if (command == 'rule-1'){
        if(message.member.permissions.has("KICK_MEMBERS")) {
            const embed = new Discord.MessageEmbed()
            .setTitle("Rule 1:")
            .setColor('GREEN')
            .setDescription('"**Treat people the way you would like to be treated"**. Bullying, racism, slurs, hate speech, homophobia, transphobia, sexual harassment or mistreatment of any kind to any member will **NOT** be tolerated."')
            .setFooter('The Mine', 'https://i.imgur.com/Xzq4uyZ.png')
            message.channel.send({embed})
    
        } else message.channel.send('You dont have permission.');
    } else if (command == 'rule-2'){
        if(message.member.permissions.has("KICK_MEMBERS")) {
            const embed = new Discord.MessageEmbed()
            .setTitle("Rule 2:")
            .setColor('GREEN')
            .setDescription('Please no spam and try to stick to the channel topics when chatting.')
            .setFooter('The Mine', 'https://i.imgur.com/Xzq4uyZ.png')
            message.channel.send({embed})
    
        } else message.channel.send('You dont have permission.');
    } else if (command == 'rule-3'){
        if(message.member.permissions.has("KICK_MEMBERS")) {
            const embed = new Discord.MessageEmbed()
            .setTitle("Rule 3:")
            .setColor('GREEN')
            .setDescription('No beef. Dont start arguments or disputes and if you have a problem please message a mod or Emerald.')
            .setFooter('The Mine', 'https://i.imgur.com/Xzq4uyZ.png')
            message.channel.send({embed})
    
        } else message.channel.send('You dont have permission.');
    } else if (command == 'rule-4'){
        if(message.member.permissions.has("KICK_MEMBERS")) {
            const embed = new Discord.MessageEmbed()
            .setTitle("Rule 4:")
            .setColor('GREEN')
            .setDescription('Please keep it PG and SFW. NO nudity, real intense gore and obscene imagery or language allowed.')
            .setFooter('The Mine', 'https://i.imgur.com/Xzq4uyZ.png')
            message.channel.send({embed})
    
        } else message.channel.send('You dont have permission.');
    } else if (command == 'rule-5'){
        if(message.member.permissions.has("KICK_MEMBERS")) {
            const embed = new Discord.MessageEmbed()
            .setTitle("Rule 5:")
            .setColor('GREEN')
            .setDescription('We want to keep this a safe and healthy environment for people from all walks of life so please be mindful of what you say, do and post.')
            .setFooter('The Mine', 'https://i.imgur.com/Xzq4uyZ.png')
            message.channel.send({embed})
    
        } else message.channel.send('You dont have permission.');
    } else if (command == 'rule-6'){
        if(message.member.permissions.has("KICK_MEMBERS")) {
            const embed = new Discord.MessageEmbed()
            .setTitle("Rule 6:")
            .setColor('GREEN')
            .setDescription('Follow the Discord TOS.')
            .setFooter('The Mine', 'https://i.imgur.com/Xzq4uyZ.png')
            message.channel.send({embed})
    
        } else message.channel.send('You dont have permission.');
    } else if (command == 'rule-7'){
        if(message.member.permissions.has("KICK_MEMBERS")) {
            const embed = new Discord.MessageEmbed()
            .setTitle("Rule 7:")
            .setColor('GREEN')
            .setDescription('If you have a concern or problem please contact <@&726286298888798249> or <@&726272465667620986>.')
            .setFooter('The Mine', 'https://i.imgur.com/Xzq4uyZ.png')
            message.channel.send({embed})
    
        } else message.channel.send('You dont have permission.');
    } 
    
})
a












client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(' ');
    const command = args.shift().toLowerCase();
    const member = message.mentions.members.first();

    if (command === 'stream') { 
        if(message.member.permissions.has("MANAGE_ROLES")){
            if (!args.length) {
                return message.channel.send(`Please enter a user to add to the streaming role, ${message.author}`);
            } else if (!member.roles.cache.some(role => role.name === 'streaming')) {


                member.roles.add('744289394369888398')
                message.channel.send('`Added streaming role.`')
            } else 
                member.roles.remove('744289394369888398') && message.channel.send('`Removed streaming role.`')
            
            
            
        } else message.channel.send('`You dont have permission.`')
    } else return;
});












client.login(process.env.token);