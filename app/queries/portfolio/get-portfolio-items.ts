export const getPortfolioItems = async () => {
  const response = await fetch("/api/portfolio/get", {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Failed to get portfolios");
  }

  return response.json();
};
