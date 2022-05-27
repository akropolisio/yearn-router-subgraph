import { BigInt } from '@graphprotocol/graph-ts';

export function min(...args: BigInt[]): BigInt {
  return args.sort(BigInt.compare)[0];
}
