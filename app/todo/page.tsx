import { CreateForm, TodoItem } from '@/features/todo';
import { readTodo } from '@/features/todo/services';

const TodoPage = async () => {
  const { data: todos } = await readTodo();
  return (
    <div className='space-y-10'>
      <CreateForm />
      <div className='space-y-4'>
        {todos?.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </div>
    </div>
  );
};

export default TodoPage;
