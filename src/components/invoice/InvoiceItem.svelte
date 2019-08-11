<script>
  import { properties } from "store";
  import { formatter } from "utils";
  export let index, period, description, units, unitFormat, unitPrice;
</script>

<tr>
  <td>{index + 1}</td>
  {#if $properties.description.show}
    <td>{description}</td>
  {/if}
  {#if $properties.units.show}
    <td class="align-right no-wrap">{units} {unitFormat}</td>
  {/if}
  {#if $properties.period.show}
    <td class="align-right no-wrap">{period}</td>
  {/if}
  {#if $properties.pricePerUnit.show}
    <td class="align-right no-wrap">{formatter('USD').format(unitPrice)}</td>
  {/if}
  {#if $properties.total.show}
    <td class="align-right no-wrap">
      {formatter('USD').format(units * unitPrice)}
    </td>
  {/if}
</tr>
