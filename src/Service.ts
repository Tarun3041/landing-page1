import axios from "axios";
import {
  loginUserUrl,
  logoutUserUrl,
  registerUserInAnvayaaUrl,
  registerUserUrl,
  requestDemoUrl,
  SECRET_KEY,
  verifyUserByEmailUrl,
  VITE_API_KEY,
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

export const encryptPassword = (password: string): string => {
  return CryptoJS.AES.encrypt(password, SECRET_KEY).toString();
};

function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  return new Uint8Array([...rawData].map((c) => c.charCodeAt(0)));
}

function arrayBufferToBase64(buffer: ArrayBuffer): string {
  return btoa(String.fromCharCode(...new Uint8Array(buffer)));
}

async function requestNotificationPermission(): Promise<NotificationPermission> {
  if (!("Notification" in window)) {
    throw new Error("Notifications not supported");
  }
  return Notification.requestPermission();
}

export async function registerServiceWorker(): Promise<ServiceWorkerRegistration> {
  if (!("serviceWorker" in navigator)) {
    throw new Error("Service Worker not supported");
  }

  const registration = await navigator.serviceWorker.register("/sw.js");
  console.log("✅ Service Worker registered");
  return registration;
}

function saveSubscriptionKeys(subscription: PushSubscription) {
  const auth = subscription.getKey("auth");
  const p256dh = subscription.getKey("p256dh");

  if (!auth || !p256dh) {
    console.error("❌ Push keys missing");
    return;
  }

  const data = {
    endpoint: subscription.endpoint,
    keys: {
      auth: arrayBufferToBase64(auth),
      p256dh: arrayBufferToBase64(p256dh),
    },
  };

  localStorage.setItem("keys", JSON.stringify(data));
  console.log("✅ Push keys stored");

  return subscription;
}
export async function subscribeUserToPush(
  registration: ServiceWorkerRegistration,
) {
  const currentKey = urlBase64ToUint8Array(VITE_API_KEY);
  const existingSubscription = await registration.pushManager.getSubscription();

  if (existingSubscription) {
    const oldKey = new Uint8Array(
      existingSubscription.options.applicationServerKey as ArrayBuffer,
    );

    const isSame =
      oldKey.length === currentKey.length &&
      oldKey.every((v, i) => v === currentKey[i]);

    if (isSame) {
      console.log("✔ Using existing push subscription");
      return saveSubscriptionKeys(existingSubscription);
    }

    await existingSubscription.unsubscribe();
  }

  const subscription = await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: currentKey as any,
  });

  return saveSubscriptionKeys(subscription);
}

export async function initPushNotifications() {
  try {
    if (!("Notification" in window)) return;

    const permission = await requestNotificationPermission();
    if (permission !== "granted") {
      console.warn("🔕 Notification permission denied");
      return;
    }

    const registration = await registerServiceWorker();
    if (!registration) return;

    await subscribeUserToPush(registration);
  } catch (error) {
    console.error("💥 Push init failed:", error);
  }
}

export async function restorePushSubscription() {
  const isLoggedIn = localStorage.getItem("isUserLoggedIn") === "true";
  if (!isLoggedIn) return;
  const registration = await navigator.serviceWorker.getRegistration();
  if (!registration) return;
  const subscription = await registration.pushManager.getSubscription();
  if (!subscription) return;
}

export async function cleanupSubscriptionOnLogout() {
  const registration = await navigator.serviceWorker.getRegistration();
  if (!registration) return;

  const subscription = await registration.pushManager.getSubscription();
  if (!subscription) return;

  await subscription.unsubscribe();
  console.log("🧹 Subscription removed");
}
