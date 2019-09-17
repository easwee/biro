export const BIRO_SCHEME = [
  {
    name: "owner",
    keyPath: "id",
    autoIncrement: true,
    fields: [
      {
        name: "id",
        unique: true
      },
      {
        name: "bank_account_number",
        unique: false
      },
      {
        name: "terms",
        unique: false
      },
      {
        name: "period",
        unique: false
      },
      {
        name: "vat",
        unique: false
      },
      {
        name: "base_currency",
        unique: false
      },
      {
        name: "foreign_currency",
        unique: false
      },
      {
        name: "issue_date",
        unique: false
      },
      {
        name: "issue_city",
        unique: false
      },
      {
        name: "company_name",
        unique: false
      },
      {
        name: "company_address",
        unique: false
      },
      {
        name: "company_city",
        unique: false
      },
      {
        name: "company_postal_number",
        unique: false
      },
      {
        name: "company_tax_registration_number",
        unique: false
      },
      {
        name: "company_business_registration_number",
        unique: false
      },
      {
        name: "issuer",
        unique: false
      },
      {
        name: "issuer_signature",
        unique: false
      },
      {
        name: "use_conversion",
        unique: false
      },
      {
        name: "is_vat_free",
        unique: false
      },
      {
        name: "invoice_number",
        unique: false
      }
    ]
  },
  {
    name: "clients",
    keyPath: "id",
    autoIncrement: true,
    fields: [
      {
        name: "id",
        unique: true
      },
      {
        name: "client_company_name",
        unique: true
      },
      {
        name: "client_company_address",
        unique: true
      },
      {
        name: "client_company_city",
        unique: true
      },
      {
        name: "client_company_zip",
        unique: true
      },
      {
        name: "client_company_country",
        unique: true
      }
    ]
  },
  {
    name: "invoice_rows",
    keyPath: "id",
    autoIncrement: true,
    fields: [
      {
        name: "id",
        unique: true
      },
      {
        name: "invoice_row_client_id",
        unique: false
      },
      {
        name: "invoice_row_description",
        unique: false
      },
      {
        name: "invoice_row_units",
        unique: false
      },
      {
        name: "invoice_row_unit_format",
        unique: false
      },
      {
        name: "invoice_row_unit_price",
        unique: false
      },
      {
        name: "invoice_row_vat",
        unique: false
      },
      {
        name: "invoice_past_total",
        unique: false
      }
    ]
  }
];
