import { Todo } from '../app/entities';
import { dataSource } from '../db';

export const createTodoSchema = {
  additionalProperties: false,
  properties: {
    text: { type: 'string' },
  },
  required: ['text'],
  type: 'object',
};

export async function main(args: { text: string }) {
  await dataSource.initialize();

  try {
    const todo = new Todo();
    todo.text = args.text;

    console.log(await todo.save());
  } catch (error: any) {
    console.log(error.message);
  } finally {
    await dataSource.destroy();
  }
}
