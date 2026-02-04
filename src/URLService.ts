import { ENV_DOMAIN, ENV_URL } from "./AppURL";

export const applicationURL = ENV_URL;
export const DOMAIN = ENV_DOMAIN;

export const REGISTER_USER = "enviroUser/send-email-otp";
export const VERIFY_USER_BY_EMAIL = "enviroUser/verify-email-otp";
export const LOGIN_USER = "enviroUser/login";
export const REQUEST_DEMO = "enviroUser/request-demo";

export function registerUserUrl() {
  return applicationURL + REGISTER_USER;
}

export function verifyUserByEmailUrl() {
  return applicationURL + VERIFY_USER_BY_EMAIL;
}

export function loginUserUrl() {
  return applicationURL + LOGIN_USER;
}

export function requestDemoUrl() {
  return applicationURL + REQUEST_DEMO;
}
