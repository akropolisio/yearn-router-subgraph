import { BigInt } from '@graphprotocol/graph-ts';

export function max(a: BigInt, b: BigInt): BigInt {
  return a.lt(b) ? b : a;
}
