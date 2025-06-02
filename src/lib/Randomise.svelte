<script lang="ts">
  let maxLengthPassword: number = 12;
  let amountOfPasswords: number = 1;
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
      alert("Please select at least one character type (e.g., numbers, letters, or symbols).");
      randomPassword = "";
      return;
    }

    for (let i = 0; i < amountOfPasswords; i++) {
      for (let i = 0; i < maxLengthPassword; i++) {
        let randomIndex: number = Math.floor(Math.random() * characterPool.length);
        newCharacters.push(characterPool[randomIndex]);
      }
      newCharacters.push("\n");
    };

    newCharacters.pop();
    randomPassword = newCharacters.join("");
  }
</script>

<div style="text-align: left;">
  <div
    class="lengthInput"
    style="display: flex; align-items: center; padding-bottom: 1em; gap: 1em;"
  >
    <label for="passwordLength">↔</label>
    <input
      type="number"
      bind:value={maxLengthPassword}
      min="1"
      max="30"
      style="width: 2em;"
    />
    <input type="range" bind:value={maxLengthPassword} min="1" max="30" />
  </div>
</div>

<div style="text-align: left;">
  <div
    class="lengthInput"
    style="display: flex; align-items: center; padding-bottom: 1em; gap: 1em;"
  >
    <label for="passwordAmount">↕</label>
    <input
      type="number"
      bind:value={amountOfPasswords}
      min="1"
      max="10"
      style="width: 2em;"
    />
    <input type="range" bind:value={amountOfPasswords} min="1" max="10" />
  </div>
</div>

<div class="optionsSelection" style="display: flex; flex-direction: row; justify-content: center;">
  <div class="option">
    <input
      type="checkbox"
      id="includeUppercase"
      bind:checked={includeUppercase}
    />
    <label for="includeUppercase">A-Z</label>
  </div>

  <div class="option">
    <input
      type="checkbox"
      id="includeLowercase"
      bind:checked={includeLowercase}
    />
    <label for="includeLowercase">a-z</label>
  </div>

  <div class="option">
    <input type="checkbox" id="includeNumbers" bind:checked={includeNumbers} />
    <label for="includeNumbers">0-9</label>
  </div>

  <div class="option">
    <input type="checkbox" id="includeSymbols" bind:checked={includeSymbols} />
    <label for="includeSymbols">!@#</label>
  </div>
</div>

<div style="padding-bottom: 1em; display: flex; align-items: center; gap: 1em; justify-content: center;">
  <button on:click={randomise} style="margin-top: 1em;">Generate</button>
  <button
    class="copy-button"
    on:click={() => {
      navigator.clipboard.writeText(randomPassword);
    }}
    title="Copy to clipboard"
    aria-label="Copy password to clipboard"
  ></button>
</div>

<textarea
  value={randomPassword}
  style="width: 100%; height: 12em; font-size: 1.2em; resize: none;"
  rows="10"
></textarea>

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

  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
</style>
