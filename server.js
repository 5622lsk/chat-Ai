
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { OpenAI } = require('openai');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.json()); //추가
app.use(express.urlencoded({extended: false})); //추가

const openai = new OpenAI({ apiKey: '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' });

// '/' 경로에 대한 핸들러 추가
app.get('/', (req, res) => {
  res.send('Hello, this is the root path!');
});

app.post('/ask-openai', async (req, res) => {
  const { userInput } = req.body;

  try {
    const result = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'system', content: 'You are a helpful assistant.' }, { role: 'user', content: userInput }],
      temperature: 1,
      max_tokens: 500,
    });
    res.json({ response: result.choices[0].message.content });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
