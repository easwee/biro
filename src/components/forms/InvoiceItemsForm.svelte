<script>
  import { fade } from "svelte/transition";
  import { onMount } from "svelte";
  import { BIRO_SCHEME } from "constants";
  import { clientData, invoiceItems } from "store";
  import {
    idbCreate,
    idbAdd,
    idbRemove,
    idbRemoveAll,
    idbRead,
    idbReadAll,
    idbUpdate
  } from "utils";
  import InvoiceItemsFormItem from "./InvoiceItemsFormItem.svelte";
  import InvoiceItemsFormItemPast from "./InvoiceItemsFormItemPast.svelte";

  let typingTimeout = null;

  const blankRow = {
    invoice_row_client_id: 1,
    invoice_row_description: "",
    invoice_row_units: 1,
    invoice_row_unit_format: "",
    invoice_row_unit_price: 0,
    invoice_row_vat: 0,
    invoice_past_total: null
  };

  const blankPastRow = {
    invoice_row_client_id: 1,
    invoice_row_description: "Development",
    invoice_row_units: 1,
    invoice_row_unit_format: "",
    invoice_row_unit_price: 0,
    invoice_row_vat: 0,
    invoice_past_total: 0
  };

  onMount(() => {
    idbCreate("biro_db", BIRO_SCHEME)
      .then(() => idbReadAll("biro_db", "invoice_rows"))
      .then(result => {
        if (result.length > 0) {
          invoiceItems.set(result);
        } else {
          idbAdd("biro_db", "invoice_rows", $invoiceItems[0]);
        }
      });
  });

  function handleInputChange(index, item) {
    window.clearTimeout(typingTimeout);
    $invoiceItems = $invoiceItems;
    typingTimeout = window.setTimeout(function() {
      idbUpdate("biro_db", "invoice_rows", item.id, $invoiceItems[index])
        .then(() => idbReadAll("biro_db", "invoice_rows"))
        .then(result => {
          invoiceItems.set(result);
        });
    }, 500);
  }

  function addInvoiceRow() {
    idbAdd("biro_db", "invoice_rows", blankRow)
      .then(() => idbReadAll("biro_db", "invoice_rows"))
      .then(result => {
        invoiceItems.set(result);
      });
  }

  function createPastInvoice() {
    idbRemoveAll("biro_db", "invoice_rows")
      .then(() => idbAdd("biro_db", "invoice_rows", blankPastRow))
      .then(() => idbReadAll("biro_db", "invoice_rows"))
      .then(result => {
        invoiceItems.set(result);
      });
  }

  function removeInvoiceRow(index) {
    idbRemove("biro_db", "invoice_rows", index)
      .then(() => idbReadAll("biro_db", "invoice_rows"))
      .then(result => {
        invoiceItems.set(result);
      });
  }
</script>

<style>
  form {
    padding: 0;
    margin: 0;
    background: none;
  }
  .no-data {
    color: white;
    font-style: italic;
    text-align: center;
  }
</style>

<form>
  {#each $invoiceItems as item, index}
    {#if item.invoice_past_total === null}
      <InvoiceItemsFormItem
        {index}
        {item}
        {handleInputChange}
        {removeInvoiceRow} />
    {:else}
      <InvoiceItemsFormItemPast
        {index}
        {item}
        {handleInputChange}
        {removeInvoiceRow} />
    {/if}
  {:else}
    <p class="no-data">No rows added yet.</p>
  {/each}
  <div class="actions align-center">
    <span on:click={() => addInvoiceRow()} class="button save">+ Add item</span>
    <span on:click={() => createPastInvoice()} class="button save">
      Create past invoice
    </span>
  </div>
</form>
