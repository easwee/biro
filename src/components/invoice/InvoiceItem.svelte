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
    <td class="align-right">{units} {unitFormat}</td>
  {/if}
  {#if $properties.period.show}
    <td class="align-right">{period}</td>
  {/if}
  {#if $properties.pricePerUnit.show}
    <td class="align-right">{formatter('USD').format(unitPrice)}</td>
  {/if}
  {#if $properties.total.show}
    <td class="align-right">{formatter('USD').format(units * unitPrice)}</td>
  {/if}
</tr>
