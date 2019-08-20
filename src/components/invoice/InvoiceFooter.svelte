<script>
  import { format } from "date-fns";
  import { rates, ratesDate, ownerData } from "store";
  import { formatter } from "utils";
</script>

<style>
  .signature {
    float: right;
    text-align: center;
  }
  .rate {
    margin-bottom: 0;
  }
  .rate a {
    color: black;
  }
</style>

<p class="rate">
  Exchange rate for the USD / EUR on the day {format($ratesDate, 'D.M.YYYY')}:
  <strong>{$rates.EUR.toFixed(4)}</strong>
  <br />
  <small>
    Source:
    <a
      href="https://api.exchangeratesapi.io/{format($ratesDate, 'YYYY-MM-DD')}?base=USD">
      https://api.exchangeratesapi.io/{format($ratesDate, 'YYYY-MM-DD')}?base=USD
    </a>
  </small>
</p>

<p>VAT exempt under article 287 of VAT Directive</p>
<p class="signature">
  Invoice issued by:
  <br />
  {$ownerData.issuer}
  <br />
  <img src={$ownerData.issuer_signature} alt={$ownerData.issuer} />
  <br />
  <small>
    <em>No company seal is used</em>
  </small>
</p>
