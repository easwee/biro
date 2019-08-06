<script>
  import { formatter } from "../utils";
  export let index, description, units, unitFormat, unitPrice;
</script>

<tr>
  <td>{index + 1}</td>
  <td>{description}</td>
  <td class="align-right">{units} {unitFormat}</td>
  <td class="align-right">{formatter('USD').format(unitPrice)}</td>
  <td class="align-right">{formatter('USD').format(units * unitPrice)}</td>
</tr>
