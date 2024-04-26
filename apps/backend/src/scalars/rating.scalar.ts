import { GraphQLScalarType, Kind } from 'graphql';
import { scalarValidate } from 'src/utils/scalarValidate';

export const RatingScalar = new GraphQLScalarType({
  name: 'RatingScalar',
  description: 'Custom scalar for like or dislike',
  serialize: (value) => scalarValidate(value),
  parseValue: (value) => scalarValidate(value),
  parseLiteral: (ast) =>
    scalarValidate(
      ast.kind === Kind.STRING ? ast.value : null,
      ['like', 'dislike'],
      'Invalid rating type',
    ),
});
