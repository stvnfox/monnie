export const removePortfolio = async (id: number) => {
  const response = await fetch("/api/portfolio/remove", {
    method: "DELETE",
    body: JSON.stringify({ id }),
  });

  if (!response.ok) {
    throw new Error("Failed to remove portfolio");
  }

  return response.json();
};
