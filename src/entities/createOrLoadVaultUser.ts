import { Address, BigInt } from '@graphprotocol/graph-ts';
import { VaultUser } from '../../generated/schema';
import { getVaultUserID } from '../utils';

export function createOrLoadVaultUser(vaultAddress: Address, userAddress: Address): VaultUser {
  const id = getVaultUserID(vaultAddress, userAddress);
  let vaultUser = VaultUser.load(id);

  if (!vaultUser) {
    vaultUser = new VaultUser(id);
    vaultUser.sharesTVL = BigInt.zero();
    vaultUser.vault = vaultAddress.toHex();
    vaultUser.user = userAddress.toHex();
    vaultUser.save();
  }

  return vaultUser as VaultUser;
}
