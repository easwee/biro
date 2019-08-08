<script>
  import { onMount } from "svelte";
  import { format, addDays } from "date-fns";
  import { fetchRates } from "./api";
  import { DATA } from "./config";
  import { rates, ratesDate, isSidebarOpened } from "./store";
  import Sidebar from "./components/sidebar/Sidebar.svelte";
  import InvoiceIssuer from "./components/invoice/InvoiceIssuer.svelte";
  import InvoiceReceiver from "./components/invoice/InvoiceReceiver.svelte";
  import InvoiceMeta from "./components/invoice/InvoiceMeta.svelte";
  import InvoiceList from "./components/invoice/InvoiceList.svelte";
  import InvoiceFooter from "./components/invoice/InvoiceFooter.svelte";

  onMount(async () => {
    const response = await fetchRates(
      format($ratesDate, "YYYY-MM-DD"),
      DATA.BASE_CURRENCY
    );
    $rates = response.data.rates;
  });

  function setSidebarOpened() {
    isSidebarOpened.update(state => {
      return !state;
    });
  }
</script>

<style>
  .openSidebar {
    position: absolute;
  }

  .hamburger {
    fill: #818181;
  }

  .hamburger :hover {
    fill: #737070;
  }
</style>

<a href="javascript:void(0)" class="openSidebar" on:click={setSidebarOpened}>
  <svg class="hamburger" height="32px" viewBox="0 0 32 32" width="32px">
    <path
      d="M4,10h24c1.104,0,2-0.896,2-2s-0.896-2-2-2H4C2.896,6,2,6.896,2,8S2.896,10,4,10z
      M28,14H4c-1.104,0-2,0.896-2,2
      s0.896,2,2,2h24c1.104,0,2-0.896,2-2S29.104,14,28,14z
      M28,22H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h24c1.104,0,2-0.896,2-2
      S29.104,22,28,22z" />
  </svg>
</a>
<div class="container">
  <div class="sheet">
    {#if $rates.EUR}
      <InvoiceIssuer />
      <InvoiceReceiver />
      <InvoiceMeta />
      <InvoiceList />
      <InvoiceFooter />
    {:else}
      <p>Loading...</p>
    {/if}
  </div>
</div>
<Sidebar />
