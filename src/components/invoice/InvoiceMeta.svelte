<script>
  import { format, addDays } from "date-fns";
  import { INVOICE } from "constants";
  import { ratesDate } from "store";
</script>

<table class="invoice-meta">
  <tr>
    <th>INVOICE No.</th>
    <th>{format($ratesDate, 'YYYY-MM')}</th>
  </tr>
  <tr>
    <td>Date:</td>
    <td>{INVOICE.ISSUE_CITY}, {format($ratesDate, 'D.M.YYYY')}</td>
  </tr>
  <tr>
    <td>Terms:</td>
    <td>{INVOICE.TERMS} days</td>
  </tr>
  <tr>
    <td>Due date:</td>
    <td>{format(addDays($ratesDate, INVOICE.TERMS), 'D.M.YYYY')}</td>
  </tr>
  <tr>
    <td>Bank account:</td>
    <td>{INVOICE.BANK_ACCOUNT_NUMBER}</td>
  </tr>
</table>
