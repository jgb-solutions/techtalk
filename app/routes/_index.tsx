import type { MetaFunction } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { APP_NAME } from "~/utils/constants"
import * as api from "~/services/requests.server"


export const meta: MetaFunction = () => {
  return [
    { title: APP_NAME },
    { name: "description", content: "Welcome to Remix!" },
  ]
}

export async function loader() {
  const episodes = await api.fetchEpisodes()

  return { episodes: episodes }
}

export default function Index() {
  const { episodes } = useLoaderData<typeof loader>()

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-16">
        <ul>
          {episodes.map(episode => (
            <li key={episode.id}>
              <a
                className="flex flex-row items-center p-3 leading-normal text-blue-700 hover:underline dark:text-blue-500"
                href={`/episodes/${episode.id}`}
              >
                <img src={episode.imageUrl} alt={episode.title} className="mr-2 w-48" />
                {episode.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div >
  )
}