import { OpenPanel } from '@openpanel/web'

export function useOpenpanel() {
  const config = useRuntimeConfig()
  const op = new OpenPanel({
    clientId: config.public.openpanel.clientid,
    trackScreenViews: true,
    trackOutgoingLinks: true,
    trackAttributes: true,
  })

  return op
}
