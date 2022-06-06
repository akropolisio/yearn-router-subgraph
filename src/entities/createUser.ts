import { Address } from '@graphprotocol/graph-ts';
import { User } from '../../generated/schema';

export function createUser(userAddress: Address) {
  const user = new User(userAddress.toHex());
  user.save();

  return user;
}