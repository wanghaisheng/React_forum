import Button from "../../components/Button";
import { Container, FormActions, NewTopicForm } from "./styles";

import { useNavigate } from 'react-router-dom'

function NewTopicPage() {
  const navigate = useNavigate();

  function handleNavigate(path: string) {
    navigate(path);
  }

  return (
    <Container>
      <h1>New topic</h1>
      <NewTopicForm>

        <div>
          <label htmlFor="category">Category</label>
          <select id="category" name="category" defaultValue={""}>
            <option value="" disabled hidden>Choose one category</option>
            <option value="1">Category 1</option>
            <option value="2">Category 2</option>
            <option value="3">Category 3</option>
          </select>
        </div>

        <div>
          <label htmlFor="title">Title</label>
          <input type="text" id="title" name="title" />
        </div>

        <div>
          <label htmlFor="content">content</label>
          <textarea id="content" name="content" />
        </div>

        <FormActions>
          <Button variant="transparent" onClick={() => handleNavigate('/')}>Cancel</Button>
          <Button variant="confirm" onClick={() => handleNavigate('/')}>Create topic</Button>
        </FormActions>
      </NewTopicForm>
    </Container>
  )
}

export default NewTopicPage;
