<script>
  import { format } from "date-fns";
  import { rates, ownerData } from "store";
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

{#if Object.entries($rates).length > 0 && $ownerData.use_conversion}
  <p class="rate">
    Exchange rate for the {$ownerData.base_currency} / {$ownerData.foreign_currency}
    on the day {format($ownerData.issue_date, 'D.M.yyyy')}:
    <strong>{$rates[$ownerData.foreign_currency].toFixed(4)}</strong>
    <br />
    <small>
      Source:
      <a
        href="https://api.exchangeratesapi.io/{format($ownerData.issue_date, 'yyyy-MM-dd')}?base={$ownerData.base_currency}">
        https://api.exchangeratesapi.io/{format($ownerData.issue_date, 'yyyy-MM-dd')}?base={$ownerData.base_currency}
      </a>
    </small>
  </p>
{/if}
{#if $ownerData.is_vat_free}
  <p>VAT exempt under article 287 of VAT Directive</p>
{/if}
<p class="signature">
  Invoice issued by:
  <br />
  {$ownerData.issuer}
  <br />
  {#if $ownerData.issuer_signature}
    <img src={$ownerData.issuer_signature} alt={$ownerData.issuer} />
  {/if}
  <br />
  <small>
    <em>No company seal is used</em>
  </small>
</p>
