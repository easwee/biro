export const calculateTotalPrice = items => {
  return items.reduce((acc, item) => {
    return acc + item.units * item.unitPrice;
  }, 0);
};
