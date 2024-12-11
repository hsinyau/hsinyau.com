export interface LanyardActivity {
  name: string
  state: string
  details: string
  assets: {
    large_text: string
    small_text: string
  }
  timestamps: {
    start: number
  }
}

export interface LanyardSpotify {
  album: string
  artist: string
  song: string
}

export interface Activity {
  data: {
    activities: Array<LanyardActivity>
    spotify: LanyardSpotify
  }
}
