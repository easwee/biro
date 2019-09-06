import { format, addDays } from "date-fns";
import { formatter } from "utils";

const generateItemList = ({
  total,
  VAT,
  totalWithVAT_base_currency,
  totalWithVAT_foreign_currency,
  invoiceItems,
  ownerData
}) => {
  let list = [];

  list.push([
    { text: "" },
    { text: "Description", style: "tableHeader", bold: true },
    { text: "Units", style: "tableHeader", bold: true },
    { text: "VAT", style: "tableHeader", alignment: "right", bold: true },
    { text: "Price per unit", style: "tableHeader", alignment: "right", bold: true },
    { text: "Total", style: "tableHeader", alignment: "right", bold: true }
  ]);

  invoiceItems.map((item, index) => {
    const {
      invoice_row_description,
      invoice_row_units,
      invoice_row_unit_format,
      invoice_row_vat,
      invoice_row_unit_price
    } = item;
    list.push([
      { text: index + 1, border: [false, true, false, true] },
      {
        text: invoice_row_description,
        border: [false, true, false, true]
      },
      {
        text: `${invoice_row_units} ${invoice_row_unit_format}`,
        alignment: "right",
        border: [false, true, false, true],
        noWrap: true
      },
      {
        text: invoice_row_vat,
        alignment: "right",
        border: [false, true, false, true],
        noWrap: true
      },
      {
        text: formatter(ownerData.base_currency).format(invoice_row_unit_price),
        alignment: "right",
        border: [false, true, false, true],
        noWrap: true
      },
      {
        text: formatter(ownerData.base_currency).format(invoice_row_units * invoice_row_unit_price),
        alignment: "right",
        border: [false, true, false, true],
        noWrap: true
      }
    ]);
  });

  list.push([
    { colSpan: 5, text: "Total", bold: true, alignment: "right" },
    "",
    "",
    "",
    "",
    { text: formatter(ownerData.base_currency).format(total), alignment: "right" }
  ]);
  list.push([
    { colSpan: 5, text: "VAT", bold: true, alignment: "right" },
    "",
    "",
    "",
    "",
    { text: formatter(ownerData.base_currency).format(VAT), alignment: "right" }
  ]);
  list.push([
    { colSpan: 5, text: "Total in USD", bold: true, alignment: "right" },
    "",
    "",
    "",
    "",
    {
      text: formatter(ownerData.base_currency).format(totalWithVAT_base_currency),
      alignment: "right"
    }
  ]);
  if (ownerData.use_conversion) {
    list.push([
      {
        colSpan: 5,
        text: `Total in ${ownerData.foreign_currency}`,
        bold: true,
        alignment: "right"
      },
      "",
      "",
      "",
      "",
      {
        text: formatter(ownerData.foreign_currency).format(totalWithVAT_foreign_currency),
        alignment: "right"
      }
    ]);
  }

  return list;
};

export const pdfMakeInvoiceDefinition = ({
  total,
  VAT,
  totalWithVAT_base_currency,
  totalWithVAT_foreign_currency,
  invoiceItems,
  rates,
  clientData,
  ownerData
}) => {
  return {
    content: [
      {
        columns: [
          { text: "" },
          {
            text: [
              `${ownerData.company_name}
              ${ownerData.company_address}
              ${ownerData.company_postal_number} ${ownerData.company_city}
              Tax reg. no.: ${ownerData.company_tax_registration_number}
              Business reg. no.: ${ownerData.company_business_registration_number}`
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
              `${clientData.client_company_name}
              ${clientData.client_company_address}
              ${clientData.client_company_city}, ${clientData.client_company_zip}
              ${clientData.client_company_country}`
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
                  { text: format(ownerData.issue_date, "YYYY-MM"), style: "metaCell", bold: true }
                ],
                [
                  { text: "Date:", style: "metaCell", bold: true },
                  {
                    text: `${ownerData.issue_city}, ${format(ownerData.issue_date, "D.M.YYYY")}`,
                    style: "metaCell",
                    bold: true
                  }
                ],
                [
                  { text: "Terms:", style: "metaCell", bold: true },
                  { text: `${ownerData.terms} days`, style: "metaCell", bold: true }
                ],
                [
                  { text: "Due date:", style: "metaCell", bold: true },
                  {
                    text: format(addDays(ownerData.issue_date, ownerData.terms), "D.M.YYYY"),
                    style: "metaCell",
                    bold: true
                  }
                ],
                [
                  { text: "Bank account:", style: "metaCell", bold: true },
                  { text: ownerData.bank_account_number, style: "metaCell", bold: true }
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
          widths: ["auto", "*", "auto", "auto", "auto", "auto"],
          headerRows: 1,
          body: generateItemList({
            total,
            VAT,
            totalWithVAT_base_currency,
            totalWithVAT_foreign_currency,
            invoiceItems,
            ownerData
          })
        },
        layout: {
          defaultBorder: false
        }
      },
      // {
      //   text: () => {
      //     return ownerData.use_conversion
      //       ? `Exchange rate for the USD / EUR on the day ${format(
      //           ownerData.issue_date,
      //           "D.M.YYYY"
      //         )}: ${rates.EUR.toFixed(4)}`
      //       : "";
      //   },
      //   margin: [0, 30, 0, 5]
      // },
      // {
      //   text: () => {
      //     return ownerData.use_conversion
      //       ? [
      //           {
      //             text: "Source: "
      //           },
      //           {
      //             text: `https://api.exchangeratesapi.io/${format(
      //               ownerData.issue_date,
      //               "YYYY-MM-DD"
      //             )}?base=USD`,
      //             link: `https://api.exchangeratesapi.io/${format(
      //               ownerData.issue_date,
      //               "YYYY-MM-DD"
      //             )}?base=USD`
      //           }
      //         ]
      //       : "";
      //   },
      //   italics: true,
      //   fontSize: 9
      // },
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
                text: ["Invoice issued by:\n", ownerData.issuer]
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
            image: ownerData.issuer_signature,
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
