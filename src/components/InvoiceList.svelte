<script>
  import { rates, invoiceItems, ratesDate } from "../store";
  import InvoiceItem from "./InvoiceItem.svelte";
  import { formatterUSD, formatterEUR } from "../utils";
  import { DATA } from "../config";

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
    <th>Description</th>
    <th class="align-right">Units</th>
    <th class="align-right">Price per unit</th>
    <th class="align-right">Total</th>
  </tr>

  {#each $invoiceItems as item, index}
    <InvoiceItem {index} {...item} />
  {/each}

  <tr class="footer footer-total">
    <th colspan="4">Total:</th>
    <td class="align-right">{formatterUSD.format(invoiceTotal)}</td>
  </tr>
  <tr class="footer">
    <th colspan="4">VAT:</th>
    <td class="align-right">{formatterUSD.format(invoiceVAT)}</td>
  </tr>
  <tr class="footer">
    <th colspan="4">Total in USD:</th>
    <td class="align-right">{formatterUSD.format(invoiceTotalWithVATUSD)}</td>
  </tr>
  <tr class="footer">
    <th colspan="4">Total in EUR:</th>
    <td class="align-right">{formatterEUR.format(invoiceTotalWithVATEUR)}</td>
  </tr>
</table>
