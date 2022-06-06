import { Address } from '@graphprotocol/graph-ts';
import { User } from '../../generated/schema';

export function createUser(userAddress: Address): User {
  const user = new User(userAddress.toHex());
  user.save();

  return user;
}