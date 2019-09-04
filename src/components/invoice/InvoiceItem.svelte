<script>
  import { fade } from "svelte/transition";
  import { ownerData, properties } from "store";
  import { formatter } from "utils";
  export let index,
    id,
    invoice_row_client_id,
    invoice_row_description,
    invoice_row_units,
    invoice_row_unit_format,
    invoice_row_unit_price,
    invoice_row_vat;

  $: total = invoice_row_units * invoice_row_unit_price;
  $: totalWithVat = total + (total * invoice_row_vat) / 100;
</script>

<style>
  td {
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
  }
</style>

<tr transition:fade>
  <td>{index + 1}</td>
  <td>{invoice_row_description}</td>
  <td class="align-right no-wrap">
    {invoice_row_units} {invoice_row_unit_format}
  </td>
  <td class="align-right no-wrap">{invoice_row_vat}%</td>
  <td class="align-right no-wrap">
    {formatter($ownerData.base_currency).format(invoice_row_unit_price)}
  </td>
  <td class="align-right no-wrap">
    {formatter($ownerData.base_currency).format(total)}
  </td>
</tr>
