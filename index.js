/**
 * Slack Developer Kit for Node.js
 * @see https://slackapi.github.io/node-slack-sdk/
 * @see https://github.com/slackapi/node-slack-sdk
 */
var dotenv = require('dotenv').config();
var RtmClient = require('@slack/client').RtmClient;
var WebClient = require('@slack/client').WebClient;
var RTM_EVENTS = require('@slack/client').RTM_EVENTS;

// Set the authentication token
var botToken = process.env.GNA_SLACK_BOT_TOKEN || "";

// Initialize the RealTimeClient with the token
var rtm = new RtmClient(botToken);
var web = new WebClient(botToken);

var triggerWords = [
    "guys",
    "fellas",
    "dudes",
    "bros",
    "man up",
    "boss man",
    "man power"
];

var introPhrase = "Oops! You mentioned";

var responses = [
    "Did you mean to say",
    "Maybe you meant to say",
    "Instead, why don't you use:"
];

var correctWords = {
    "guys": "everyone",
    "fella": "person",
    "fellas": "all",
    "dudes": "people",
    "bros": "team",
    "man up": "be strong",
    "boss man": "boss",
    "man power": "power",
};

/**
 * Checks message for presence of trigger words
 * @param String messageText - text of user's message
 */
function checkMessage(messageText) {
    // Check lowercase words, so capitalized words match
    var messageText = messageText.toLowerCase();
    var wordsToCorrect = [];

    triggerWords.forEach(function (word) {
        if (messageText.includes(word)) {
            wordsToCorrect.push(word);
        }
    });

    return wordsToCorrect;
}

/**
 * Given an array of gender-specific words, builds a message to send to a user
 * @param Array wordsToCorrect - the gender-specific words a user sent in a message
 */
function buildMessage(wordsToCorrect) {
    var usedWords = "";
    var correctedWords = "";
    var linkMessage = "Want to learn more? Check out:";
    var randomPhrase = responses[Math.floor(Math.random() * responses.length)];

    wordsToCorrect.forEach(function (word, index, wordsToCorrect) {
        var punctuation = index < wordsToCorrect.length - 1 ? " and " : "";

        usedWords += "*_" + word + "_*" + punctuation;
        correctedWords += "*_" + correctWords[word] + "_*" + punctuation;
    });

    // build message
    var message = introPhrase + " " + usedWords + ". " + randomPhrase + " " + correctedWords + "?\n\n" + linkMessage;
    
    return message;
}

/**
 * Sends a direct message to a user
 * @param String message - Message to send
 * @param Object user - User that is receiving a direct message
 */
function replyWithMessage(message, user) {

    web.im.open(user).then((directMessage) => {

        web.chat.postMessage(directMessage.channel.id, message, {
            "attachments": [
                {
                    "color": "good", 
                    "title": "The Right Words for the Job",
                    "title_link": "https://medium.com/women-in-product/genderwords-b0be0cc8251f",
                    "text": "How Gendered Language Affects the Workplace",
                    "author_name": "Deb Liu"
                }
            ]
        });
    });
}

// When the RealTimeClient receives a message, call handleMessage
rtm.on(RTM_EVENTS.MESSAGE, function handleMessage(message) {
    var isBotMessage = typeof message.subtype != "undefined" && message.subtype === "bot_message";

    if (!isBotMessage) {
        var messageText = message.text;
        var user = message.user;
        var wordsToCorrect, message;

        // Check if trigger words are contained in a user's message
        wordsToCorrect = checkMessage(messageText);

        if (wordsToCorrect && wordsToCorrect.length > 0) {
            message = buildMessage(wordsToCorrect);
            replyWithMessage(message, user);
        }

    }

});

rtm.start();

