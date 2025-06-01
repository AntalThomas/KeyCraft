<script lang="ts">
    let maxNumber: number = 4
    let randomPassword: string = "";
    
    const randomise = () => {
        let newCharacters: string[] = [];
        
        for(let i = 0; i < maxNumber; i++) {
            let randomNumber: number = Math.floor(Math.random() * 10);
            newCharacters.push(randomNumber.toString());
        }
        
        randomPassword = newCharacters.join("");
        console.log("Generated Password: ", randomPassword);
    }
</script>

<div>
    <label for="passwordLength">Password Length</label>
    <div class="lengthInput" style="display: flex; align-items: center; padding-bottom: 1em; gap: 1em;">
        <input
            type="number"
            bind:value={maxNumber}
            min="1"
            max="24"
        />
        <input
            type="range"
            bind:value={maxNumber}
            min="1"
            max="24"
        />
    </div>
</div>

<div class="optionsSelection">
    <div class="option">
        <input type="checkbox" id="includeUppercase" checked/>
        <label for="includeUppercase">Include Uppercase Letters</label>
    </div>

    <div class="option">
        <input type="checkbox" id="includeLowercase" checked/>
        <label for="includeLowercase">Include Lowercase Letters</label>
    </div>

    <div class="option">
        <input type="checkbox" id="includeNumbers" checked/>
        <label for="includeNumbers">Include Numbers</label>
    </div>

    <div class="option">
        <input type="checkbox" id="includeSymbols" checked/>
        <label for="includeSymbols">Include Symbols</label>
    </div>
</div>

<button on:click={randomise}>
    Generate
</button>

<div class="generatedPassword">
    <input
        type="string"
        value="{randomPassword}"
        style="width: 100%; height: 2em; font-size: 1.2em;"
    />
    <button class="copy-button" on:click={() => {
            navigator.clipboard.writeText(randomPassword);
        }}
    />
</div>

<style>
    .copy-button {
        height: 2.5em;
        background-image: url('../assets/copy-icon.svg');
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
        /* gap: 0.5em; */
        text-align: left;
        margin-top: 1em;
    }
</style>