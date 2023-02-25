export const fetchRates = async (date, baseCurrency, currencies) => {
  const response = await fetch(
    `https://api.currencyapi.com/v3/historical?${
      CURRENCY_EXCHANGE_API_KEY !== ""
        ? `apikey=${CURRENCY_EXCHANGE_API_KEY}`
        : ""
    }&baseCurrency=${baseCurrency}&currencies=${currencies}&date=${date}`,
    {
      method: "GET",
    }
  );
  const data = await response.json();
  debugger;
  if (response.ok) {
    return {
      data: data,
      status: response.status,
    };
  }

  const responseError = {
    type: "Error",
    message: result.message || "Something went wrong",
    data: result.data || "",
    code: result.code || "",
  };

  const error = new Error();
  error.info = responseError;

  return error;
};
