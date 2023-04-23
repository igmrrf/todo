import { controller, IAppController } from '@foal/core';

import { ApiController, FirstController } from './controllers';

export class AppController implements IAppController {
  subControllers = [
    controller('/api', ApiController),
    controller('/first', FirstController),
  ];
}
