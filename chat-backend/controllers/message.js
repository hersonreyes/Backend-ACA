const Message = require('../models/message');
const Bot = require('../models/bot');
const { response } = require("express");
const { PythonShell } = require('python-shell');

const interactWithChatbot = async (input) => {
    return new Promise((resolve, reject) => {
        const options = {
            mode: 'text',
            pythonPath: 'python', // Reemplaza con la ruta correcta a tu instalación de Python
            scriptPath: '../chatbot/ChatBot.py', // Reemplaza con la ruta correcta a tu script de chatbot
        };

        PythonShell.runString('x=1+1;print(x)', null).then(messages=>{
            console.log('finished');
          });

        PythonShell.run('ChatBot.py', options, (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });

        //PythonShell.send(input);
        PythonShell.send(input);
        console.log("hola");
        PythonShell.on('message', (message) => {
            // Aquí puedes almacenar el mensaje del chatbot en tu base de datos
            const botMessage = new Bot({
                user: myUid,
                message: message,
                status: 2
            });
            botMessage.save();
        });
    });
};

const getChat = async (req, res = response) => {
    const myUid = req.uid;
    const messagesFrom = req.params.from;

    console.log("hola2");

    const messages = await Promise.all([
        Message.find({
            $or: [
                { from: myUid, to: messagesFrom },
                { from: messagesFrom, to: myUid },
            ]
        }).sort({ createdAt: 'asc' })
        .limit(30),
        Bot.find({ user: myUid }).sort({ createdAt: 'asc' }).limit(30)
    ]);

    const combinedMessages = messages.reduce((acc, curr) => acc.concat(curr), []);
    const sortedMessages = combinedMessages.sort((a, b) => a.createdAt - b.createdAt);
    const chatbotResponse = await interactWithChatbot('hola');

    res.json({
        ok: true,
        messages: sortedMessages.concat(chatbotResponse)
    });
};

const test = async (req, res = response) => {
    console.log("hola");
    res.json({
        ok: true,
        messages: "hola"
    });
};

module.exports = {
    getChat,
    interactWithChatbot,
    test
}