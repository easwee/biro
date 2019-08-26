<script>
  import pdfMake from "pdfmake/build/pdfmake";
  import { format } from "date-fns";
  import { invoiceItems, rates, clientData, ownerData } from "store";
  import { pdfMakeFont } from "constants";
  import { pdfMakeInvoiceDefinition } from "./pdfmake-definitions";
  import { calculateTotalPrice } from "utils";

  $: total = calculateTotalPrice($invoiceItems);
  $: VAT = (total * $ownerData.vat) / 100;
  $: totalWithVATUSD = total + VAT;
  $: totalWithVATEUR = totalWithVATUSD * $rates.EUR;

  function exportToPDF() {
    pdfMake.vfs = pdfMakeFont;
    pdfMake
      .createPdf(
        pdfMakeInvoiceDefinition({
          invoiceTotal: total,
          invoiceVAT: VAT,
          invoiceTotalWithVATUSD: totalWithVATUSD,
          invoiceTotalWithVATEUR: totalWithVATEUR,
          invoiceItems: $invoiceItems,
          rates: $rates,
          clientData: $clientData,
          ownerData: $ownerData
        })
      )
      .download(
        `${$ownerData.pdf_file_name_prefix}-${format(
          $ownerData.issue_date,
          "YYYY-MM"
        )}`
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
