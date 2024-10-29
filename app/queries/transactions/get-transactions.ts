export const getTransactionsForPortfolio = async (portfolioId: number) => {
  const response = await fetch(`/api/transactions/get/${portfolioId}`);
  return response.json();
};
