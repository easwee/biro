<script>
  import { format, addDays } from "date-fns";
  import { DATA } from "../config";
  import { ratesDate } from "../store";
</script>

<table class="invoice-meta">
  <tr>
    <th>INVOICE No.</th>
    <th>{format($ratesDate, 'YYYY-MM')}</th>
  </tr>
  <tr>
    <td>Date:</td>
    <td>{DATA.INVOICE_ISSUE_CITY}, {format($ratesDate, 'D.M.YYYY')}</td>
  </tr>
  <tr>
    <td>Terms:</td>
    <td>{DATA.TERMS} days</td>
  </tr>
  <tr>
    <td>Due date:</td>
    <td>{format(addDays($ratesDate, DATA.TERMS), 'D.M.YYYY')}</td>
  </tr>
  <tr>
    <td>Bank account:</td>
    <td>{DATA.BANK_ACCOUNT_NUMBER}</td>
  </tr>
</table>
