<script>
  import { fade } from "svelte/transition";
  import { ownerData, properties } from "store";
  import { formatter } from "utils";
  export let item, handleInputChange, removeInvoiceRow, index;
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
        <label for={`description_${index}`}>Description:</label>
        <input
          id={`description_${index}`}
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
        <label for={`units_${index}`}>Units:</label>
        <input
          id={`units_${index}`}
          type="text"
          min="1"
          bind:value={item.invoice_row_units}
          on:keyup={() => handleInputChange(index, item)}
          on:change={() => handleInputChange(index, item)}
          placeholder="Units" />
      </div>
    </div>
    <div class="g-r-c g-r-c-25">
      <div class="field">
        <label for={`unitFormat_${index}`}>Unit format:</label>
        <input
          id={`unitFormat_${index}`}
          type="text"
          bind:value={item.invoice_row_unit_format}
          on:keyup={() => handleInputChange(index, item)}
          on:change={() => handleInputChange(index, item)}
          placeholder="Unit format" />
      </div>
    </div>
    <div class="g-r-c g-r-c-25">
      <div class="field">
        <label for={`unitPrice_${index}`}>Unit price:</label>
        <input
          id={`unitPrice_${index}`}
          type="text"
          bind:value={item.invoice_row_unit_price}
          on:keyup={() => handleInputChange(index, item)}
          on:change={() => handleInputChange(index, item)}
          placeholder="Unit price" />
      </div>
    </div>
    <div class="g-r-c g-r-c-25">
      <div class="field">
        <label for={`vat_${index}`}>VAT %:</label>
        <input
          id={`vat_${index}`}
          type="text"
          bind:value={item.invoice_row_vat}
          on:keyup={() => handleInputChange(index, item)}
          on:change={() => handleInputChange(index, item)}
          placeholder="VAT" />
      </div>
    </div>
  </div>
  <div class="actions align-right">
    <span on:click={() => removeInvoiceRow(item.id)} class="button remove">
      - Remove #{index + 1}
    </span>
  </div>
</div>
