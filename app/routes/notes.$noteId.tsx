import { LinksFunction, LoaderArgs, MetaFunction, json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { getStoredNotes } from "~/data/notes";
import styles from "~/styles/note-details.css"

export async function loader({params}: LoaderArgs) {
  const notes = await getStoredNotes();
  const noteId = params.noteId;
  const selectedNote = notes.find((note: any) => note.id === noteId)
  if (!selectedNote) {
    throw json({message: `Could not find note for id ${noteId}`}, {
      status: 404
    })
  }
  return selectedNote;
};
export default function NoteDetailPage() {
  const note = useLoaderData();
  return (
    <main id="note-details">
      <header>
        <nav>
          <Link to="/notes">Back to all Notes</Link>
        </nav>
        <h1>{note.title}</h1>
      </header>
      <p id="note-details-content">{note.content}</p>
      
    </main>
  );
}

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: styles }
  ];
};

// DOC : data is coming from loader
export const meta: MetaFunction = ({data, params}) => {
  return {
    title: data.title,
    description: "Manage your notes with ease."
  };
};
