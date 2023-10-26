import 'dotenv/config'

// Import the framework and instantiate it
import Fastify from 'fastify'
import { OpenAI } from 'openai'
const fastify = Fastify({
  logger: true
})


const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})


// Declare a route
fastify.get('/', async function handler(request, reply) {
  return { hello: 'world' }
})

fastify.post('/translate', async function handler(request, reply) {

  const body = request.body

  const completion = await client.chat.completions.create({
    messages: [
      {
        role: "system", content: `You are a Japanese snippets to English translator. 
Return simple english definitions, including furigana readings. 
Expect phrases and or single words. reply in below format

f: ふりがな
w: japanese here
e: english definition here
` },
      { role: "user", content: body }
    ],
    model: "gpt-3.5-turbo",
  });

  console.log(completion.choices);

  return { body: completion.choices[0].message.content }
})

// Run the server!
try {
  await fastify.listen({ port: 3000 })
} catch (err) {
  fastify.log.error(err)
  process.exit(1)
}
