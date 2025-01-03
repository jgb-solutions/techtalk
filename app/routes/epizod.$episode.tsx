import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import Container from "~/components/Container"
import Title from "~/components/Title"
import * as api from "~/services/requests.server"
import { APP_NAME } from "~/utils/constants"
import { clx, formatTitle, getSpeakerName, getYouTubeIdFromUrl, itHas } from "~/utils/helpers"
import styles from "~/styles/episode.module.css"

export const meta: MetaFunction = () => {
  return [
    { title: APP_NAME },
    { name: "description", content: "Welcome to Remix!" },
  ]
}

export async function loader({ params }: LoaderFunctionArgs) {

  const episode = await api.fetchEpisode(params.episode!)

  return { episode }
}

export default function Episode() {
  const { episode } = useLoaderData<typeof loader>()
  const youtubeId = getYouTubeIdFromUrl(episode.youtube)
  return (
    <Container>
      <Title className="text-tt-blue">
        <span className="font-thin">{formatTitle(episode.title)[0]}:</span><br />
        <span className="font-medium">{formatTitle(episode.title)[1]}</span>
      </Title>
      <article className="bg-tt-yellow overflow-hidden shadow-lg rounded-xl">
        {itHas(youtubeId) && (
          <iframe
            className={clx(styles.youtube, "mb-4")}
            src={`https://www.youtube.com/embed/${youtubeId}`}
            title={episode.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        )}
        <div className="p-4">
          {itHas(episode.speakers.length) && (
            <div className="flex flex-row items-center mb-4">
              <h4 className="text-lg mr-3">Panelis:</h4>
              <div className="flex flex-row items-center">
                {episode.speakers.map((speaker) => (
                  <a key={speaker.id} href={`/panelis/${speaker.id}`} className="text-center mr-4" title={speaker.name}>
                    <img src={speaker.cdnImageUrl} alt={speaker.name} className="max-w-full w-12 h-12 rounded-full" />
                    <span className="text-sm">{getSpeakerName(speaker)}</span>
                  </a>
                ))}
              </div>
            </div>
          )}

          {itHas(episode.description) && <p className="text-lg">{episode.description}</p>}
          {itHas(episode.content) && <div className="prose" dangerouslySetInnerHTML={{ __html: episode.content }} />}

        </div>
      </article>
    </Container>
  )
}
