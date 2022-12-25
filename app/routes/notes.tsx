import { LinksFunction, ActionArgs, redirect, LoaderArgs, json } from "@remix-run/node";
import { Link, useCatch, useLoaderData } from "@remix-run/react";
import NewNote, {links as newNoteLinks} from "~/components/NewNote";
import NoteList, {links as noteListLinks} from "~/components/NoteList";
import { getStoredNotes, storeNotes } from "~/data/notes";

export const links: LinksFunction = () => {
  return [
    ...newNoteLinks(),
    ...noteListLinks()
  ];
};

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  // const noteData = {
  //   title: formData.get('title'),
  //   content: formData.get('content')
  // }
  // Use this instead of above
  const noteData = Object.fromEntries(formData);

  if (noteData?.title?.toString().trim().length < 5) {
    return {message: 'Invalid title - must be at least 5 characters long.'}
  }

  const existingNotes = await getStoredNotes();
  noteData.id = new Date().toISOString();
  const updatedNotes = existingNotes.concat(noteData);
  await storeNotes(updatedNotes)
  return redirect('/notes');
};

export async function loader(req: LoaderArgs) {
  const notes = await getStoredNotes();
  if (!notes || notes.length === 0) {
    throw json({
      message: 'Could not find any notes.'
    }, {
      status: 404,
      statusText: 'Not found'
    })
  }
  return json(notes);
};

export default function NotesPage() {
  const notes = useLoaderData<typeof loader>();

  return (
    <main>
      <NewNote />
      <NoteList notes={notes} />
    </main>
  );
}

export function CatchBoundary() {
  const caughtResponse = useCatch();
  const message = caughtResponse.data?.message || 'Data not found';
  return <main>
    <NewNote />
    <p className='info-message'>{message}</p>
  </main>
}

export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <main className='error'>
      <h1>An error related to your notes occured!</h1>
      <p>{error.message}</p>
      <p>Back to <Link to='/'>safety</Link>!</p>
    </main>
  );
}