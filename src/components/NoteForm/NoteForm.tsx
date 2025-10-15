import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createNote } from '../../services/noteService';
import type { NewNote } from '../../types/note';

import ErrorMessage from '../ErrorMessage/ErrorMessage'; 
import css from './NoteForm.module.css';

export interface NoteFormProps {    
  onClose: () => void;
}

const initialValues: NewNote = {
  title: '',
  content: '',
  tag: 'Todo',
};

const Schema = Yup.object({
  title: Yup.string().min(3, 'Min 3 chars').max(50, 'Max 50 chars').required('Required'),
  content: Yup.string().max(500, 'Max 500 chars'),
  tag: Yup.mixed<'Todo' | 'Work' | 'Personal' | 'Meeting' | 'Shopping'>()
    .oneOf(['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'])
    .required('Required'),
});

export default function NoteForm({ onClose }: NoteFormProps) {
  const qc = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (payload: NewNote) => createNote(payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['notes'] });
      onClose();
    },
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={Schema}
      onSubmit={(values) => mutate(values)}
    >
      {({ errors, touched, isValid }) => (
        <Form className={css.form}>
          <div className={css.formGroup}>
            <label htmlFor="title">Title</label>
            <Field id="title" name="title" type="text" className={css.input} />
            {touched.title && errors.title && (
              <ErrorMessage message={errors.title} />
            )}
          </div>

          <div className={css.formGroup}>
            <label htmlFor="content">Content</label>
            <Field
              as="textarea"
              id="content"
              name="content"
              rows={8}
              className={css.textarea}
            />
            {touched.content && errors.content && (
              <ErrorMessage message={errors.content} />
            )}
          </div>

          <div className={css.formGroup}>
            <label htmlFor="tag">Tag</label>
            <Field as="select" id="tag" name="tag" className={css.select}>
              <option value="Todo">Todo</option>
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Meeting">Meeting</option>
              <option value="Shopping">Shopping</option>
            </Field>
            {touched.tag && errors.tag && (
              <ErrorMessage message={errors.tag as string} />
            )}
          </div>

          <div className={css.actions}>
            <button
              type="button"
              className={css.cancelButton}
              onClick={onClose}
              disabled={isPending}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={css.submitButton}
              disabled={!isValid || isPending}
            >
              Create note
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}



