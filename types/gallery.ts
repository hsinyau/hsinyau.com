export interface Photos {
  photos: Array<Photo>
}

export interface Photo {
  image: Image
}

export interface Image {
  _id: string
  width: number
  height: number
  description: string
  responsive_url: string
  capture_date: number
  location_coords: string
}
