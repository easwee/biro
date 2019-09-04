import { writable, derived } from "svelte/store";
import { format } from "date-fns";

export const isSidebarOpened = writable(true);
export const rates = writable({});
export const invoiceTotal = writable(0);
export const invoiceVAT = writable(0);
export const invoiceTotalWithVATUSD = writable(0);
export const invoiceTotalWithVATEUR = writable(0);
export const idbReady = writable(false);

export const ownerData = writable({
  company_name: "Company name",
  company_address: "Street address",
  company_postal_number: "Postal code",
  company_city: "City",
  company_tax_registration_number: "Tax registration number",
  company_business_registration_number: "Business registration number",
  bank_account_number: "Bank account number",
  base_currency: "EUR",
  foreign_currency: "USD",
  issue_date: format(new Date(), "YYYY-MM-DD"),
  issue_city: "Issue city",
  issuer: "Invoice issuer name",
  issuer_signature:
    "data:image/png;base64,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",
  terms: 20,
  vat: 0,
  pdf_file_name_prefix: "pdf-file-name-prefix",
  use_conversion: false,
  is_vat_free: true
});

export const clientData = writable({
  client_company_name: "Company name",
  client_company_address: "Street address",
  client_company_city: "City",
  client_company_zip: "Postal code",
  client_company_country: "Country"
});

export const invoiceItems = writable([
  {
    id: 0,
    invoice_row_client_id: 1,
    invoice_row_description: "Example invoice item",
    invoice_row_units: "100",
    invoice_row_unit_format: "hours",
    invoice_row_unit_price: "10",
    invoice_row_vat: 0
  }
]);

export const properties = writable({
  description: {
    id: "description",
    name: "Description",
    show: true,
    alignRight: false,
    noWrap: false
  },
  units: {
    id: "units",
    name: "Units",
    show: true,
    alignRight: true,
    noWrap: true
  },
  pricePerUnit: {
    id: "pricePerUnit",
    name: "Price per unit",
    show: true,
    alignRight: true,
    noWrap: true
  },
  total: {
    id: "total",
    name: "Total",
    show: true,
    alignRight: true,
    noWrap: true
  }
});

export const shownPropertiesCount = derived(
  properties,
  $properties => Object.values($properties).filter(property => property.show).length
);
