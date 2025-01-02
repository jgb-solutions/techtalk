import { z } from 'zod'

export const APP_NAME = `Tech Talk`

export const env = z
  .object({
    API_URL: z.string(),
    ADMIN_USERNAME: z.string(),
    ADMIN_PASSWORD: z.string()
  })
  .parse(process.env)