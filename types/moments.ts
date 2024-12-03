export interface Moments {
  moments: Array<Moment>
}

export interface Moment {
  node_id: string
  title: string
  body: string
  labels: Array<{
    name: string
    color: string
  }>
}
