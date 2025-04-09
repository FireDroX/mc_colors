const ConvertFinalText = ({ text = "" }) => {
  // Regex explanation:
  // (\\&.) => matches escaped codes like \&4
  // (&.)   => matches regular codes like &4
  const split = Array.from(text.split(/(\\&.|&.)/g).filter(Boolean));

  let currentClasses = [];
  let obfuscatedText = false;
  const elements = [];

  split.forEach((item, index) => {
    let content = "";
    let className = "";

    if (/^\\&./.test(item)) {
      // Escaped format like \&4 — keep literal &4 and apply class
      const code = item.slice(1); // remove the backslash
      className = getClassFromCode(code);
      content = code;
    } else if (/^&./.test(item)) {
      // Regular formatting code
      const code = item;
      const classFromCode = getClassFromCode(code);

      if (code === "&k") {
        obfuscatedText = true;
        currentClasses.push(classFromCode);
      } else if (code === "&r") {
        currentClasses = [];
        obfuscatedText = false;
      } else if (classFromCode) {
        currentClasses.push(classFromCode);
      }
      return; // Don't add this to the text
    } else {
      // Regular content
      content = obfuscatedText ? "" : item;
    }

    elements.push(
      <span
        key={index}
        className={[...currentClasses, className].filter(Boolean).join(" ")}
      >
        {content}
      </span>
    );
  });

  return <>{elements}</>;
};

// Helper to map code to class
function getClassFromCode(code) {
  const codeMap = {
    "&0": "color-black",
    "&1": "color-dark_blue",
    "&2": "color-dark_green",
    "&3": "color-dark_aqua",
    "&4": "color-dark_red",
    "&5": "color-dark_purple",
    "&6": "color-gold",
    "&7": "color-gray",
    "&8": "color-dark_gray",
    "&9": "color-blue",
    "&a": "color-green",
    "&b": "color-aqua",
    "&c": "color-red",
    "&d": "color-light_purple",
    "&e": "color-yellow",
    "&f": "color-white",
    "&l": "color-bold",
    "&m": "color-strikethrough",
    "&n": "color-underline",
    "&o": "color-italic",
    "&k": "mc-obfuscated",
  };
  return codeMap[code] || "";
}

export default ConvertFinalText;
