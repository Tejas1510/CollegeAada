import Cookies from "js-cookie";

function getSessionCookie() {
    const sessionCookie = Cookies.get("session");
    if(sessionCookie && sessionCookie != "undefined") {
        return JSON.parse(sessionCookie);
    } else {
        return undefined;
    }
}

function setSessionCookie(value) {
    Cookies.remove("session");
    Cookies.set("session", value, {expires: 365});
}

function removeCookie() {
    Cookies.remove("session");
}

export {getSessionCookie, setSessionCookie, removeCookie};
