import fetch from 'node-fetch';
import * as queryString from 'query-string';
import { logger } from 'shared/logger';
import { sleep } from 'shared/sleep';

import { ISearchItem, ISearchList, IVideo } from './types';

const API_URL = 'https://www.googleapis.com/youtube/v3/search';
export const API_KEY = process.env.YOUTUBEV3_KEY;

export async function getVideo(
  searchText: string
): Promise<IVideo | undefined> {
  const payload = queryString.stringify({
    part: 'snippet',
    maxResults: 25,
    q: searchText,
    key: API_KEY,
  });

  let data: ISearchList | undefined;

  for (let i = 0; i < 4; i++) {
    try {
      const response = await fetch(`${API_URL}?${payload}`);
      data = await response.json();
    } catch (e) {
      logger.error(e);
      await sleep(500);
    }
  }

  if (!data) {
    return;
  }

  const video: ISearchItem | undefined = data.items.find(
    x => x.id.kind === 'youtube#video'
  );

  if (!video) {
    return;
  }

  const url = `http://youtu.be/${video.id.videoId}`;
  const name = video.snippet.title;

  return { url, name };
}
