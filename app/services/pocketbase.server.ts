import { z } from 'zod'
import PocketBase from 'pocketbase'
// import {eventsource} from 'eventsource'

// global.EventSource = eventsource

const POCKETBASE = z.object({
  API_URL: z.string(),
  ADMIN_USERNAME: z.string(),
  ADMIN_PASSWORD: z.string()
}).parse(process.env)

export const pb = new PocketBase(POCKETBASE.API_URL)

pb.collection('_superusers').authWithPassword(POCKETBASE.ADMIN_USERNAME, POCKETBASE.ADMIN_PASSWORD)