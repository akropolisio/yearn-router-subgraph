import { Address } from '@graphprotocol/graph-ts';

export function getVaultUserID(vaultAddress: Address, userAddress: Address): string {
  return `${vaultAddress.toHex()}-${userAddress.toHex()}`;
}