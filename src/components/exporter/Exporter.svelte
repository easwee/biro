<script>
  import pdfMake from "pdfmake/build/pdfmake";
  import { format, addDays } from "date-fns";
  import { INVOICE } from "constants";
  import {
    invoiceTotal,
    invoiceVAT,
    invoiceTotalWithVATUSD,
    invoiceTotalWithVATEUR,
    invoiceItems,
    rates,
    ratesDate
  } from "store";
  import { pdfMakeFont } from "constants";
  import { pdfMakeInvoiceDefinition } from "./pdfmake-definitions";

  function exportToPDF() {
    pdfMake.vfs = pdfMakeFont;
    pdfMake
      .createPdf(
        pdfMakeInvoiceDefinition({
          invoiceTotal: $invoiceTotal,
          invoiceVAT: $invoiceVAT,
          invoiceTotalWithVATUSD: $invoiceTotalWithVATUSD,
          invoiceTotalWithVATEUR: $invoiceTotalWithVATEUR,
          invoiceItems: $invoiceItems,
          rates: $rates,
          ratesDate: $ratesDate
        })
      )
      .download(
        `${INVOICE.PDF_FILE_NAME_PREFIX}-${format($ratesDate, "YYYY-MM")}`
      );
  }
</script>

<button on:click={exportToPDF}>Export</button>
