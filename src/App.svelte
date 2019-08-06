<script>
  import { onMount } from "svelte";
  import { format, addDays } from "date-fns";
  import { fetchRates } from "./api";
  import { DATA } from "./config";
  import { rates, ratesDate } from "./store";
  import InvoiceIssuer from "./components/InvoiceIssuer.svelte";
  import InvoiceReceiver from "./components/InvoiceReceiver.svelte";
  import InvoiceMeta from "./components/InvoiceMeta.svelte";
  import InvoiceList from "./components/InvoiceList.svelte";
  import InvoiceFooter from "./components/InvoiceFooter.svelte";

  onMount(async () => {
    const response = await fetchRates(
      format($ratesDate, "YYYY-MM-DD"),
      DATA.BASE_CURRENCY
    );
    $rates = response.data.rates;
  });
</script>

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
