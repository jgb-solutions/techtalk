import { APP_NAME } from "~/utils/constants"
import Container from "./Container"

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <Container className="flex items-center justify-between">
        <img className="w-64 mb-4" src="/assets/images/techtalk-logo@4x.png" alt={APP_NAME} />

        <p className="font-medium">&copy; 2025</p>
      </Container>
    </footer>
  )
}