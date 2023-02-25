<script>
  import pdfMake from "pdfmake/build/pdfmake";
  import { format } from "date-fns";
  import { invoiceItems, rates, clientData, ownerData, manualConversion } from "store";
  import { pdfMakeFont } from "constants";
  import { pdfMakeInvoiceDefinition } from "./pdfmake-definitions";
  import { calculateTotalPrice, calculateTotalVAT } from "utils";

  $: total = calculateTotalPrice($invoiceItems);
  $: VAT = calculateTotalVAT($invoiceItems);
  $: totalWithVAT_base_currency = total + VAT;
  $: totalWithVAT_foreign_currency =
    totalWithVAT_base_currency * $rates[$ownerData.foreign_currency];

  function exportToPDF() {
    pdfMake.vfs = pdfMakeFont;
    pdfMake
      .createPdf(
        pdfMakeInvoiceDefinition({
          total,
          VAT,
          totalWithVAT_base_currency,
          totalWithVAT_foreign_currency,
          invoiceItems: $invoiceItems,
          rates: $rates,
          clientData: $clientData,
          ownerData: $ownerData,
          manualConversion: $manualConversion,
        })
      )
      .download(
        `${$ownerData.pdf_file_name_prefix}-${$ownerData.invoice_number}`
      );
  }
</script>

<style>
  button {
    position: absolute;
    bottom: 30px;
    left: 30px;
    right: 30px;
    display: block;
    background-color: #74d900;
    color: white;
    font-size: 18px;
    font-weight: 700;
    letter-spacing: 2px;
    text-align: center;
    border: 0;
    border-radius: 2px;
    height: 40px;
    line-height: 38px;
    text-transform: uppercase;
    margin: auto;
    width: calc(100% - 60px);
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
    text-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
    cursor: pointer;
  }
</style>

<button on:click={exportToPDF}>Export to PDF</button>
