import "./ColoredSentence.css";
import { useState } from "react";

import ConvertFinalText from "../ConverFinalText/ConvertFinalText";

const ColoredSentence = () => {
  const [text, setText] = useState("Lorem Ipsum");
  const [finalText, setFinalText] = useState([
    "L",
    "o",
    "r",
    "e",
    "m ",
    "I",
    "p",
    "s",
    "u",
    "m",
  ]);
  const [nbOfColors, setNbOfColors] = useState(4);

  const handleCopy = () => {
    navigator.clipboard.writeText([...modifiedText].join(""));
  };

  const handleInputChange = (e) => {
    const input = e.target.value;
    const result = [];

    for (let i = 0; i < input.length; i++) {
      let char = input[i];

      // Check if the character after the letter is a space or a "'" and include it
      if (i + 1 < input.length && [" ", "'"].includes(input[i + 1])) {
        char += input[i + 1];
        i++;
      }

      result.push(char);
    }

    setText(input);
    setFinalText(result);
  };

  // Stocke les préfixes des inputs
  const [prefixes, setPrefixes] = useState(["&4&l", "&c&l", "&7&l", "&8&l"]);

  // Met à jour un préfixe spécifique
  const handleChange = (index, value) => {
    const newPrefixes = [...prefixes];

    if (value.length > 6) return;

    newPrefixes[index] = value;
    setPrefixes(newPrefixes);
  };

  // Génère le texte modifié
  const modifiedText = finalText.map((char, index) => {
    const prefixIndex = index % nbOfColors;
    return `${prefixes[prefixIndex] || ""}${char}`;
  });

  const escapedHexColors = (str) => {
    return str.replace(/(&[0-9a-flmnokr])/g, "\\$1");
  };

  return (
    <div className="minecraft-colors">
      <div className="colors-txt">
        <div>
          <input
            name="Mot / Caractère à ajouter"
            type="text"
            value={text}
            onChange={(e) => handleInputChange(e)}
          />
          <p
            style={{
              color: "var(--text85)",
              margin: 5,
              lineHeight: 1,
            }}
          >
            Sentence to split
          </p>
        </div>
        <div className="splits-div">
          <input
            name="Number of splits"
            type="number"
            value={nbOfColors}
            min={1}
            max={6}
            onChange={(e) => setNbOfColors(e.target.value)}
            style={{ width: 35 }}
          />
          <p
            style={{
              color: "var(--text85)",
              margin: 5,
              lineHeight: 1,
              textAlign: "left",
            }}
          >
            Number of splits
          </p>
        </div>
        <div className="btns-selector">
          <button onClick={handleCopy}>Copy everything</button>
        </div>
      </div>
      <div className="colors-inputs">
        {(() => {
          const colorsInputs = [];

          for (let i = 0; i < 6; i++) {
            const isDisabled = i >= nbOfColors;

            colorsInputs.push(
              <div className="colorInput-wrapper" key={i}>
                <input
                  className={isDisabled ? "colorInput-disabled" : "colorInput"}
                  type="text"
                  placeholder={`Prefix ${i + 1}`}
                  disabled={isDisabled}
                  value={!isDisabled ? prefixes[i] : ""}
                  onChange={(e) =>
                    !isDisabled && handleChange(i, e.target.value)
                  }
                />
                {!isDisabled && (
                  <span className="colorPreview">
                    <ConvertFinalText
                      text={escapedHexColors(prefixes[i] || "")}
                    />
                  </span>
                )}
              </div>
            );
          }

          return colorsInputs;
        })()}
      </div>

      <div className="after-div">
        <p
          style={{
            color: "var(--text85)",
            margin: 5,
            lineHeight: 1,
            textAlign: "left",
          }}
        >
          After Edit
        </p>
        <small className="after-edit">
          {[...modifiedText].map((e, i) => (
            <ConvertFinalText text={e} key={i} />
          ))}
        </small>
      </div>
    </div>
  );
};

export default ColoredSentence;
