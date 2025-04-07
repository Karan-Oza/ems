const BASE_URL = "http://localhost:3002";

export const GetAllEmployees = async (search = "", page = 1, limit = 5) => {
  const url = `${BASE_URL}/api/employee/?search=${search}&page=${page}&limit=${limit}`;
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

// createEmployee by form
export const CreateEmployee = async (employeeData) => {
  const formData = new FormData();

  for (const key in employeeData) {
    formData.append(key, employeeData[key]);
  }

  try {
   
    const res = await fetch("http://localhost:3002/api/employee", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error while creating employee:", error);
    throw error;
  }
};
