export interface Photos {
  photos: Array<Photo>
}

export interface Photo {
  width: number
  height: number
  links: {
    url: string
  }
  sha1: string
}
