<script>
  import { onMount } from "svelte";
  import pillTextInit from "./pill-text/index";
  import datawrapperScrolly from "./datawrapper-scrolly/index";

  const init = async () => {
    pillTextInit();
    await datawrapperScrolly();
  };

  onMount(() => {
    init();
  });
</script>
