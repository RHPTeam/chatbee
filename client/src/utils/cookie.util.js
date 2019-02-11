export default {
  setCookie(name, value, exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 24 * 60 * 60 * 1000);
    const expires = "expires=" + d.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
  },
  getCookie(cname) {
    const name = cname + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  },
  removeCookie(cname) {
    const d = new Date();
    d.setTime(d.getTime() - 1000 * 60 * 60 * 24);
    const expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=; path=/; " + expires;
  }
};
