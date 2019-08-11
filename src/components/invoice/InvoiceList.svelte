<script>
  import {
    rates,
    invoiceItems,
    invoiceTotal,
    invoiceVAT,
    invoiceTotalWithVATUSD,
    invoiceTotalWithVATEUR,
    ratesDate,
    properties,
    shownPropertiesCount
  } from "store";
  import InvoiceItem from "./InvoiceItem.svelte";
  import { formatter } from "utils";
  import { INVOICE } from "constants";

  function addRow() {
    invoiceItems.update(items => {
      return [
        ...items,
        {
          description: `Consultancy & development (1.6.2019 - 15.6.2019)`,
          units: 160,
          unitFormat: "hours",
          unitPrice: 100,
          period: "1.6.2019 - 15.6.2019"
        }
      ];
    });
    calculateTotals($invoiceItems);
  }

  function calculateTotals(items) {
    const total = items.reduce((acc, item) => {
      return acc + item.units * item.unitPrice;
    }, 0);

    invoiceTotal.update(value => total);
    invoiceVAT.update(value => (total * INVOICE.VAT) / 100);
    invoiceTotalWithVATUSD.update(value => $invoiceTotal + $invoiceVAT);
    invoiceTotalWithVATEUR.update(
      value => $invoiceTotalWithVATUSD * $rates.EUR
    );
  }

  calculateTotals($invoiceItems);
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

  {#each $invoiceItems as item, index}
    <InvoiceItem {index} {...item} />
  {/each}

  <tr class="footer footer-total">
    <th colspan={$shownPropertiesCount}>Total:</th>
    <td class="align-right">{formatter('USD').format($invoiceTotal)}</td>
  </tr>
  <tr class="footer">
    <th colspan={$shownPropertiesCount}>VAT:</th>
    <td class="align-right">{formatter('USD').format($invoiceVAT)}</td>
  </tr>
  <tr class="footer">
    <th colspan={$shownPropertiesCount}>Total in USD:</th>
    <td class="align-right">
      {formatter('USD').format($invoiceTotalWithVATUSD)}
    </td>
  </tr>
  <tr class="footer">
    <th colspan={$shownPropertiesCount}>Total in EUR:</th>
    <td class="align-right">
      {formatter('EUR').format($invoiceTotalWithVATEUR)}
    </td>
  </tr>
</table>
<button on:click={() => addRow()}>Add one</button>
