import { ENV_DOMAIN, ENV_URL, ENV_URL1 } from "./AppURL";

export const applicationURL = ENV_URL;
export const applicationURL1 = ENV_URL1;
export const DOMAIN = ENV_DOMAIN;

export const REGISTER_USER = "enviroUser/send-email-otp";
export const VERIFY_USER_BY_EMAIL = "enviroUser/verify-email-otp";
// export const LOGIN_USER = "enviroUser/login";
export const LOGIN_USER = "login/commonUser";
export const REQUEST_DEMO = "enviroUser/request-demo";
export const LOGOUT_USER = "enviroUser/logout";
export const REGISTER_USER_IN_ANVAYAA = "login/userRegistration";
export const SECRET_KEY = "mySuperSecretKey123!@#";
export const VITE_API_KEY =
  "BJK5qarfkTAdI6jO22woxjp7UsIWt_JTrK7nXYxF0lneYaLl0wXJZnjC4sVn8L_rEPhkMDbku-MbTi5M9zjsYio";
export const PAYMENT_URL = "planmaster/buyPlan";
export const PACKAGE_PURCHASE_ONLINE = "api/planmaster/buyPlanOnline";
export const CCAVENUE_PLAN_PAYMENT = "api/planmaster/createPlanPayment";
export const HDFC_PLAN_PAYMENT = "api/planmaster/createHDFCPlanPayment";
export const PAYTM_PLAN_PAYMENT = "api/planmaster/createPaytmPlanPayment";
export const UPDATE_ONLINE_PLANSTATUS = "api/planmaster/updateOnlinePlanStatus";

export function registerUserUrl() {
  return applicationURL + REGISTER_USER;
}

export function verifyUserByEmailUrl() {
  return applicationURL + VERIFY_USER_BY_EMAIL;
}

// export function loginUserUrl() {
//   return applicationURL + LOGIN_USER;
// }

export function loginUserUrl() {
  return applicationURL1 + LOGIN_USER;
}

export function logoutUserUrl() {
  return applicationURL + LOGOUT_USER;
}

export function requestDemoUrl() {
  return applicationURL + REQUEST_DEMO;
}

export function registerUserInAnvayaaUrl() {
  return applicationURL1 + REGISTER_USER_IN_ANVAYAA;
}

export function paymentUrl() {
  return applicationURL1 + PAYMENT_URL;
}

export function buyPlanOnlineUrl() {
  return applicationURL1 + PACKAGE_PURCHASE_ONLINE;
}

export function ccAvenuePlanPaymentUrl() {
  return applicationURL1 + CCAVENUE_PLAN_PAYMENT;
}

export function hdfcPlanPaymentUrl() {
  return applicationURL1 + HDFC_PLAN_PAYMENT;
}

export function paytmPlanPaymentUrl() {
  return applicationURL1 + PAYTM_PLAN_PAYMENT;
}
