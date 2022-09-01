const twit = require("twit");

require("dotenv").config();
let id;
const Bot = new twit({
    consumer_key: process.env.API_KEY,
    consumer_secret: process.env.API_SECRET_KEY,
    access_token: process.env.ACCESS_TOKEN,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET,
    timeout_ms: 60 * 1000,
});

const botInit = () => {
    let query = {
        q: "#javascript",
        result_type: "recent",
    };


    Bot.get("search/tweets", query, BotGotLatestTweet);
    function BotGotLatestTweet(error, data, response) {

        if (error) {
            console.log("Bot nao conseguiu realizar a busca dos ultimos tweets");
        } else {
            id = {
                id: data.statues[0].id_str,
            };
        
    }}

    Bot.post("statuses/retweet/:id", id, BotRetweet);
    function BotRetweet(error, response) {
        if (error) {
            console.log("nao deu certo o retwit", error);
        } else {
            console.log("Bot retweeto", id.id);
        }
    }
}


setInterval(botInit, 1 * 60 * 1000);
botInit();