const { SlashCommandBuilder, SelectMenuComponent } = require('discord.js');
const { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, SelectMenuBuilder } = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('calc')
        .setDescription('calculate the profit and loss with bets'),
    async execute(interaction) {
        // return;
        const modal = new ModalBuilder()
            .setCustomId('myModal')
            .setTitle('Betting Calculator');

        // Add components to modal

        // Create the text input components
        const favoriteColorInput = new TextInputBuilder()
            .setCustomId('firstOdd')
            // The label is the prompt the user sees for this input
            .setLabel("First Odds: ")
            // Short means only a single line of text
            .setStyle(TextInputStyle.Short);

        const hobbiesInput = new TextInputBuilder()
            .setCustomId('secondOdds')
            .setLabel("Second Odds")
            // Paragraph means multiple lines of text.
            .setStyle(TextInputStyle.Short);
        const thirdInput = new TextInputBuilder()
            .setCustomId('thirdOdds')
            .setLabel("Wager for First Odds")
            // Paragraph means multiple lines of text.
            .setStyle(TextInputStyle.Short);

        // const select = new SelectMenuBuilder().setCustomId('select').setPlaceholder('Positive').addOptions([{
        //     label: 'Positive',
        //     description: 'Positive First Odd',
        //     value: '1',
        // },
        // {
        //     label: 'Negative',
        //     description: 'Negative First Odd',
        //     value: '-1',
        // }])
        // An action row only holds one text input,
        // so you need one action row per text input.
        // const type = new ActionRowBuilder().addComponents(select)
        const firstActionRow = new ActionRowBuilder().addComponents(favoriteColorInput);
        const secondActionRow = new ActionRowBuilder().addComponents(hobbiesInput);
        const thirdActionRow = new ActionRowBuilder().addComponents(thirdInput);


        // Add inputs to the modal
        modal.addComponents(firstActionRow, secondActionRow, thirdActionRow);


        // Show the modal to the user
        return await interaction.showModal(modal)
        // return interaction.reply('Calculating...');
    },
};