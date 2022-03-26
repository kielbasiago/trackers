import urljoin from "url-join";

export const getAssetUrl = (str: string) => urljoin(window.location.origin, "images", `${str}.png`);
