<script>
  import {
    rates,
    invoiceItems,
    ratesDate,
    properties,
    shownPropertiesCount
  } from "store";
  import InvoiceItem from "./InvoiceItem.svelte";
  import { formatter } from "utils";
  import { DATA } from "config";

  const invoiceTotal = $invoiceItems.reduce((acc, item) => {
    return acc + item.units * item.unitPrice;
  }, 0);

  const invoiceVAT = (invoiceTotal * DATA.VAT) / 100;
  const invoiceTotalWithVATUSD = invoiceTotal + invoiceVAT;
  const invoiceTotalWithVATEUR = invoiceTotalWithVATUSD * $rates.EUR;
</script>

<table class="invoice">
  <tr class="header">
    <th />
    {#each Object.values($properties) as property, index}
      {#if property.show}
        <th class={property.alignRight ? 'align-right' : ''}>
          {property.name}
        </th>
      {/if}
    {/each}
  </tr>

  {#each $invoiceItems as item, index}
    <InvoiceItem {index} {...item} />
  {/each}

  <tr class="footer footer-total">
    <th colspan={$shownPropertiesCount}>Total:</th>
    <td class="align-right">{formatter('USD').format(invoiceTotal)}</td>
  </tr>
  <tr class="footer">
    <th colspan={$shownPropertiesCount}>VAT:</th>
    <td class="align-right">{formatter('USD').format(invoiceVAT)}</td>
  </tr>
  <tr class="footer">
    <th colspan={$shownPropertiesCount}>Total in USD:</th>
    <td class="align-right">
      {formatter('USD').format(invoiceTotalWithVATUSD)}
    </td>
  </tr>
  <tr class="footer">
    <th colspan={$shownPropertiesCount}>Total in EUR:</th>
    <td class="align-right">
      {formatter('EUR').format(invoiceTotalWithVATEUR)}
    </td>
  </tr>
</table>
