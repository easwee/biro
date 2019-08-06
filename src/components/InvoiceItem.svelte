<script>
  import { formatterUSD } from "../utils";
  export let index, description, units, unitFormat, unitPrice;
</script>

<tr>
  <td>{index + 1}</td>
  <td>{description}</td>
  <td class="align-right">{units} {unitFormat}</td>
  <td class="align-right">{formatterUSD.format(unitPrice)}</td>
  <td class="align-right">
    {formatterUSD.format(units * unitPrice)}
  </td>
</tr>
