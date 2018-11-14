export interface IVideo {
  url: string;
  name: string;
}

// Youtube V3 Data API
export interface ISearchList {
  kind: string;
  etag: string;
  nextPageToken: string;
  regionCode: string;
  pageInfo: IPageInfo;
  items: ISearchItem[];
}

export interface ISearchItem {
  kind: string;
  etag: string;
  id: IItemId;
  snippet: ISnippet;
}

export interface IItemId {
  kind: string;
  videoId?: string;
  playlistId?: string;
}

export interface ISnippet {
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: IThumbnails;
  channelTitle: string;
  liveBroadcastContent: string;
}

export interface IThumbnails {
  default: IDefault;
  medium: IDefault;
  high: IDefault;
}

export interface IDefault {
  url: string;
  width: number;
  height: number;
}

export interface IPageInfo {
  totalResults: number;
  resultsPerPage: number;
}
