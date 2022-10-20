export const helpHttp = () => {
  const customFetch = (endpoint, options) => {
    const defaulHeader = {
      accept: "application/json",
    };
    //CUANDO SERVIDOR ESTÁ CAIDO..PODER ABOSTAR MANUALMENTE. Y ESTABLECER UN SETTIMEOUT
    const controller = new AbortController();
    options.signal = controller.signal;

    options.method = options.method || "GET";
    options.headers = options.headers
      ? { ...defaulHeader, ...options.headers }
      : defaulHeader;

    // PASAMOS A OBJETO COMO STRING AL BACK
    options.body = JSON.stringify(options.body) || false;
    if (!options.body) delete options.body; // si es valor de options.body es falso-->Eliminar.

    // console.log(options);

    //si no tenemos respuesta del servidor que aborte. Se activa el catch
    setTimeout(() => controller.abort(), 3000);

    return fetch(endpoint, options)
      .then((res) =>
        //si es verdadero lo convierte a json
        res.ok
          ? res.json()
          : //si la rechaza...error
            Promise.reject({
              err: true,
              status: res.status || "00",
              statusText: res.statusText || "Ocurrió un error",
            })
      )
      .catch((err) => err);
  };

  const get = (url, options = {}) => customFetch(url, options);

  const post = (url, options = {}) => {
    options.method = "POST";
    return customFetch(url, options);
  };

  const put = (url, options = {}) => {
    options.method = "PUT";
    return customFetch(url, options);
  };

  const del = (url, options = {}) => {
    options.method = "DELETE";
    return customFetch(url, options);
  };

  return {
    get,
    post,
    put,
    del,
  };
};
