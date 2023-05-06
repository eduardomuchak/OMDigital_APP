import Realm from 'realm';
import { AuthSchema } from './schemas/AuthSchema';
import { OrderSchema } from './schemas/OrderSchema';

export const getRealm = async () =>
  await Realm.open({
    path: 'om-digital',
    schema: [OrderSchema, AuthSchema],
  });
