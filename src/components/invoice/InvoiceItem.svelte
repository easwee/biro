<script>
  import { properties } from "store";
  import { formatter } from "utils";
  export let index,
    id,
    invoice_row_client_id,
    invoice_row_description,
    invoice_row_units,
    invoice_row_unit_format,
    invoice_row_unit_price,
    invoice_row_period;

  console.log(
    "LOG",
    invoice_row_description,
    invoice_row_units,
    invoice_row_unit_format,
    invoice_row_unit_price,
    invoice_row_period
  );
</script>

<style>
  td {
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
  }
</style>

<tr>
  <td>{index + 1}</td>
  {#if $properties.description.show}
    <td>{invoice_row_description}</td>
  {/if}
  {#if $properties.units.show}
    <td class="align-right no-wrap">
      {invoice_row_units} {invoice_row_unit_format}
    </td>
  {/if}
  <!-- {#if $properties.period.show}
    <td class="align-right no-wrap">{period}</td>
  {/if} -->
  {#if $properties.pricePerUnit.show}
    <td class="align-right no-wrap">
      {formatter('USD').format(invoice_row_unit_price)}
    </td>
  {/if}
  {#if $properties.total.show}
    <td class="align-right no-wrap">
      {formatter('USD').format(invoice_row_units * invoice_row_unit_price)}
    </td>
  {/if}
</tr>
