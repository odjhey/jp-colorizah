import 'dotenv/config'

// Import the framework and instantiate it
import Fastify from 'fastify'
import { OpenAI } from 'openai'

import { execa } from 'execa'
import path from 'node:path'

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

fastify.post('/segmentize', async function handler(request, reply) {

  // const result = await execa(`echo '${request.body}' | ./bin/segmenter`)
  const binPath = path.resolve('./bin/segmenter')
  const result = await execa(`echo`, [`'${request.body}'`]).pipeStdout(execa(binPath))

  const aaa = result.stdout.split('\n').map(v => v.split('\t'))

  const en = [
    { j: '名詞', code: '1', e: 'Noun' },
    { j: '助詞', code: '2', e: 'Particle' },
    { j: '記号', code: '3', e: 'Symbol/Punctuation' },
    { j: '形容詞', code: '4', e: 'Adjective' },
    { j: '動詞', code: '5', e: 'Verb' },
    { j: '助動詞', code: '6', e: 'Auxiliary Verb' },
    { j: '連体詞', code: '7', e: 'Adnominal Adjective' },
    { j: '副詞', code: '8', e: 'Adverb' },
    { j: '接続詞', code: '9', e: 'Conjunction' },
    { j: 'フィラー', code: '0', e: 'Filler' },
    { j: 'x', code: '11', e: 'Unknown' },

  ]

  const json = aaa
    .filter(v => v[1])
    .map(v => ({
      pos: v[0],
      enPos: en.find(p => p.j === v[0].trim()),
      text: v[1]
    }))

  return { body: json }

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
