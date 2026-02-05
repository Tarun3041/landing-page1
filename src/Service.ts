import axios from "axios";
import {
  loginUserUrl,
  logoutUserUrl,
  registerUserInAnvayaaUrl,
  registerUserUrl,
  requestDemoUrl,
  SECRET_KEY,
  verifyUserByEmailUrl,
} from "./URLService";
import CryptoJS from "crypto-js";

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

export const registerUserInAnvayaaApi = async (registrationData: any) => {
  try {
    const response = await axios.post(
      registerUserInAnvayaaUrl(),
      registrationData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
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

export const logoutUserApi = async (logoutData: any) => {
  try {
    const response = await axios.post(logoutUserUrl(), logoutData, {
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

const key = CryptoJS.enc.Utf8.parse(SECRET_KEY);

export const encryptPassword = (password: string): string => {
  return CryptoJS.AES.encrypt(password, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  }).toString();
};
