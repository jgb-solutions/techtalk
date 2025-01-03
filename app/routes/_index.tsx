import type { MetaFunction } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import Container from "~/components/Container"
import Episode from "~/components/Episode"
import Title from "~/components/Title"
import * as api from "~/services/requests.server"
import { APP_NAME } from "~/utils/constants"
import { clx } from "~/utils/helpers"


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
      <Title className="text-tt-blue">
        <span className="font-thin">Tech Talk:</span>
        <span className="font-medium">Dènye Epizòd</span>
      </Title>

      <article className="mb-12">
        {episodes.map((episode, index) => (
          <Episode key={episode.id} episode={episode} className={clx({
            "mb-4": index !== episodes.length - 1,
          })} />
        ))}
      </article>
    </Container>
  )
}