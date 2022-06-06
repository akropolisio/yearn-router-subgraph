import { BigInt } from '@graphprotocol/graph-ts';

export function max(...args: BigInt[]): BigInt {
  return args.sort(BigInt.compare)[args.length - 1];
}
