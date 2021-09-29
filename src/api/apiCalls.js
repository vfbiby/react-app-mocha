export const signup = (user) => {
  return fetch("/api/1.0/users", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(user),
  });
};
