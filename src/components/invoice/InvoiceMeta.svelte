<script>
  import { format, addDays } from "date-fns";
  import { ownerData } from "store";
</script>

<style>
  table.invoice-meta {
    float: right;
    background: #f2f2f2;
    font-size: 12px;
    margin-bottom: 30px;
  }

  table.invoice-meta th,
  table.invoice-meta td {
    padding: 3px 10px;
  }

  table.invoice-meta {
    width: 50%;
    margin-bottom: 30px;
  }
</style>

<table class="invoice-meta">
  <tr>
    <th>INVOICE No.</th>
    <th>{$ownerData.invoice_number}</th>
  </tr>
  <tr>
    <td>Date:</td>
    <td>
      {$ownerData.issue_city}, {format($ownerData.issue_date, 'D.M.YYYY')}
    </td>
  </tr>
  <tr>
    <td>Terms:</td>
    <td>{$ownerData.terms} days</td>
  </tr>
  <tr>
    <td>Due date:</td>
    <td>
      {format(addDays($ownerData.issue_date, $ownerData.terms), 'D.M.YYYY')}
    </td>
  </tr>
  <tr>
    <td>Bank account:</td>
    <td>{$ownerData.bank_account_number}</td>
  </tr>
</table>
