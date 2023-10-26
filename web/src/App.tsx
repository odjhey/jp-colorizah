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
]

function App() {

  const tokens = source
  return (
    <>
      {tokens.map(v => <span>{v.text}</span>)}
      <br />
      <br />
      <div
        style={{ fontSize: 20, padding: 10, color: "grey", backgroundColor: "#444" }}>
        {tokens.map(v => <span
          onClick={() => {
            fetch("/translate", {
              method: "POST",
              headers: {
                "Content-Type": "text/plain"
              },
              body: v.text
            }).then(r => r.json()).then(console.log)
          }}
          style={{ color: COLORS[parseInt(v.enPos.code)] }}>{v.text}</span>)}
      </div>
    </>
  )
}

export default App
