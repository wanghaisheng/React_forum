import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z, ZodError } from 'zod';
import Button from "../../components/Button";
import { createPost } from '../../api';
import { Container, FormActions, NewTopicForm } from "./styles";
import { v4 } from 'uuid';
import { getWeeks } from '../../api'

const schema = z.object({
  week: z.string().min(1, 'Choose one category, please.'),
  title: z.string().min(5, 'Enter a title with at least 5 characters.').max(100, 'Title cannot exceed 100 characters.'),
  content: z.string().min(10, 'Enter content with at least 10 characters.').max(500, 'Content cannot exceed 500 characters.'),
});

interface Week {
  id: string;
  title: string;
  description: string;
}

function NewTopicPage() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [weeks, setWeeks] = useState<Week[]>([]);

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  const onSubmit = handleSubmit(async (data: Record<string, string>) => {
    try {
      const validatedData = schema.parse(data);
      const weekNumber = Number(validatedData.week);

      const newPost = {
        id: v4(),
        author: "John Doe",
        authorId: "1",
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

  useEffect(() => {
    const fetchWeeks = async () => {
      const weeks = await getWeeks();

      setWeeks(weeks);
    }

    fetchWeeks();
  }, []);

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