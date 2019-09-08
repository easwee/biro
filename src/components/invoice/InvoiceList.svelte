<script>
  import { onDestroy } from "svelte";
  import {
    rates,
    invoiceItems,
    properties,
    shownPropertiesCount,
    ownerData
  } from "store";
  import InvoiceItem from "./InvoiceItem.svelte";
  import { formatter, calculateTotalPrice, calculateTotalVAT } from "utils";

  $: total = calculateTotalPrice($invoiceItems);
  $: VAT = calculateTotalVAT($invoiceItems);
  $: totalWithVAT_base_currency = total + VAT;
  $: totalWithVAT_foreign_currency =
    totalWithVAT_base_currency * $rates[$ownerData.foreign_currency];
</script>

<style>
  table.invoice {
    margin-bottom: 30px;
  }

  table.invoice tr.header th {
    border-bottom: 0;
  }

  table.invoice tr.footer-total th,
  table.invoice tr.footer-total td {
    border-top: 0;
    border-bottom: 0;
  }

  table.invoice tr.footer th {
    text-align: right;
  }
</style>

<table class="invoice">
  <tr class="header">
    <th />
    <th>Description</th>
    <th class="align-right no-wrap">Units</th>
    <th class="align-right no-wrap">VAT</th>
    <th class="align-right no-wrap">Price per unit</th>
    <th class="align-right no-wrap">Total</th>
  </tr>

  {#each $invoiceItems as item, index}
    <InvoiceItem {index} {...item} />
  {/each}

  <tr class="footer footer-total">
    <th colspan="5">Total:</th>
    <td class="align-right">
      {formatter($ownerData.base_currency).format(total)}
    </td>
  </tr>
  <tr class="footer">
    <th colspan="5">VAT:</th>
    <td class="align-right">
      {formatter($ownerData.base_currency).format(VAT)}
    </td>
  </tr>
  <tr class="footer">
    <th colspan="5">Total with VAT in {$ownerData.base_currency}:</th>
    <td class="align-right">
      {formatter($ownerData.base_currency).format(totalWithVAT_base_currency)}
    </td>
  </tr>
  {#if $ownerData.use_conversion}
    <tr class="footer">
      <th colspan="5">Total with VAT in {$ownerData.foreign_currency}:</th>
      <td class="align-right">
        {formatter($ownerData.foreign_currency).format(totalWithVAT_foreign_currency)}
      </td>
    </tr>
  {/if}
</table>
