const { OpenAI } = require("openai");
const { ActivityHandler, MessageFactory } = require("botbuilder");
const axios = require("axios");
require("dotenv").config;

const openai = new OpenAI({
  apiKey: process.env.CHATGPT_TOKEN,
});

class MyBot extends ActivityHandler {
  constructor() {
    super();

    this.onMessage(async (context, next) => {
      const userMessage = context.activity.text;

      // ChatGPTにリクエストを送信
      const response = await openai.chat.completions.create({
        messages: [{ role: "user", content: `${userMessage}` }],
        model: "gpt-3.5-turbo",
      });

      // ChatGPTからの応答をユーザーに送信
      await context.sendActivity(response.choices[0].message.content);

      await next();
    });
  }
}

module.exports.MyBot = MyBot;
