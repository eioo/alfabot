const API_PORT = process.env.WEBSERVER_PORT || 3000;
const API_BASE = `${location.protocol}//${location.hostname}:${API_PORT}/api`;

export async function getReminders() {
  const request = await fetch(`${API_BASE}/remind`);
  const response = await request.json();

  return response;
}

export async function deleteReminder(chatId: number, reminderId: number) {
  const request = await fetch(`${API_BASE}/remind`, {
    method: 'DELETE',
    body: JSON.stringify({
      chatId,
      reminderId,
    }),
  });
  const response = await request.json();

  return response;
}

export async function getSettings(chatId: number) {
  const request = await fetch(`${API_BASE}/chatsettings/${chatId}`);
  const response = await request.json();

  return response;
}

export async function getCommands() {
  const request = await fetch(`${API_BASE}/commands`);
  const response = await request.json();

  return response;
}

export async function addWeather(chatId: number, cityName: string) {
  const request = await fetch(`${API_BASE}/weather`, {
    method: 'POST',
    body: JSON.stringify({
      chatId,
      cityName,
    }),
  });
  const response = await request.json();

  return response;
}

export async function deleteWeather(chatId: number, cityName: string) {
  const request = await fetch(`${API_BASE}/weather`, {
    method: 'DELETE',
    body: JSON.stringify({
      chatId,
      cityName,
    }),
  });
  const response = await request.json();

  return response;
}
