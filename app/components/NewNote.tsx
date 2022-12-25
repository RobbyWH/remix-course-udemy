import { LinksFunction } from '@remix-run/node';
import styles from './NewNote.css';
import { Form, useActionData, useTransition as useNavigation } from '@remix-run/react';

// DOC
// If you are not define the action, the default will be the routes that render this component
// use Form instead of form, so the page is not reloaded
function NewNote() {
  const data = useActionData();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === 'submitting'

  return (
    <Form method="post" id="note-form">
      {data?.message && <p>{data.message}</p>}
      <p>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" name="title" required />
      </p>
      <p>
        <label htmlFor="content">Content</label>
        <textarea id="content" name="content" rows={5} required />
      </p>
      <div className="form-actions">
        <button disabled={isSubmitting}>{isSubmitting ? 'Adding' : 'Add Note'}</button>
      </div>
    </Form>
  );
}

export default NewNote;

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: styles }
  ];
};
