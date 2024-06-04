import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z, ZodError } from 'zod';
import Button from "../../components/Button";
import { createPost } from '../../api';
import { Container, FormActions, NewTopicForm } from "./styles";

const schema = z.object({
  week: z.string().min(1, 'Choose one category, please.'),
  title: z.string().min(5, 'Enter a title with at least 5 characters.').max(100, 'Title cannot exceed 100 characters.'),
  content: z.string().min(10, 'Enter content with at least 10 characters.').max(500, 'Content cannot exceed 500 characters.'),
});

function NewTopicPage() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  const onSubmit = handleSubmit(async (data: Record<string, string>) => {
    try {
      const validatedData = schema.parse(data);
      const weekNumber = Number(validatedData.week);

      const newPost = {
        id: Math.floor(Math.random() * 10000000) + 1,
        author: "John Doe",
        authorId: 1,
        date: new Date().toISOString(),
        upvotes: 0,
        downvotes: 0,
        answers: [],
        week: weekNumber,
        title: validatedData.title,
        content: validatedData.content,
      };

      const createdPost = await createPost(newPost);

      console.log('Dados do post:', createdPost);

      handleNavigate('/');
    } catch (error) {
      console.error('Erro de validação:', error);
      if (error instanceof ZodError) {
        const fieldErrors: Record<string, string> = {};
        error.errors.forEach(err => {
          if (err.path) {
            fieldErrors[err.path.join('.')] = err.message;
          }
        });
        setFormErrors(fieldErrors);
      }
    }
  });

  const weeks = [
    { id: 1, title: 'Week 1' },
    { id: 2, title: 'Week 2' },
    { id: 3, title: 'Week 3' },
    { id: 4, title: 'Week 4' },
    { id: 5, title: 'Week 5' },
    { id: 6, title: 'Week 6' },
    { id: 7, title: 'Week 7' },
    { id: 8, title: 'Week 8' },
    { id: 9, title: 'Week 9' },
    { id: 10, title: 'Week 10' },
    { id: 11, title: 'Week 11' },
    { id: 12, title: 'Week 12' },
    { id: 13, title: 'Week 13' },
    { id: 14, title: 'Week 14' },
    { id: 15, title: 'Week 15' },
    { id: 16, title: 'Week 16' },
    { id: 17, title: 'Week 17' },
    { id: 18, title: 'Week 18' },
    { id: 19, title: 'Week 19' },
    { id: 20, title: 'Week 20' },
  ];

  return (
    <Container>
      <h1>New topic</h1>
      <NewTopicForm onSubmit={onSubmit}>
        <div>
          <label htmlFor="week">Category</label>
          <select id="week" {...register("week")} defaultValue={""}>
            <option value="" disabled hidden>Choose the week number of the topic</option>
            {weeks.map(week => (
              <option key={week.id} value={week.id}>{week.title}</option>
            ))}
          </select>
          {formErrors.week && <span className='error-message'>{formErrors.week}</span>}
        </div>

        <div>
          <label htmlFor="title">Title</label>
          <input type="text" id="title" {...register("title")} />
          {formErrors.title && <span className='error-message'>{formErrors.title}</span>}
        </div>

        <div>
          <label htmlFor="content">Content</label>
          <textarea id="content" {...register("content")} />
          {formErrors.content && <span className='error-message'>{formErrors.content}</span>}
        </div>

        <FormActions>
          <Button variant="transparent" onClick={() => handleNavigate('/')}>Cancel</Button>
          <Button type="submit" variant="confirm">Create topic</Button>
        </FormActions>
      </NewTopicForm>
    </Container>
  );
}

export default NewTopicPage;