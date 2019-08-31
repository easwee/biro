<script>
  import { fade } from "svelte/transition";
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

  let typingTimeout = null;

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
  .invoice-row {
    padding: 5px;
    border-radius: 2px;
    background-color: rgba(255, 255, 255, 0.1);
    margin: 10px 0;
  }
  .no-data {
    color: white;
    font-style: italic;
    text-align: center;
  }
</style>

<form>
  {#each $invoiceItems as item, index}
    <div class="invoice-row" transition:fade>
      <div class="g-r">
        <div class="g-r-c g-r-c-100">
          <div class="field">
            <input
              type="text"
              bind:value={item.invoice_row_description}
              on:keyup={() => handleInputChange(index, item)}
              on:change={() => handleInputChange(index, item)}
              placeholder="Description" />
          </div>
        </div>
      </div>
      <div class="g-r">
        <div class="g-r-c g-r-c-33">
          <div class="field">
            <input
              type="text"
              bind:value={item.invoice_row_units}
              on:keyup={() => handleInputChange(index, item)}
              on:change={() => handleInputChange(index, item)}
              placeholder="Units" />
          </div>
        </div>
        <div class="g-r-c g-r-c-33">
          <div class="field">
            <input
              type="text"
              bind:value={item.invoice_row_unit_format}
              on:keyup={() => handleInputChange(index, item)}
              on:change={() => handleInputChange(index, item)}
              placeholder="Unit format" />
          </div>
        </div>
        <div class="g-r-c g-r-c-33">
          <div class="field">
            <input
              type="text"
              bind:value={item.invoice_row_unit_price}
              on:keyup={() => handleInputChange(index, item)}
              on:change={() => handleInputChange(index, item)}
              placeholder="Unit price" />
          </div>
        </div>
      </div>
      <div class="actions align-right">
        <span on:click={() => removeInvoiceRow(item.id)} class="button remove">
          - Remove #{index + 1}
        </span>
      </div>
    </div>
  {:else}
    <p class="no-data">No rows added yet.</p>
  {/each}
  <div class="actions align-center">
    <span on:click={() => addInvoiceRow()} class="button save">+ Add item</span>
  </div>
</form>
