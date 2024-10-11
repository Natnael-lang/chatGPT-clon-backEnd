const express = require('express');
const OpenAI = require('openai');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const port = 5000;


app.use(cors());
app.use(bodyParser.json());


app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());
apiKey1= process.env.OPENAI_API_KEY
const openai = new OpenAI({
    apiKey:apiKey1,
    
});

app.post('/api/chat', async (req, res) => {
    const messages = req.body.messages;

    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: messages,
        });
        res.json(completion.choices[0].message);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Error generating response");
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});