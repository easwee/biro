<script>
  import { format } from "date-fns";
  import { DATA } from "../../config";
  import { rates, ratesDate } from "../../store";
  import { formatter } from "../../utils";
</script>

<p>
  Exchange rate for the USD / EUR on the day {format($ratesDate, 'D.M.YYYY')}:
  <strong>{formatter('EUR', 4).format($rates.EUR)}</strong>
</p>
<p>
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
  {DATA.INVOICE_ISSUER}
  <br />
  <img src={DATA.INVOICE_ISSUER_SIGNATURE} alt={DATA.INVOICE_ISSUER} />
  <br />
  <small>
    <em>No company seal is used</em>
  </small>
</p>
