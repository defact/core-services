import * as td from 'testdouble';
import * as assert from 'assert';
import UsersController from './users';

const replace = (path: string) => {
  return new (td.constructor(td.replace(path).default));
};

describe('UsersController', () => {
  beforeEach(async () => {
    this.finder = replace('../services/find');
    this.editor = replace('../services/edit');

    this.controller = new UsersController(this.finder, this.editor);
  });

  afterEach(td.reset);

  describe('find', () => {
    it('should return an array of users', async () => {
      const result = ['test'];
      td.when(this.finder.find()).thenResolve(result);

      assert.deepEqual(await this.controller.find(), { users: result });
    });
  });
});
