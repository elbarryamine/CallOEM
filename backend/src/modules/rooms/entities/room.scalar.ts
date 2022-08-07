import { GraphQLScalarType } from 'graphql';

function validate(roomtype: unknown): string {
  if (
    typeof roomtype !== 'string' ||
    (roomtype !== 'private' && roomtype !== 'public')
  ) {
    throw new Error('invalid roomtype : must be private or public');
  }
  return roomtype;
}

export const RoomtypeScalar = new GraphQLScalarType({
  name: 'Roomtype',
  description:
    'A Scalar Type for Roomtype and must be either "public" or "private"',
  serialize: (value) => validate(value),
  parseValue: (value) => validate(value),
});
