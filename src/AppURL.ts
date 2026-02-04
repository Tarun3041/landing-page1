export const ENV_URL = "http://localhost:3202/api/";
console.log("ENV_DOMAIN :", getDomain());

//export const ENV_URL1 = getUrl();
export const ENV_DOMAIN = getDomain();

function getUrl() {
  const uri = window.location;
  if (uri && uri.host) {
    let url: string = uri.protocol + "//" + uri.host + "/";
    console.log("url is " + url);
    // If localhost, return local dev API, else use actual domain
    return uri.host.includes("localhost") ? "http://localhost:5173/" : url;
  }
  return "";
}

function getDomain() {
  const uri = window.location;
  if (uri && uri.host) {
    let domain: string = uri.pathname.split("/")[1];
    return uri.host.includes("localhost") ? "" : domain;
  }
  return "";
}
