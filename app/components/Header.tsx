import { APP_NAME } from "~/utils/constants"
import Container from "./Container"

export default function Header() {
  return (
    <header className="bg-black rounded-br-none">
      <Container className="flex mb-8">
        <a href="/" className="w-1/3 mr-4" title={APP_NAME}>
          <img className="max-w-full w-24" src="/assets/images/techtalk-logo.svg" alt={APP_NAME} />
        </a>
        <nav className="flex items-center justify-end flex-1">
          {/* <a className="btn btn-info shadow-lg" href="/epizod">Epizòd</a> */}
          <a className="btn btn-info shadow-lg ml-2" href="/panelis">Panelis</a>
          <a className="btn btn-info shadow-lg ml-2" href="/ekip">Ekip</a>
          <a className="btn btn-info shadow-lg ml-2" href="/kontak">Kontak</a>
        </nav>
      </Container>
    </header>
  )
}