import type { MetaFunction } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import Container from "~/components/Container"
import Title from "~/components/Title"
import * as api from "~/services/requests.server"
import { APP_NAME } from "~/utils/constants"
import { clx, formatTitle } from "~/utils/helpers"


export const meta: MetaFunction = () => {
  return [
    { title: APP_NAME },
    { name: "description", content: "Welcome to Remix!" },
  ]
}

export async function loader() {
  const episodes = await api.fetchEpisodes()

  return { episodes }
}

export default function Index() {
  const { episodes } = useLoaderData<typeof loader>()

  return (
    <Container>
      <Title className="text-tt-blue"><span className="font-thin">Tech Talk:</span> <span className="font-medium">Dènye Epizòd</span></Title>

      <article className="mb-12">
        {episodes.map((episode, index) => (
          <div key={episode.id} className={clx("bg-tt-yellow rounded-xl overflow-hidden shadow-lg", {
            "mb-4": index !== episodes.length - 1,
          })}>
            <a
              className="flex flex-row items-center"
              href={`/epizod/${episode.id}`}
            >
              <img src={episode.cdnImageUrl} alt={episode.title} className="mr-2 w-72" />
              <div className="flex-1 flex-col">
                <h3 className="text-2xl">
                  <span className="font-thin">{formatTitle(episode.title)[0]}:</span><br />
                  <span className="font-medium">{formatTitle(episode.title)[1]}</span>
                </h3>
                {/* <div className="flex flex-row items-center">
                  {episode.speakers.map((speaker) => (
                    <a key={speaker.id} href={`/panelis/${speaker.id}`} className="">
                      <img src={speaker.cdnImageUrl} alt={speaker.name} className="max-w-full w-8 h-8 rounded-full" />
                    </a>
                  ))}
                </div> */}
              </div>
            </a>
          </div>
        ))}
      </article>
    </Container>
  )
}