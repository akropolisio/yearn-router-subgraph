import { ethereum } from '@graphprotocol/graph-ts';

export function getEventLogID(event: ethereum.Event): string {
  return `${event.transaction.hash.toHex()}-${event.logIndex.toString()}`;
}
