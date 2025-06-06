<script lang="ts">
  let maxLengthPassword: number = 12;
  let amountOfPasswords: number = 1;
  let randomPassword: string = "";

  let includeUppercase: boolean = true;
  let includeLowercase: boolean = true;
  let includeNumbers: boolean = true;
  let includeSymbols: boolean = true;

  let characterTypeError: string = "";
  let errorTimeout: number | undefined = undefined;

  const clearError = () => {
    if (characterTypeError) {
      characterTypeError = "";
      if (errorTimeout) window.clearTimeout(errorTimeout);
    }
  };

  const randomise = () => {
    clearError();
    let characterPool: string = "";
    const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
    const numberChars = "0123456789";
    const symbolChars = "!@#$%^&*()_+~`|}{[]:;?><,./-=";

    if (includeUppercase) characterPool += uppercaseChars;
    if (includeLowercase) characterPool += lowercaseChars;
    if (includeNumbers) characterPool += numberChars;
    if (includeSymbols) characterPool += symbolChars;

    if (characterPool.length === 0) {
      characterTypeError = "Please select at least one character type.";
      randomPassword = "";
      if (errorTimeout) window.clearTimeout(errorTimeout);
      errorTimeout = window.setTimeout(() => { characterTypeError = ""; }, 3000);
      return;
    }

    const passwordsArray: string[] = [];
    for (let j = 0; j < amountOfPasswords; j++) {
      let singlePasswordChars: string[] = [];

      for (let i = 0; i < maxLengthPassword; i++) {
        const randomValues = new Uint32Array(1);
        window.crypto.getRandomValues(randomValues);
        let randomIndex: number = randomValues[0] % characterPool.length;
        singlePasswordChars.push(characterPool[randomIndex]);
      }
      passwordsArray.push(singlePasswordChars.join(""));
    }

    randomPassword = passwordsArray.join("\n");
  };
</script>

<!-- Length Input -->
<div class="textLeftAlign">
  <div class="lengthInput">
    <label for="passwordLength">↔</label>
    <input
      type="number"
      bind:value={maxLengthPassword}
      on:input={randomise}
      min="6"
      max="30"
      class="form-control-short"
    />
    <input type="range" bind:value={maxLengthPassword} min="6" max="30" />
  </div>
</div>

<!-- Amount Input -->
<div class="textLeftAlign">
  <div class="lengthInput">
    <label for="passwordAmount">↕</label>
    <input
      type="number"
      bind:value={amountOfPasswords}
      min="1"
      max="10"
      class="form-control-short"
    />
    <input type="range" bind:value={amountOfPasswords} min="1" max="10" />
  </div>
</div>

<!-- Password Options -->
<div class="optionsSelection">
  <button 
    class="char-type-button" 
    class:active={includeUppercase} 
    on:click={() => { includeUppercase = !includeUppercase; clearError(); }}
  >A-Z</button>
  <button 
    class="char-type-button" 
    class:active={includeLowercase} 
    on:click={() => { includeLowercase = !includeLowercase; clearError(); }}
  >a-z</button>
  <button 
    class="char-type-button" 
    class:active={includeNumbers} 
    on:click={() => { includeNumbers = !includeNumbers; clearError(); }}
  >0-9</button>
  <button 
    class="char-type-button" 
    class:active={includeSymbols} 
    on:click={() => { includeSymbols = !includeSymbols; clearError(); }}
  >!@#</button>
</div>

{#if characterTypeError}
  <div class="error-message">{characterTypeError}</div>
{/if}

<!-- Text Area with Overlayed Actions -->
<div class="textarea-container">
  <div class="actions-container">
  <button
    class="copy-button"
    on:click={() => {
      navigator.clipboard.writeText(randomPassword);
    }}
    title="Copy to clipboard"
    aria-label="Copy all to clipboard"
  >⿻</button>
  <button on:click={randomise} class="generate-button">↻</button>
  </div>
  <textarea class="textArea" value={randomPassword} rows="10"></textarea>
</div>

<style>
  /* General Layout */
  .textLeftAlign {
    text-align: left;
  }

  /* Input Controls (Length, Amount) */
  .lengthInput {
    display: flex;
    align-items: center;
    padding-bottom: 1em;
    gap: 1em;
  }

  .lengthInput label {
    width: 1.5em;
    text-align: center;
    display: inline-block;
  }

  .form-control-short {
    width: 2em;
  }

  input[type="range"] {
    width: 100%;
  }

  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Character Type Selection Buttons */
  .optionsSelection {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-top: 1em;
    gap: 0.5em;
  }

  .char-type-button {
    padding: 0.5em 1em;
    border: 1px solid var(--wxt-color-gray-400, #ccc);
    background-color: var(--wxt-color-gray-200, #f0f0f0);
    color: var(--wxt-color-gray-800, #333);
    border-radius: 0.375rem;
    cursor: pointer;
    font-weight: 500;
    transition: background-color 0.2s ease-in-out, border-color 0.2s ease-in-out, color 0.2s ease-in-out;
    user-select: none;
  }

  .char-type-button:hover {
    background-color: var(--wxt-color-gray-300, #e0e0e0);
  }

  .char-type-button.active {
    background-color: var(--wxt-color-blue-100, #ebf8ff);
    border-color: var(--wxt-color-blue-500, #3b82f6);
    color: var(--wxt-color-blue-700, #2b6cb0);
  }

  .char-type-button:focus {
    outline: none;
  }

  /* Password Display Area & Action Buttons */
  .textarea-container {
    position: relative;
    margin-top: 1em;
  }

  .textArea {
    width: 100%;
    height: 12.5em;
    font-size: 1.2em;
    resize: none;
    box-sizing: border-box;
  }

  .actions-container {
    position: absolute;
    top: 0.5em;
    right: 0.5em;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    z-index: 10;
  }

  .copy-button {
    font-size: 1.3em;
    color: var(--wxt-text-color-dim, #ccc); 
    width: 2.2em;
    height: 2.2em;
    padding: 0;
    cursor: pointer;
    background-color: transparent;
    border: none;
    display: flex; 
    align-items: center; 
    justify-content: center; 
  }

  .copy-button:hover,
  .copy-button:focus {
    background-color: transparent;
    outline: none;
    border: none;
  }

  .generate-button {
    font-size: 1.3em; 
    padding: 0.1em 0.4em;
    line-height: 1;
    display: flex; 
    align-items: center;
    justify-content: center;
    height: 2.2em; 
    min-width: 2.2em; 
    background-color: transparent;
    border: none;
    color: var(--wxt-text-color-dim, #ccc); 
    cursor: pointer; 
    user-select: none;
    -webkit-tap-highlight-color: transparent;
  }

  .generate-button:focus {
    outline: none;
  }

  /* Error Message */
  .error-message {
    color: var(--wxt-color-red-500, red);
    text-align: center;
    padding: 0.5em 0;
    margin-bottom: 0.5em;
    font-size: 0.9em;
  }
</style>