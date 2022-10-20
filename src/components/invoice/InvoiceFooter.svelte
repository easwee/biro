<script>
  import { format } from "date-fns";
  import { rates, ownerData } from "store";
</script>

<style>
  .signature {
    float: right;
    text-align: center;
  }
  .signature img {
    max-width: 80px;
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
    on the day {format(new Date($ownerData.issue_date), 'd.M.yyyy')}:
    <strong>{$rates[$ownerData.foreign_currency].toFixed(4)}</strong>
    <br />
    <small>
      Source:
      <a
        href="https://freecurrencyapi.net">
        https://freecurrencyapi.net
      </a>
    </small>
  </p>
{/if}
{#if $ownerData.is_vat_free}
  <p>Reverse Charge-VAT exempt under Articel 44 Directive 2006/112/ES.</p>
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
