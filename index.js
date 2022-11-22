const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const { TOKEN } = require('./config.js');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });




// commands input 
const { ActionRowBuilder, Events, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');



client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	client.commands.set(command.data.name, command);
}

client.once(Events.ClientReady, () => {
	console.log('Ready!');
});


client.on(Events.InteractionCreate, interaction => {
	if (!interaction.isModalSubmit()) return;
	const firstOdd = interaction.fields.getTextInputValue('firstOdd');
	const secondOdd = interaction.fields.getTextInputValue('secondOdds');
	const wager = interaction.fields.getTextInputValue('thirdOdds');

	console.log({ firstOdd, secondOdd ,wager});
// $250 on (-256) - Payout 347.66
// $93.78 on (+270) - Payout 347.66
// Total Stake - $250 + $93.78 = 343.78
// Total Profit = 347.66 - $343.78 = $3.88
    let first = calcProfit(firstOdd,wager)
    let second = calcProfitWithResult(secondOdd,calcProfit(firstOdd,wager))
    let stake = parseFloat(wager) + second
    let profit = first - stake
    return interaction.reply(`$${wager} on (${firstOdd}) - Payout ${first.toFixed(2)}\n$${second.toFixed(2)} on (${secondOdd}) - Payout ${first.toFixed(2)}\nTotal Stake - $${parseFloat(wager).toFixed(2)} + $${second.toFixed(2)} = ${stake.toFixed(2)}\nTotal Profit = $${first.toFixed(2)} - $${stake.toFixed(2)} = $${profit.toFixed(2)}`)
});

function calcProfit(val,wager){
    if(val >= 0){
        return ((Math.abs(val)/100) + 1) * wager;
    }else {
        return ((100/Math.abs(val)) + 1 ) * wager;
    }
}

function calcProfitWithResult(val,result){
        return result / ((val/100) + 1)
}

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

client.login(TOKEN);