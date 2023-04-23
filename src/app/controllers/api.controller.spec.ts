// std
import { ok, strictEqual } from 'assert';

// 3p
import {
  Context,
  createController,
  getHttpMethod,
  getPath,
  isHttpResponseOK,
} from '@foal/core';

// App
import { DataSource } from 'typeorm';
import { createDataSource } from '../../db';
import { Todo } from '../entities';
import { ApiController } from './api.controller';

describe('ApiController', () => {
  describe('has a "index" method that', () => {
    it('should handle requests at GET /.', () => {
      strictEqual(getHttpMethod(ApiController, 'index'), 'GET');
      strictEqual(getPath(ApiController, 'index'), '/');
    });

    it('should return a HttpResponseOK.', () => {
      const controller = createController(ApiController);
      const ctx = new Context({});

      const response = controller.index(ctx);

      if (!isHttpResponseOK(response)) {
        throw new Error(
          'The response should be an instance of HttpResponseOK.'
        );
      }

      strictEqual(response.body, 'Hello world!');
    });
  });
});

describe('Api Controller 2', () => {
  let dataSource: DataSource;
  let controller: ApiController;

  before(async () => {
    dataSource = createDataSource();
    await dataSource.initialize();
  });

  after(async () => {
    if (dataSource) {
      await dataSource.destroy();
    }
  });

  beforeEach(() => (controller = createController(ApiController)));

  describe(' has a "getTodos" method that', () => {
    it('should handle requests at GET /todos.', () => {
      strictEqual(getHttpMethod(ApiController, 'getTodos'), 'GET');
      strictEqual(getPath(ApiController, 'getTodos'), '/todos');
    });

    it('should return an HttpResponseOk.', async () => {
      const todo1 = new Todo();
      todo1.text = 'Todo 1';

      const todo2 = new Todo();
      todo2.text = 'Todo 2';

      await Todo.save([todo1, todo2]);

      const context = new Context({});
      const response = await controller.getTodos(context);

      ok(
        isHttpResponseOK(response),
        'response should be an instance of HttpResponseOk.'
      );

      const body = response.body;

      ok(Array.isArray(body), 'The body of the response should be an array.');
      strictEqual(body[0].text, 'Todo 1');
      strictEqual(body[1].text, 'Todo 2');
    });
  });
});
