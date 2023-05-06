export const OrderSchema = {
  name: 'Order',
  properties: {
    _id: 'string',
    name: 'string',
    createdAt: 'date',
  },
  primaryKey: '_id',
};
