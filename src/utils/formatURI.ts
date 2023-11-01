import { API_BASE_URL } from '@env';

export const formatImageURL = (uri: string) => {
  // this function should remove all the "\" from the string
  // and replace it with ""
  // and add the api url to the string at the beginning

  const formattedURI = uri.replace(/\\/g, '');
  const formattedURL = `${API_BASE_URL}/${formattedURI}`;

  return formattedURL;
};
