import { LinksFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import styles from '~/styles/home.css'

// DOC
// refetch page every request
// <a href="/notes">Go To Notes Page</a>

// Link to make sure we don't need to refetch every page request on /notes
// <Link to="/notes">Try Now!</Link>

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: styles }
  ];
};

export default function Index() {
  return (
    <main id="content">
      <h1>A better way of keeping track of your notes</h1>
      <p>Try our early beta and never loose track of your notes again!</p>
      <p id="cta">
        <Link to="/notes">Try Now!</Link>
      </p>
    </main>
  );
}