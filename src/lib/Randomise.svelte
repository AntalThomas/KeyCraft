<script lang="ts">
  let maxNumber: number = 12;
  let randomPassword: string = "";

  // Reactive variables for character type selection
  let includeUppercase: boolean = true;
  let includeLowercase: boolean = true;
  let includeNumbers: boolean = true;
  let includeSymbols: boolean = true;

  const randomise = () => {
    let newCharacters: string[] = [];
    let characterPool: string = "";

    // Define character sets
    const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
    const numberChars = "0123456789";
    const symbolChars = "!@#$%^&*()_+~`|}{[]:;?><,./-=";

    // Build character pool based on selections
    if (includeUppercase) characterPool += uppercaseChars;
    if (includeLowercase) characterPool += lowercaseChars;
    if (includeNumbers) characterPool += numberChars;
    if (includeSymbols) characterPool += symbolChars;

    // Ensure at least one option is selected
    if (characterPool.length === 0) {
      alert(
        "Please select at least one character type (e.g., numbers, letters, or symbols)."
      );
      randomPassword = "";
      return;
    }

    for (let i = 0; i < maxNumber; i++) {
      // Select random character from the combined pool
      let randomIndex: number = Math.floor(
        Math.random() * characterPool.length
      );
      newCharacters.push(characterPool[randomIndex]);
    }

    randomPassword = newCharacters.join("");
    console.log("Generated Password: ", randomPassword);
  };
</script>

<div style="text-align: left;">
  <label for="passwordLength">Password Length</label>
  <div
    class="lengthInput"
    style="display: flex; align-items: center; padding-bottom: 1em; gap: 1em;"
  >
    <input type="number" bind:value={maxNumber} min="1" max="24" />
    <input type="range" bind:value={maxNumber} min="1" max="24" />
  </div>
</div>

<div class="optionsSelection">
  <div class="option">
    <input
      type="checkbox"
      id="includeUppercase"
      bind:checked={includeUppercase}
    />
    <label for="includeUppercase">Include Uppercase Letters</label>
  </div>

  <div class="option">
    <input
      type="checkbox"
      id="includeLowercase"
      bind:checked={includeLowercase}
    />
    <label for="includeLowercase">Include Lowercase Letters</label>
  </div>

  <div class="option">
    <input type="checkbox" id="includeNumbers" bind:checked={includeNumbers} />
    <label for="includeNumbers">Include Numbers</label>
  </div>

  <div class="option">
    <input type="checkbox" id="includeSymbols" bind:checked={includeSymbols} />
    <label for="includeSymbols">Include Symbols</label>
  </div>
</div>

<button on:click={randomise} style="margin-top: 1em;">Generate</button>

<div class="generatedPassword">
  <input
    type="string"
    value={randomPassword}
    style="width: 100%; height: 2em; font-size: 1.2em; padding-left: 0.5em;"
  />
  <button
    class="copy-button"
    on:click={() => {
      navigator.clipboard.writeText(randomPassword);
    }}
    title="Copy to clipboard"
    aria-label="Copy password to clipboard"
  ></button>
</div>

<style>
  .copy-button {
    height: 2.5em;
    background-image: url("../assets/copy-icon.svg");
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    cursor: pointer;
    background-color: transparent;
    border: none;
  }

  .copy-button:hover,
  .copy-button:focus {
    background-color: transparent;
    outline: none;
    border: none;
  }

  input[type="range"] {
    width: 100%;
  }

  .generatedPassword {
    display: flex;
    align-items: center;
    gap: 0.5em;
    margin-top: 1em;
  }

  .optionsSelection {
    display: flex;
    flex-direction: column;
    text-align: left;
    margin-top: 1em;
  }
</style>
