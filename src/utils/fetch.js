import { basePath } from '../api/config';
import { feedbackError, feedbackSuccess } from './feedback';

const handleResponse = async (response, showErrorOnly) => {
  const responseApi = await response;

  if (responseApi.statusCode === 200) {
    if (!showErrorOnly) {
      feedbackSuccess();
    }
  }
  if (responseApi.statusCode !== 200) {
    if (responseApi.statusCode === 409) {
      let msgError = responseApi.message;
      let descError = responseApi.description;
      feedbackError(msgError, descError);
    } else {
      feedbackError();
    }
  }
};

export function fetchApi(config) {
  const { method, url, data, token, contentType, showNotificationError } =
    config;

  const urlApi = `${basePath}${url}`;

  let params = {
    method,
    headers: {
      'Content-Type': contentType || 'application/json',
      Accept: '*/*',
    },
  };

  if (data) {
    params = { ...params, body: JSON.stringify(data) };
  }

  if (token) {
    params = {
      ...params,
      headers: { ...params.headers, Authorization: `Bearer ${token}` },
    };
  }

  return fetch(urlApi, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      console.log(err);
      handleResponse(err, showNotificationError);
    });
}
