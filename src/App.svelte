<script>
  import { onMount } from "svelte";
  import { format, addDays } from "date-fns";
  import { fetchRates } from "./api";
  import { CONFIG } from "./config";
  import { formatter } from "./utils";

  let rates = {};
  let ratesDate = new Date(CONFIG.INVOICE_ISSUE_DATE);

  let rowTotal = 0;
  let invoiceTotal = 0; // extend if we add more rows
  let invoiceVAT = 0;
  let invoiceTotalWithVATUSD = 0;
  let invoiceTotalWithVATEUR = 0;

  onMount(async () => {
    const response = await fetchRates(
      format(ratesDate, "YYYY-MM-DD"),
      CONFIG.BASE_CURRENCY
    );
    rates = response.data.rates;
    rowTotal = CONFIG.MONTHLY_HOURS * CONFIG.HOURLY_RATE;
    invoiceTotal = rowTotal; // extend if we add more rows
    invoiceVAT = (invoiceTotal * CONFIG.VAT) / 100;
    invoiceTotalWithVATUSD = invoiceTotal + invoiceVAT;
    invoiceTotalWithVATEUR = invoiceTotalWithVATUSD * rates.EUR;
  });
</script>

<style>

</style>

<div class="sheet">
  <address>
    {CONFIG.INVOICE_COMPANY_NAME}
    <br />
    {CONFIG.INVOICE_COMPANY_ADDRESS}
    <br />
    {CONFIG.INVOICE_COMPANY_POSTAL_NUMBER} {CONFIG.INVOICE_COMPANY_CITY},
    <br />
    Tax reg. no.: {CONFIG.INVOICE_COMPANY_TAX_REGISTRATION_NUMBER}
    <br />
    Business reg. no.: {CONFIG.INVOICE_COMPANY_BUSINESS_REGISTRATION_NUMBER}
  </address>
  <address>
    Povio Inc.
    <br />
    "16 Merced Avenue
    <br />
    94127 California"
    <br />
    San Francisco, CA 94127
    <br />
    USA
  </address>

  <table class="invoice-meta">
    <tr>
      <th>INVOICE No.</th>
      <th>{format(ratesDate, 'YYYY-MM')}</th>
    </tr>
    <tr>
      <td>Date:</td>
      <td>{CONFIG.INVOICE_ISSUE_CITY}, {format(ratesDate, 'D.M.YYYY')}</td>
    </tr>
    <tr>
      <td>Terms:</td>
      <td>{CONFIG.TERMS} days</td>
    </tr>
    <tr>
      <td>Due date:</td>
      <td>{format(addDays(ratesDate, CONFIG.TERMS), 'D.M.YYYY')}</td>
    </tr>
    <tr>
      <td>Bank account:</td>
      <td>{CONFIG.BANK_ACCOUNT_NUMBER}</td>
    </tr>
  </table>

  {#if rates}
    <table class="invoice">
      <tr class="header">
        <th />
        <th>Description</th>
        <th class="align-right">Hours</th>
        <th class="align-right">Period</th>
        <th class="align-right">Hourly rate</th>
        <th class="align-right">Total</th>
      </tr>

      <tr>
        <td>1</td>
        <td>Consultancy & Frontend development</td>
        <td class="align-right">{CONFIG.MONTHLY_HOURS}</td>
        <td class="align-right">{CONFIG.PERIOD}</td>
        <td class="align-right">
          {formatter('USD').format(CONFIG.HOURLY_RATE)}
        </td>
        <td class="align-right">{formatter('USD').format(rowTotal)}</td>
      </tr>

      <tr class="footer footer-total">
        <th colspan="5">Total:</th>
        <td class="align-right">{formatter('USD').format(invoiceTotal)}</td>
      </tr>
      <tr class="footer">
        <th colspan="5">VAT:</th>
        <td class="align-right">{formatter('EUR').format(invoiceVAT)}</td>
      </tr>
      <tr class="footer">
        <th colspan="5">Total in USD:</th>
        <td class="align-right">
          {formatter('USD').format(invoiceTotalWithVATUSD)}
        </td>
      </tr>
      <tr class="footer">
        <th colspan="5">Total in EUR:</th>
        <td class="align-right">
          {formatter('EUR').format(invoiceTotalWithVATEUR)}
        </td>
      </tr>
    </table>

    <p>
      Exchange rate for the USD / EUR on the day {format(ratesDate, 'D.M.YYYY')}:
      <strong>{formatter('EUR', 4).format(rates.EUR)}</strong>
    </p>
    <p>
      <small>
        Source:
        <a
          href="https://api.exchangeratesapi.io/{format(ratesDate, 'YYYY-MM-DD')}?base=USD">
          https://api.exchangeratesapi.io/{format(ratesDate, 'YYYY-MM-DD')}?base=USD
        </a>
      </small>
    </p>
    <p>VAT exempt under article 287 of VAT Directive</p>
    <p class="signature">
      Invoice issued by:
      <br />
      {CONFIG.INVOICE_ISSUER}
      <br />
      <img src={CONFIG.INVOICE_ISSUER_SIGNATURE} alt={CONFIG.INVOICE_ISSUER} />
      <br />
      <small>
        <em>No company seal is used</em>
      </small>
    </p>
  {:else}
    <p>Loading...</p>
  {/if}
</div>
