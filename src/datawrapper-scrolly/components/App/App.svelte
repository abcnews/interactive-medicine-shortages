<script lang="ts">
  import Scrollyteller from "@abcnews/svelte-scrollyteller";
  import type { PanelDefinition, PanelData } from "../../index";
  import { untrack } from "svelte";
  import DatawrapperIframe from "../DatawrapperIframe/DatawrapperIframe.svelte";

  interface Props {
    panels: PanelDefinition<PanelData>[];
    mobileVariant?: "blocks" | "rows";
  }

  let { panels, mobileVariant = "rows" }: Props = $props();
  let data = $state(untrack(() => panels[0]?.data as PanelData));
  let innerHeight = $state(window.innerHeight);
  const framesToRender = $derived.by(() => {
    const chartIds = [
      ...new Set(panels.map((p) => p.data.datawrapperId).filter(Boolean)),
    ];
    const currentChartId = data.datawrapperId;
    const activeIndex = chartIds.indexOf(currentChartId);

    return chartIds
      .map((chartId, index) => {
        return {
          chartId,
          index,
          isCurrent: index === activeIndex,
          isVisible: index <= activeIndex,
        };
      })
      .filter((frame) => {
        // Only render the current, two previous, and two next frames.
        // This keeps the DOM small and ensures the load queue is manageable.
        return Math.abs(frame.index - activeIndex) <= 1;
      });
  });
</script>

<svelte:window bind:innerHeight />

<Scrollyteller
  {panels}
  onMarker={(newData) => {
    data = newData;
  }}
  layout={{
    align: "left",
    mobileVariant: innerHeight < 667 ? "blocks" : mobileVariant,
    // resizeInteractive: true
    // transparentFloat: true
  }}
>
  <div class="charts">
    {#each framesToRender as frame (frame.chartId)}
      <div class="chart">
        {#key frame.chartId}
          <DatawrapperIframe
            src="https://datawrapper.dwcdn.net/{frame.chartId}/?dark=false"
            current={frame.isCurrent}
            visible={frame.isVisible}
          />
        {/key}
      </div>
    {/each}
  </div>
</Scrollyteller>

<style lang="scss">
  .chart {
    width: 100%;
    height: 100%;
  }

  :global {
    /*
      Fix for small height mobile chart cutting
      off text.
    */
    .scrollyteller-wrapper .scrollyteller {
      @media screen and (max-height: 889px) {
        margin-bottom: 100px !important;
      }
      @media screen and (max-height: 778px) {
        margin-bottom: 170px !important;
      }
      @media screen and (max-height: 667px) {
        margin-bottom: 250px !important;
      }
      @media screen and (max-height: 600px) {
        margin-bottom: 270px !important;
      }
      @media screen and (max-height: 550px) {
        margin-bottom: 300px !important;
      }

      .viz.viz--resized {
        @media screen and (max-height: 667px) {
          top: 10px;
        }
      }
    }
  }
</style>
