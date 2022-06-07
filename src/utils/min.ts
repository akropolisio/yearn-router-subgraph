import { BigInt } from '@graphprotocol/graph-ts';

export function min(a: BigInt, b: BigInt): BigInt {
  return b.lt(a) ? b : a;
}
