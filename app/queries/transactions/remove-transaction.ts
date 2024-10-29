export const removeTransaction = async (id: number) => {
  const response = await fetch("/api/transactions/remove", {
    method: "DELETE",
    body: JSON.stringify({ id }),
  });

  if (!response.ok) {
    throw new Error("Failed to remove transaction");
  }

  return response.json();
};
