<script>
  import { onMount } from "svelte";
  import { BIRO_SCHEME } from "constants";
  import { clientData, invoiceItems } from "store";
  import {
    idbCreate,
    idbAdd,
    idbRemove,
    idbRead,
    idbReadAll,
    idbUpdate
  } from "utils";

  let typeTimeout = null;
  const blankRow = {
    invoice_row_client_id: 1,
    invoice_row_description: "",
    invoice_row_units: "",
    invoice_row_unit_format: "",
    invoice_row_unit_price: "",
    invoice_row_period: ""
  };

  onMount(() => {
    idbCreate("biro_db", BIRO_SCHEME)
      .then(() => idbReadAll("biro_db", "invoice_rows"))
      .then(result => {
        if (result.length > 0) {
          invoiceItems.set(result);
        }
      });
  });

  function handleSubmit(index, rowIndex) {
    console.log("saving...");
    idbUpdate("biro_db", "invoice_rows", rowIndex, $invoiceItems[index])
      .then(() => idbReadAll("biro_db", "invoice_rows"))
      .then(result => {
        invoiceItems.set(result);
        console.log("saved.");
        console.log("hhh", $invoiceItems);
      });
  }

  function addInvoiceRow() {
    idbAdd("biro_db", "invoice_rows", blankRow)
      .then(() => idbReadAll("biro_db", "invoice_rows"))
      .then(result => {
        invoiceItems.set(result);
        console.log("hhh", $invoiceItems);
      });
  }

  function removeInvoiceRow(index) {
    console.log(index);
    idbRemove("biro_db", "invoice_rows", index)
      .then(() => idbReadAll("biro_db", "invoice_rows"))
      .then(result => {
        invoiceItems.set(result);
        console.log("hhh", $invoiceItems);
      });
  }

  function handleKeyUp(newInvoiceStore) {
    $invoiceItems = $invoiceItems;
  }
</script>

<style>
  .invoice-row {
    margin-bottom: 5px;
  }
</style>

<form>
  {#each $invoiceItems as item, index}
    <div class="invoice-row">
      <div class="field">
        <input
          type="text"
          bind:value={item.invoice_row_description}
          on:keyup={() => {
            window.clearTimeout(typeTimeout);
            $invoiceItems = $invoiceItems;
            typeTimeout = window.setTimeout(function() {
              handleSubmit(index, item.id);
            }, 500);
          }}
          placeholder="Description" />
      </div>
      <div class="field">
        <input
          type="text"
          bind:value={item.invoice_row_units}
          on:keyup={() => {
            window.clearTimeout(typeTimeout);
            $invoiceItems = $invoiceItems;
            typeTimeout = window.setTimeout(function() {
              handleSubmit(index, item.id);
            }, 500);
          }}
          placeholder="Units" />
      </div>
      <div class="field">
        <input
          type="text"
          bind:value={item.invoice_row_unit_format}
          on:keyup={() => {
            window.clearTimeout(typeTimeout);
            $invoiceItems = $invoiceItems;
            typeTimeout = window.setTimeout(function() {
              handleSubmit(index, item.id);
            }, 500);
          }}
          placeholder="Unit format" />
      </div>
      <div class="field">
        <input
          type="text"
          bind:value={item.invoice_row_unit_price}
          on:keyup={() => {
            window.clearTimeout(typeTimeout);
            $invoiceItems = $invoiceItems;
            typeTimeout = window.setTimeout(function() {
              handleSubmit(index, item.id);
            }, 500);
          }}
          placeholder="Unit price" />
      </div>
      <div class="field">
        <input
          type="text"
          bind:value={item.invoice_row_period}
          on:keyup={() => {
            window.clearTimeout(typeTimeout);
            $invoiceItems = $invoiceItems;
            typeTimeout = window.setTimeout(function() {
              handleSubmit(index, item.id);
            }, 500);
          }}
          placeholder="Period" />
      </div>
      <div class="actions align-right">
        <span on:click={() => removeInvoiceRow(item.id)} class="button remove">
          - Remove
        </span>
      </div>
    </div>
  {/each}
  <span on:click={() => addInvoiceRow()} class="button save">+ Add item</span>
  <!-- <button type="submit">Submit</button> on:submit|preventDefault={handleSubmit} -->
</form>
