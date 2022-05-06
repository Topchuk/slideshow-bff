export interface PlaylistResponse {
  screenKey: string;
  breakpointInterval: number;
  playlists: Playlist;
  modified: number;
}

export interface Playlist {
  channelTime: number;
  playlistItems: PlaylistItem[];
  playlistKey: string;
}

export interface PlaylistItem {
  fileKey: string;
  creativeKey: string;
}
