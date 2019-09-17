<script>
  import { fade } from "svelte/transition";
  import { ownerData, properties } from "store";
  import { formatter } from "utils";
  export let item, handleInputChange, removeInvoiceRow, index;

  function calculate() {
    const calculation =
      (item.invoice_past_total + item.invoice_row_vat) /
        item.invoice_row_units || 0;
    item.invoice_row_unit_price = calculation;

    handleInputChange(index, item);

    return calculation;
  }
</script>

<style>
  .invoice-row {
    padding: 5px;
    border-radius: 2px;
    background-color: rgba(255, 255, 255, 0.1);
    margin: 10px 0;
  }
  .invoice-row label {
    font-size: 11px;
    color: white;
    display: block;
    margin-bottom: 3px;
  }
</style>

<div class="invoice-row" transition:fade>
  <div class="g-r">
    <div class="g-r-c g-r-c-100">
      <div class="field">
        <label>Description:</label>
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
    <div class="g-r-c g-r-c-25">
      <div class="field">
        <label>Units:</label>
        <input
          type="number"
          bind:value={item.invoice_row_units}
          min="1"
          on:keyup={() => calculate(index, item)}
          on:change={() => calculate(index, item)}
          placeholder="Units" />
      </div>
    </div>
    <div class="g-r-c g-r-c-25">
      <div class="field">
        <label>Units format:</label>
        <input
          type="text"
          bind:value={item.invoice_row_unit_format}
          on:keyup={() => handleInputChange(index, item)}
          on:change={() => handleInputChange(index, item)}
          placeholder="Unit format" />
      </div>
    </div>
    <div class="g-r-c g-r-c-25">
      <div class="field">
        <label>Unit price:</label>
        <input
          disabled
          type="text"
          bind:value={item.invoice_row_unit_price}
          on:keyup={() => handleInputChange(index, item)}
          on:change={() => handleInputChange(index, item)}
          placeholder="Unit price" />
      </div>
    </div>
    <div class="g-r-c g-r-c-25">
      <div class="field">
        <label>VAT %:</label>
        <input
          type="text"
          bind:value={item.invoice_row_vat}
          on:keyup={() => handleInputChange(index, item)}
          on:change={() => handleInputChange(index, item)}
          placeholder="VAT" />
      </div>
    </div>
  </div>
  <div class="field">
    <label>Total in {$ownerData.base_currency}:</label>
    <input
      type="number"
      min="1"
      bind:value={item.invoice_past_total}
      on:keyup={() => calculate(index, item)}
      on:change={() => calculate(index, item)}
      placeholder="Total" />
  </div>
  <div class="actions align-right">
    <span on:click={() => removeInvoiceRow(item.id)} class="button remove">
      - Remove #{index + 1}
    </span>
  </div>
</div>
