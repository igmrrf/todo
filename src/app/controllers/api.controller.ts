import {
  Context,
  Delete,
  Get,
  HttpResponseCreated,
  HttpResponseNoContent,
  HttpResponseNotFound,
  HttpResponseOK,
  Post,
  ValidateBody,
  ValidatePathParam,
} from '@foal/core';
import { createTodoSchema } from '../../scripts/create-todo';
import { Todo } from '../entities';

export class ApiController {
  @Get('/')
  index(ctx: Context) {
    return new HttpResponseOK('Hello world!');
  }

  @Get('/todos')
  async getTodos(ctx: Context) {
    const todos = await Todo.find();
    return new HttpResponseOK(todos);
  }

  @Post('/todos')
  @ValidateBody(createTodoSchema)
  async postTodos(ctx: Context) {
    const todo = new Todo();
    todo.text = ctx.request.body.text;
    await todo.save();
    return new HttpResponseCreated(todo);
  }

  @Delete('/todos/:id')
  @ValidatePathParam('id', { type: 'number' })
  async deleteTodo(ctx: Context) {
    const todo = await Todo.findOneBy({ id: ctx.request.params.id });
    if (!todo) {
      return new HttpResponseNotFound();
    }
    await todo.remove();
    return new HttpResponseNoContent();
  }
}
