import { format, addDays } from "date-fns";
import { INVOICE } from "constants";
import { formatter } from "utils";

const generateItemList = ({
  invoiceTotal,
  invoiceVAT,
  invoiceTotalWithVATUSD,
  invoiceTotalWithVATEUR,
  invoiceItems
}) => {
  let list = [];

  list.push([
    { text: "" },
    { text: "Description", style: "tableHeader", bold: true },
    { text: "Units", style: "tableHeader", bold: true },
    { text: "Price per unit", style: "tableHeader", alignment: "right", bold: true },
    { text: "Total", style: "tableHeader", alignment: "right", bold: true }
  ]);

  invoiceItems.map((item, index) => {
    const { description, units, unitFormat, unitPrice } = item;
    list.push([
      { text: index + 1, border: [false, true, false, true] },
      {
        text: description,
        border: [false, true, false, true]
      },
      { text: `${units} ${unitFormat}`, alignment: "right", border: [false, true, false, true] },
      {
        text: formatter("USD").format(unitPrice),
        alignment: "right",
        border: [false, true, false, true]
      },
      {
        text: formatter("USD").format(units * unitPrice),
        alignment: "right",
        border: [false, true, false, true]
      }
    ]);
  });

  list.push([
    "",
    "",
    "",
    { text: "Total", bold: true, alignment: "right" },
    { text: formatter("USD").format(invoiceTotal), alignment: "right" }
  ]);
  list.push([
    "",
    "",
    "",
    { text: "VAT", bold: true, alignment: "right" },
    { text: formatter("USD").format(invoiceVAT), alignment: "right" }
  ]);
  list.push([
    "",
    "",
    "",
    { text: "Total in USD", bold: true, alignment: "right" },
    { text: formatter("USD").format(invoiceTotalWithVATUSD), alignment: "right" }
  ]);
  list.push([
    "",
    "",
    "",
    { text: "Total in EUR", bold: true, alignment: "right" },
    { text: formatter("EUR").format(invoiceTotalWithVATEUR), alignment: "right" }
  ]);

  return list;
};

export const pdfMakeInvoiceDefinition = ({
  invoiceTotal,
  invoiceVAT,
  invoiceTotalWithVATUSD,
  invoiceTotalWithVATEUR,
  invoiceItems,
  rates,
  ratesDate
}) => {
  return {
    content: [
      {
        columns: [
          { text: "" },
          {
            text: [
              `${INVOICE.COMPANY_NAME}
              ${INVOICE.COMPANY_ADDRESS}
              ${INVOICE.COMPANY_POSTAL_NUMBER} ${INVOICE.ISSUE_CITY}
              Tax reg. no.: ${INVOICE.COMPANY_TAX_REGISTRATION_NUMBER}
              Business reg. no.: ${INVOICE.COMPANY_BUSINESS_REGISTRATION_NUMBER}`
            ],
            fontSize: 11,
            margin: [0, 0, 0, 15]
          }
        ]
      },
      {
        columns: [
          {
            text: [
              "Povio Inc.\n",
              '"16 Merced Avenue\n',
              '94127 California"\n',
              "San Francisco, CA 94127\n",
              "USA"
            ],
            fontSize: 11,
            italics: true,
            margin: [0, 15, 0, 0]
          },
          {
            table: {
              widths: [100, "auto"],
              headerRows: 1,
              body: [
                [
                  { text: "INVOICE No.", style: "metaCell", bold: true },
                  { text: format(ratesDate, "YYYY-MM"), style: "metaCell", bold: true }
                ],
                [
                  { text: "Date:", style: "metaCell", bold: true },
                  {
                    text: `${INVOICE.ISSUE_CITY}, ${format(ratesDate, "D.M.YYYY")}`,
                    style: "metaCell",
                    bold: true
                  }
                ],
                [
                  { text: "Terms:", style: "metaCell", bold: true },
                  { text: `${INVOICE.TERMS} days`, style: "metaCell", bold: true }
                ],
                [
                  { text: "Due date:", style: "metaCell", bold: true },
                  {
                    text: format(addDays(ratesDate, INVOICE.TERMS), "D.M.YYYY"),
                    style: "metaCell",
                    bold: true
                  }
                ],
                [
                  { text: "Bank account:", style: "metaCell", bold: true },
                  { text: INVOICE.BANK_ACCOUNT_NUMBER, style: "metaCell", bold: true }
                ]
              ]
            },
            layout: {
              defaultBorder: false
            },
            margin: [0, 0, 0, 30]
          }
        ],
        margin: [0, 0, 0, 30]
      },
      {
        table: {
          widths: ["auto", 270, "auto", "auto", "auto"],
          headerRows: 1,
          body: generateItemList({
            invoiceTotal,
            invoiceVAT,
            invoiceTotalWithVATUSD,
            invoiceTotalWithVATEUR,
            invoiceItems
          })
        },
        layout: {
          defaultBorder: false
        }
      },
      {
        text: `Exchange rate for the USD / EUR on the day ${format(
          ratesDate,
          "D.M.YYYY"
        )}: ${rates.EUR.toFixed(4)}`,
        margin: [0, 30, 0, 5]
      },
      {
        text: [
          {
            text: "Source: "
          },
          {
            text: `https://api.exchangeratesapi.io/${format(ratesDate, "YYYY-MM-DD")}?base=USD`,
            link: `https://api.exchangeratesapi.io/${format(ratesDate, "YYYY-MM-DD")}?base=USD`
          }
        ],
        italics: true,
        fontSize: 9
      },
      {
        text: "VAT exempt under article 287 of VAT Directive",
        margin: [0, 20, 0, 30]
      },

      {
        columns: [
          { text: "" },
          { text: "" },
          {
            text: [
              {
                text: ["Invoice issued by:\n", INVOICE.ISSUER]
              }
            ],
            alignment: "center"
          }
        ]
      },
      {
        columns: [
          { text: "" },
          { text: "" },
          {
            image: INVOICE.ISSUER_SIGNATURE,
            width: 60,
            alignment: "center",
            margin: [10, 0, 40, 0]
          }
        ]
      },

      {
        columns: [
          { text: "" },
          { text: "" },
          {
            text: "No company seal is used",
            alignment: "center",
            italics: true,
            fontSize: 9,
            margin: [0, 10, 0, 0]
          }
        ]
      }
    ],
    styles: {
      metaCell: {
        fontSize: 11,
        fillColor: "#f2f2f2"
      }
    }
  };
};
