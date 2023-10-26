import * as fs from 'node:fs';

const text = (fs.readFileSync('./scripts/source.txt', 'utf8')).split('\n').map(v => {
    // trim spaces
    return v.replace(/ /g, '')
        .split('\t')
})

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

const json = JSON.stringify(text
    .filter(v => v[1])
    .map(v => ({
        pos: v[0],
        enPos: en.find(p => p.j === v[0]),
        text: v[1]
    })))

console.log(
    json
)