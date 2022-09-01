const twit = require(`twit`);

require(`dotenv`).config();

const bot = new twit({
    consumer_key: process.env.API_KEY,
    consumer_secret: process.env.API_SECRET_KEY,
    access_token: process.env.ACCESS_TOKEN,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET,
    timeout_ms: 60*1000,
});

const botIit = () => {
    const query = {
        q: `#javascript`,
        result_type: `recent`
    };
    bot.get(`search/tweets`, query, (error, data, response)=>{
        if(error){
            console.log(`Bot nao conseguiu realizar a busca dos ultimos tweets`);
        }else{
            const id= {
                id: data.statues[0].id_str,
            };

        }
        bot.post(`statuses/retweet/:id`, id, (error, response)=>{
            if(error){
                console.log(`nao deu certo o retwit`, error);
            }else{
                console.log(`Bot retweeto`, id.id);
            }

        })
    })
}

setInterval(botIit, 1*60*1000);
botIit();