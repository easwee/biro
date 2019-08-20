<script>
  import { onMount } from "svelte";
  import { format, addDays } from "date-fns";
  import { fetchRates } from "./api";
  import { BIRO_SCHEME } from "constants";
  import { rates, ratesDate, ownerData } from "store";

  import InvoiceIssuer from "components/invoice/InvoiceIssuer.svelte";
  import InvoiceReceiver from "components/invoice/InvoiceReceiver.svelte";
  import InvoiceMeta from "components/invoice/InvoiceMeta.svelte";
  import InvoiceList from "components/invoice/InvoiceList.svelte";
  import InvoiceFooter from "components/invoice/InvoiceFooter.svelte";
  import Editor from "components/editor/Editor.svelte";

  onMount(async () => {
    const response = await fetchRates(
      format($ratesDate, "YYYY-MM-DD"),
      $ownerData.base_currency
    );
    rates.set(response.data.rates);
  });
</script>

<div class="app">
  {#if $rates.EUR}
    <div class="controls">
      <Editor />
    </div>
    <div class="preview">
      <div id="invoice" class="a4-paper">
        <InvoiceIssuer />
        <InvoiceReceiver />
        <InvoiceMeta />
        <InvoiceList />
        <InvoiceFooter />
      </div>
    </div>
  {:else}
    <p>Loading...</p>
  {/if}
</div>
