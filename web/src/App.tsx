import { useRef, useState } from 'react'
import './App.css'

import source from './source.json'

const COLORS = [
  //  '#FF0000', // Bright Red
  //  '#FFFF00', // Bright Yellow
  //  '#0000FF', // Bright Blue
  //  '#000000', // Bright Green
  //  '#FF00FF', // Magenta
  //  '#00FFFF', // Cyan
  //  '#FF8000', // Bright Orange
  //  '#8000FF', // Violet
  //  '#0080FF', // Sky Blue
  //  '#FF0080', // Hot Pink

  '#FFA6B3', // pastel pink
  '#A6FFB3', // pastel mint
  '#A6B3FF', // pastel blue
  '#FFFFA6', // pastel yellow
  '#FFA6F9', // pastel lavender
  '#A6FFF9', // pastel aqua
  '#FFDFA6', // pastel peach
  '#FFC085', // pastel tangerine
  '#FFA6A6', // pastel rose
  '#DAA6FF', // pastel lilac
  '#FF8000', // Bright Orange
]

function App() {

  const [definition, setDefinition] = useState('')
  const [textRawSegmented, setTextRawSegmented] = useState('')
  const [textRaw, setTextRaw] = useState('')

  const tokens = textRawSegmented?.body ?? source
  console.log({ tokens })
  return (
    <>
      <div>
        <form onSubmit={(e) => {
          e.preventDefault()
          console.log(textRaw)

          fetch("/segmentize", {
            method: "POST",
            headers: {
              "Content-Type": "text/plain"
            },
            body: textRaw
          }).then(r => r.json()).then(v => setTextRawSegmented(v))



        }}>
          <textarea name="raw" onChange={(e) => { setTextRaw(e.target.value) }} value={textRaw}></textarea>
          <button>submit</button>
        </form>
      </div>
      {tokens.map((v, i) => <span key={i}>{v.text}</span>)}
      <br />
      <br />
      <div
        style={{ fontSize: 20, padding: 10, color: "grey", backgroundColor: "#444" }}>
        {tokens.map((v, i) => <span
          key={i}
          onClick={() => {
            fetch("/translate", {
              method: "POST",
              headers: {
                "Content-Type": "text/plain"
              },
              body: v.text
            }).then(r => r.json()).then(v => setDefinition(v))
          }}
          style={{ color: COLORS[parseInt(v.enPos.code)] }}>{v.text}</span>)}
      </div>
      <div>
        {JSON.stringify(definition.body ?? "").replaceAll("\\n", " ----  ")}
      </div>
      <div>

        {JSON.stringify(textRawSegmented)}

      </div>
    </>
  )
}

export default App
