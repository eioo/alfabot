const API_PORT = process.env.WEBSERVER_PORT || 3000;
const API_BASE = `${location.protocol}//${location.hostname}:${API_PORT}/api`;

export function getAPIUrl(endPoint: string) {
  return `${API_BASE}/${endPoint}`;
}
