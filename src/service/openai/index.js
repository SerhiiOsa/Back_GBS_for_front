const OpenAI = require('openai');
const openai = new OpenAI(process.env.OPENAI_API_KEY);

const generateResponse = async (query) => {
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: "You are a helpful assistant designed to output JSON.",
      },
      { role: "user", content: query },
    ],
    model: "gpt-3.5-turbo",
    response_format: { type: "json_object" },
  });
  
  return completion.choices[0].message.content;
}

module.exports = generateResponse