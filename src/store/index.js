import { writable, derived } from "svelte/store";
import { INVOICE } from "constants";

export const isSidebarOpened = writable(true);
export const ratesDate = writable(new Date(INVOICE.ISSUE_DATE));
export const rates = writable({});
export const invoiceTotal = writable(0);
export const invoiceVAT = writable(0);
export const invoiceTotalWithVATUSD = writable(0);
export const invoiceTotalWithVATEUR = writable(0);

export const invoiceItems = writable([
  {
    description: `Consultancy & development (1.6.2019 - 15.6.2019)`,
    units: 160,
    unitFormat: "hours",
    unitPrice: 100,
    period: "1.6.2019 - 15.6.2019"
  },
  {
    description: `Consultancy & development (1.6.2019 - 15.6.2019)`,
    units: 160,
    unitFormat: "hours",
    unitPrice: 100,
    period: "1.6.2019 - 15.6.2019"
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
  // period: {
  //   id: "period",
  //   name: "Period",
  //   show: true,
  //   alignRight: true,
  //   noWrap: true
  // },
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
