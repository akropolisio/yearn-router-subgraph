import { Address } from '@graphprotocol/graph-ts';
import { VaultUser } from '../../generated/schema';
import { getVaultUserID } from '../utils';

export function loadVaultUser(vaultAddress: Address, userAddress: Address): VaultUser | null {
  const id = getVaultUserID(vaultAddress, userAddress);
  const vaultUser = VaultUser.load(id);

  return vaultUser;
}
