export const createPortfolio = async (values: { name: string }) => {
  const response = await fetch("/api/portfolio/create", {
    method: "POST",
    body: JSON.stringify(values),
  });

  if (!response.ok) {
    throw new Error("Failed to create portfolio");
  }

  return response.json();
};
