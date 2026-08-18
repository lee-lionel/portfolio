import { Terminal } from './terminal/Terminal'

export default function App() {
  // A main landmark, so assistive tech can skip straight to the terminal
  // instead of walking the whole document.
  return (
    <main>
      <Terminal />
    </main>
  )
}
