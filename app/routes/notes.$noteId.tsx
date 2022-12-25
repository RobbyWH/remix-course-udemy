import { LinksFunction, LoaderArgs } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { getStoredNotes } from "~/data/notes";
import styles from "~/styles/note-details.css"

export async function loader({params}: LoaderArgs) {
  const notes = await getStoredNotes();
  const selectedNote = notes.find((note: any) => note.id === params.noteId)
  return {}
};
export default function NoteDetailPage() {
  return (
    <main id="note-details">
      <header>
        <nav>
          <Link to="/notes">Back to all Notes</Link>
        </nav>
        <h1>NOTE TITLE</h1>
      </header>
      <p id="note-details-content">NOTE CONTENT</p>
      
    </main>
  );
}

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: styles }
  ];
};