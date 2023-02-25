<script>
  import { onMount } from "svelte";
  import { fetchRates } from "api";
  import { BIRO_SCHEME } from "constants";
  import { rates, ownerData, clientData } from "store";
  import { idbCreate, idbRead, idbAdd } from "utils";

  import InvoiceIssuer from "components/invoice/InvoiceIssuer.svelte";
  import InvoiceReceiver from "components/invoice/InvoiceReceiver.svelte";
  import InvoiceMeta from "components/invoice/InvoiceMeta.svelte";
  import InvoiceList from "components/invoice/InvoiceList.svelte";
  import InvoiceFooter from "components/invoice/InvoiceFooter.svelte";
  import Editor from "components/editor/Editor.svelte";

  onMount(async () => {
    idbCreate("biro_db", BIRO_SCHEME)
      .then(() => idbRead("biro_db", "owner", 1))
      .then(async result => {
        if (result) {
          ownerData.set(result);
        } else {
          idbAdd("biro_db", "owner", $ownerData);
        }
        // if ($ownerData.use_conversion && $ownerData.base_currency && $ownerData.foreign_currency) {
        //   try {
        //     const response = await fetchRates(
        //       $ownerData.issue_date,
        //       $ownerData.base_currency,
        //       $ownerData.foreign_currency
        //     );
        //     const data = response.data.data;

        //     rates.set(data[$ownerData.issue_date]);
        //   } catch (error) {
        //     ownerData.set({
        //       ...$ownerData,
        //       use_conversion: false
        //     });
        //   }
        // }
      }).catch(error => {
        console.error(error);
      });

    idbCreate("biro_db", BIRO_SCHEME)
      .then(() => idbRead("biro_db", "clients", 1))
      .then(result => {
        if (result) {
          clientData.set(result);
        } else {
          idbAdd("biro_db", "clients", $clientData);
        }
      });
  });
</script>

<div class="app">
  {#if Object.entries($rates).length > 0 || !$ownerData.use_conversion}
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
    <div class="loader">Loading...</div>
  {/if}
</div>
