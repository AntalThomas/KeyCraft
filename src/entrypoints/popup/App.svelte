<script lang="ts">
  import Randomise from "../../lib/Randomise.svelte";
</script>

<main>
  <img src="/wxt.svg" alt="KeyCraft Logo" class="logo-image" />
  <h2>KeyCraft</h2>

  <div class="card">
    <Randomise />
  </div>
</main>

<style>
  main {
    width: 300px;
  }

  .logo-image {
    display: block;
    margin: 0 auto 1em auto;
    width: 80px;
    height: 80px;
    animation: bounce 1.8s infinite ease-in-out;
  }

  @keyframes bounce {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
  }
</style>
