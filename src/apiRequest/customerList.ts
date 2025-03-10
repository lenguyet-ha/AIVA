import axios from "axios";

export const fetchCustomer = async () => {
    try {
      const response = await axios.get('http://localhost:3000/users');
      return response.data;
    } catch (error) {
      console.log("error: ", error);
      return null;
    }
  };
  