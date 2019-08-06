import { writable } from "svelte/store";
import { DATA } from "../config";

export const ratesDate = writable(new Date(DATA.INVOICE_ISSUE_DATE));
export const rates = writable({});
export const invoiceItems = writable([
  {
    description: "Consultancy & development",
    units: 160,
    unitFormat: "hours",
    unitPrice: 100
  }
]);
