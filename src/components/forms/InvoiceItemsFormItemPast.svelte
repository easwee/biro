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
</style>

<div class="invoice-row" transition:fade>
  <div class="g-r">
    <div class="g-r-c g-r-c-100">
      <div class="field">
        <label for={`description_past_${index}`}>Description:</label>
        <input
          id={`description_past_${index}`}
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
        <label for={`units_past_${index}`}>Units:</label>
        <input
          id={`units_past_${index}`}
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
        <label for={`unitsFormat_past_${index}`}>Units format:</label>
        <input
          id={`unitsFormat_past_${index}`}
          type="text"
          bind:value={item.invoice_row_unit_format}
          on:keyup={() => handleInputChange(index, item)}
          on:change={() => handleInputChange(index, item)}
          placeholder="Unit format" />
      </div>
    </div>
    <div class="g-r-c g-r-c-25">
      <div class="field">
        <label for={`unitPrice_past_${index}`}>Unit price:</label>
        <input
          id={`unitPrice_past_${index}`}
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
        <label for={`vat_past_${index}`}>VAT %:</label>
        <input
          id={`vat_past_${index}`}
          type="text"
          bind:value={item.invoice_row_vat}
          on:keyup={() => handleInputChange(index, item)}
          on:change={() => handleInputChange(index, item)}
          placeholder="VAT" />
      </div>
    </div>
  </div>
  <div class="field">
    <label for={`total_past_${index}`}>Total in {$ownerData.base_currency}:</label>
    <input
      id={`total_past_${index}`}
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
