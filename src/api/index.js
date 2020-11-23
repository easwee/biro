export const fetchRates = async (date, currency) => {
  const response = await fetch(
    `https://api.exchangeratesapi.io/${date}?base=${currency}`,
    {
      method: "GET",
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
