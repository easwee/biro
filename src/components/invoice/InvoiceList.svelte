<script>
  import { onDestroy } from "svelte";
  import {
    rates,
    ratesDate,
    invoiceItems,
    properties,
    shownPropertiesCount,
    ownerData
  } from "store";
  import InvoiceItem from "./InvoiceItem.svelte";
  import { formatter, calculateTotalPrice } from "utils";

  $: total = calculateTotalPrice($invoiceItems);
  $: VAT = (total * $ownerData.vat) / 100;
  $: totalWithVATUSD = total + VAT;
  $: totalWithVATEUR = totalWithVATUSD * $rates.EUR;
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
    {#each Object.values($properties) as property, index}
      {#if property.show}
        <th
          class={`${property.alignRight ? 'align-right' : ''} ${property.alignRight ? 'no-wrap' : ''}`}>
          {property.name}
        </th>
      {/if}
    {/each}
  </tr>

  {#each $invoiceItems as item, index (item.id)}
    <InvoiceItem {index} {...item} />
  {/each}

  <tr class="footer footer-total">
    <th colspan={$shownPropertiesCount}>Total:</th>
    <td class="align-right">{formatter('USD').format(total)}</td>
  </tr>
  <tr class="footer">
    <th colspan={$shownPropertiesCount}>VAT:</th>
    <td class="align-right">{formatter('USD').format(VAT)}</td>
  </tr>
  <tr class="footer">
    <th colspan={$shownPropertiesCount}>Total in USD:</th>
    <td class="align-right">{formatter('USD').format(totalWithVATUSD)}</td>
  </tr>
  <tr class="footer">
    <th colspan={$shownPropertiesCount}>Total in EUR:</th>
    <td class="align-right">{formatter('EUR').format(totalWithVATEUR)}</td>
  </tr>
</table>
