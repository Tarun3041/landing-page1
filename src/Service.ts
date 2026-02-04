import axios from "axios";
import {
  loginUserUrl,
  registerUserUrl,
  requestDemoUrl,
  verifyUserByEmailUrl,
} from "./URLService";

export const registerUserApi = async (registrationData: any) => {
  try {
    const response = await axios.post(registerUserUrl(), registrationData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const verifyUserByEmailApi = async (verifyEmailData: any) => {
  try {
    const response = await axios.post(verifyUserByEmailUrl(), verifyEmailData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const loginUserApi = async (loginData: any) => {
  try {
    const response = await axios.post(loginUserUrl(), loginData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const requestDemoApi = async (requestDemoData: any) => {
  try {
    const response = await axios.post(requestDemoUrl(), requestDemoData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};


