import "./App.css";

import ColoredSentence from "./components/ColoredSentence/ColoredSentence";
import MinecraftColoredText from "./components/MinecraftColoredText/MinecraftColoredText";

function App() {
  return (
    <section className="App">
      <div>
        <MinecraftColoredText />
        <ColoredSentence />
      </div>
    </section>
  );
}

export default App;
