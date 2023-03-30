import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import { Configuration, OpenAIApi } from 'openai';

dotenv.config();

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', async (req, res) => {
    res.status(200).send({
        message: 'Hello from CodeX',
    })
});

app.post('/', async (req, res) => {
    try {
        const prompt = req.body.prompt;

        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt:`${prompt}`,
            temperature: 0, //temperature determines level of risk the AI can take in terms of giving information it already knows or searching for new information
            max_tokens: 3000, //max number of characters to generate in a complete answer
            top_p: 1,
            frequency_penalty: 0.5, //determines how repetitive AI can be in its answers
            presence_penalty: 0,
        });

        res.status(200).send({
            bot: response.data.choices[0].text
        })
        } catch (error) {
            console.log(error);
            res.status(500).send({ error })
        }
    })

app.listen(5000, () => console.log('Server is running on port http://localhost:5000'));