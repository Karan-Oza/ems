const BASE_URL = "http://localhost:3002";

export const GetAllEmployees = async (search = "", page = 1, limit = 5) => {
  const url = `${BASE_URL}/api/employees?search=${search}&page=${page}&limit=${limit}`;
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const result = await fetch(url, options);
    const { data } = await result.json();

    return data;
  } catch (err) {
    return err;
  }
};
