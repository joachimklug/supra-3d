const removeTrailingSlash = (url: string) => url.replace(/\/+$/, "");

export const prependHttp = (url: string) => {
  let newUrl = decodeURIComponent(url);
  if (!/^(?:f|ht)tps?:\/\//.test(url)) {
    newUrl = "http://" + url;
  }
  return removeTrailingSlash(newUrl);
};
