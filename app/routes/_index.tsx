import type { MetaFunction } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { APP_NAME } from "~/utils/constants.server"
import * as api from "~/services/requests.server"
import { clx } from "~/utils/helpers"


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
    <div className="">
      <header className="flex mb-8">
        <a href="/" className="w-1/3 mr-4" title={APP_NAME}>
          <img className="max-w-full w-24 shadow-lg" src="/assets/images/techtalk-logo.svg" alt={APP_NAME} />
        </a>
        <nav className="flex items-center flex-1 justify-between">
          <a className="btn btn-info shadow-lg" href="/epizod">Epizòd yo</a>
          <a className="btn btn-info shadow-lg" href="/panelis">Panelis yo</a>
          <a className="btn btn-info shadow-lg" href="/panelis">Panelis yo</a>
          <a className="btn btn-info shadow-lg" href="/ekip">Ekip La</a>
          <a className="btn btn-info shadow-lg" href="/kontak">Kontak</a>
        </nav>
      </header>

      <h2 className="text-6xl font-bold text-center mb-6">Tech Talk: Dènye Epizòd</h2>

      <article className="mb-12">
        {episodes.map((episode, index) => (
          <div key={episode.id} className={clx("bg-white rounded-lg overflow-hidden shadow-lg", {
            "mb-4": index !== episodes.length - 1,
          })}>
            <a
              className="flex flex-row items-center hover:underline"
              href={`/epizod/${episode.id}`}
            >
              <img src={episode.cdnImageUrl} alt={episode.title} className="mr-2 w-72" />
              <div className="flex-1 flex-col">
                <h3 className="text-2xl">{episode.title}</h3>
                {/* <div className="flex flex-row items-center border border-red-300">
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

      <footer className="flex flex-col justify-center items-center">
        <img className="w-64 mb-4" src="/assets/images/techtalk-logo@4x.png" alt={APP_NAME} />

        <p className="font-medium">&copy; 2025</p>
      </footer>
    </div>
  )
}