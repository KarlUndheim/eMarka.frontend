import nookies from "nookies";
import { BACKEND_URL } from "../consts";

export const redirectIfLogged = async (ctx) => {
  const cookies = nookies.get(ctx);

  const jwt = cookies.jwt || null;

  if (jwt) {
    return { redirect: { destination: "/", permanent: false } };
  }
  return { props: {} };
};

export const getIsLogged = async (ctx) => {
  const cookies = nookies.get(ctx);

  const jwt = cookies.jwt || null;

  if (jwt) return { props: { isLogged: true } };

  return { props: { isLogged: false } };
};

export const loginRequired = async (ctx) => {
  const cookies = nookies.get(ctx);

  const jwt = cookies.jwt || null;

  if (!jwt) {
    return { redirect: { destination: "/login", permanent: false } };
  }
  return { props: {} };
};

export const post = async (url, data, jwt = null) => {
  const config = {
    method: "POST",
    headers: {
      ...(jwt && { Authorization: `Bearer ${jwt}` }),
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  const query = await fetch(`${BACKEND_URL}${url}`, config);

  return await query.json();
};

export const put = async (url, data, jwt = null) => {
  const config = {
    method: "PUT",
    headers: {
      ...(jwt && { Authorization: `Bearer ${jwt}` }),
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  const query = await fetch(`${BACKEND_URL}${url}`, config);

  return await query.json();
};

export const get = async (url, jwt = null, populate = true) => {
  const config = {
    headers: {
      Authorization: `Bearer ${jwt}`,
      Accept: "application/json",
    },
  };

  const query = populate
    ? await fetch(`${BACKEND_URL}${url}?populate=*`, jwt && config)
    : await fetch(`${BACKEND_URL}${url}`, jwt && config);

  return await query.json();
};
