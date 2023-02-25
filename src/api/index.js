export const fetchRates = async (date, currency) => {
  const response = await fetch(
    // fetch just one day
    `https://freecurrencyapi.net/api/v2/historical?${
      CURRENCY_EXCHANGE_API_KEY !== ""
        ? `apikey=${CURRENCY_EXCHANGE_API_KEY}`
        : ""
    }&base_currency=${currency}&date_from=${date}&date_to=${date}`,
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
