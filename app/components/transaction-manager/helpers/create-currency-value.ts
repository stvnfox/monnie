export const createCurrencyValue = (value: number) => {
  return value.toLocaleString("nl-NL", { style: "currency", currency: "EUR" });
};
