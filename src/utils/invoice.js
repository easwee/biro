export const calculateTotalPrice = (items) => {
  return items.reduce((acc, item) => {
    return acc + item.invoice_row_units * item.invoice_row_unit_price;
  }, 0);
};

export const calculateTotalVAT = (items) => {
  return items.reduce((acc, item) => {
    return (
      acc +
      (item.invoice_row_units *
        item.invoice_row_unit_price *
        item.invoice_row_vat) /
        100
    );
  }, 0);
};
