import { format, addDays } from "date-fns";
import { formatter } from "utils";

const generateItemList = ({
  total,
  VAT,
  totalWithVAT_base_currency,
  totalWithVAT_foreign_currency,
  invoiceItems,
  ownerData,
}) => {
  let list = [];

  list.push([
    { text: "" },
    { text: "Description", style: "tableHeader", bold: true },
    { text: "Units", style: "tableHeader", bold: true },
    { text: "VAT", style: "tableHeader", alignment: "right", bold: true },
    {
      text: "Price per unit",
      style: "tableHeader",
      alignment: "right",
      bold: true,
    },
    { text: "Total", style: "tableHeader", alignment: "right", bold: true },
  ]);

  invoiceItems.map((item, index) => {
    const {
      invoice_row_description,
      invoice_row_units,
      invoice_row_unit_format,
      invoice_row_vat,
      invoice_row_unit_price,
    } = item;
    list.push([
      { text: index + 1, border: [false, true, false, true] },
      {
        text: invoice_row_description,
        border: [false, true, false, true],
      },
      {
        text: `${invoice_row_units} ${invoice_row_unit_format}`,
        alignment: "right",
        border: [false, true, false, true],
        noWrap: true,
      },
      {
        text: `${invoice_row_vat}%`,
        alignment: "right",
        border: [false, true, false, true],
        noWrap: true,
      },
      {
        text: formatter(ownerData.base_currency).format(invoice_row_unit_price),
        alignment: "right",
        border: [false, true, false, true],
        noWrap: true,
      },
      {
        text: formatter(ownerData.base_currency).format(
          invoice_row_units * invoice_row_unit_price
        ),
        alignment: "right",
        border: [false, true, false, true],
        noWrap: true,
      },
    ]);
  });

  list.push([
    { colSpan: 5, text: "Total", bold: true, alignment: "right" },
    "",
    "",
    "",
    "",
    {
      text: formatter(ownerData.base_currency).format(total),
      alignment: "right",
    },
  ]);
  list.push([
    { colSpan: 5, text: "VAT", bold: true, alignment: "right" },
    "",
    "",
    "",
    "",
    {
      text: formatter(ownerData.base_currency).format(VAT),
      alignment: "right",
    },
  ]);
  list.push([
    {
      colSpan: 5,
      text: `Total in ${ownerData.base_currency}`,
      bold: true,
      alignment: "right",
    },
    "",
    "",
    "",
    "",
    {
      text: formatter(ownerData.base_currency).format(
        totalWithVAT_base_currency
      ),
      alignment: "right",
    },
  ]);
  if (ownerData.use_conversion) {
    list.push([
      {
        colSpan: 5,
        text: `Total in ${ownerData.foreign_currency}`,
        bold: true,
        alignment: "right",
      },
      "",
      "",
      "",
      "",
      {
        text: formatter(ownerData.foreign_currency).format(
          totalWithVAT_foreign_currency
        ),
        alignment: "right",
      },
    ]);
  }

  return list;
};

const generateInvoice = ({
  total,
  VAT,
  totalWithVAT_base_currency,
  totalWithVAT_foreign_currency,
  invoiceItems,
  clientData,
  ownerData,
  rates,
}) => {
  const invoice = [];

  invoice.push({
    columns: [
      { text: "" },
      {
        text: [
          `${ownerData.company_name}
          ${ownerData.company_address}
          ${ownerData.company_postal_number} ${ownerData.company_city}
          Tax reg. no.: ${ownerData.company_tax_registration_number}
          Business reg. no.: ${ownerData.company_business_registration_number}`,
        ],
        fontSize: 11,
        margin: [0, 0, 0, 15],
      },
    ],
  });

  invoice.push({
    columns: [
      {
        text: [
          `${clientData.client_company_name}
          ${clientData.client_company_address}
          ${clientData.client_company_city}, ${clientData.client_company_zip}
          ${clientData.client_company_country}
          ${clientData.client_company_tax_id}`,
        ],
        fontSize: 11,
        italics: true,
        margin: [0, 15, 0, 0],
      },
      {
        table: {
          widths: [100, "auto"],
          headerRows: 1,
          body: [
            [
              { text: "INVOICE No.", style: "metaCell", bold: true },
              { text: ownerData.invoice_number, style: "metaCell", bold: true },
            ],
            [
              { text: "Date:", style: "metaCell", bold: true },
              {
                text: `${ownerData.issue_city}, ${format(
                  new Date(ownerData.issue_date),
                  "d.M.yyyy"
                )}`,
                style: "metaCell",
                bold: true,
              },
            ],
            [
              { text: "Terms:", style: "metaCell", bold: true },
              {
                text: `${ownerData.terms} days`,
                style: "metaCell",
                bold: true,
              },
            ],
            [
              { text: "Due date:", style: "metaCell", bold: true },
              {
                text: format(
                  addDays(new Date(ownerData.issue_date), ownerData.terms),
                  "d.M.yyyy"
                ),
                style: "metaCell",
                bold: true,
              },
            ],
            [
              { text: "Bank account:", style: "metaCell", bold: true },
              {
                text: ownerData.bank_account_number,
                style: "metaCell",
                bold: true,
              },
            ],
          ],
        },
        layout: {
          defaultBorder: false,
        },
        margin: [0, 0, 0, 30],
      },
    ],
    margin: [0, 0, 0, 30],
  });

  invoice.push({
    table: {
      widths: ["auto", "*", "auto", "auto", "auto", "auto"],
      headerRows: 1,
      body: generateItemList({
        total,
        VAT,
        totalWithVAT_base_currency,
        totalWithVAT_foreign_currency,
        invoiceItems,
        ownerData,
      }),
    },
    layout: {
      defaultBorder: false,
    },
  });

  if (ownerData.use_conversion) {
    invoice.push({
      text: `Exchange rate for the USD / EUR on the day ${format(
        new Date(ownerData.issue_date),
        "d.M.yyyy"
      )}: ${rates[ownerData.foreign_currency].toFixed(4)}`,

      margin: [0, 30, 0, 5],
    });

    invoice.push({
      text: [
        {
          text: "Source: ",
        },
        {
          text: `https://api.exchangeratesapi.io/${format(
            new Date(ownerData.issue_date),
            "yyyy-MM-dd"
          )}?base=USD`,
          link: `https://api.exchangeratesapi.io/${format(
            new Date(ownerData.issue_date),
            "yyyy-MM-dd"
          )}?base=USD`,
        },
      ],

      italics: true,
      fontSize: 9,
    });
  }

  if (ownerData.is_vat_free) {
    invoice.push({
      text: "VAT exempt under article 287 of VAT Directive",
      margin: [0, 20, 0, 30],
    });
  }

  invoice.push({
    columns: [
      { text: "" },
      { text: "" },
      {
        text: [
          {
            text: ["Invoice issued by:\n", ownerData.issuer],
          },
        ],
        alignment: "center",
        margin: [0, 30, 0, 0],
      },
    ],
  });

  if (ownerData.issuer_signature !== "") {
    invoice.push({
      columns: [
        { text: "" },
        { text: "" },
        {
          image: ownerData.issuer_signature,
          width: 80,
          alignment: "center",
          margin: [10, 0, 40, 0],
        },
      ],
    });
  }

  invoice.push({
    columns: [
      { text: "" },
      { text: "" },
      {
        text: "No company seal is used",
        alignment: "center",
        italics: true,
        fontSize: 9,
        margin: [0, 10, 0, 0],
      },
    ],
  });

  return invoice;
};

export const pdfMakeInvoiceDefinition = ({
  total,
  VAT,
  totalWithVAT_base_currency,
  totalWithVAT_foreign_currency,
  invoiceItems,
  clientData,
  ownerData,
  rates,
}) => {
  return {
    content: generateInvoice({
      total,
      VAT,
      totalWithVAT_base_currency,
      totalWithVAT_foreign_currency,
      invoiceItems,
      clientData,
      ownerData,
      rates,
    }),
    styles: {
      metaCell: {
        fontSize: 11,
        fillColor: "#f2f2f2",
      },
    },
  };
};
