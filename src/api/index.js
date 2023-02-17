export const fetchRates = async (date, currency) => {
  const response = await fetch(
    // fetch just one day
    `https://api.freecurrencyapi.com/v1/latest?${
      CURRENCY_EXCHANGE_API_KEY !== ''
        ? `apikey=${CURRENCY_EXCHANGE_API_KEY}`
        : ''
    }&base_currency=${currency}`,
    {
      method: 'GET',
    }
  );

  if (response.status === 200) {
    return {
      data: await response.json(),
      status: response.status,
    };
  } else {
    return {
      status: response.status,
    };
  }
};
