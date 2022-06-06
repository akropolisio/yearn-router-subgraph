import { Address, BigInt } from '@graphprotocol/graph-ts';
import { VaultUser } from '../../generated/schema';
import { getVaultUserID } from '../utils';

export function createOrLoadVaultUser(vaultAddress: Address, userAddress: Address): VaultUser {
  let vaultUser = VaultUser.load(vaultAddress.toHex());

  if (!vaultUser) {
    vaultUser = new VaultUser(getVaultUserID(vaultAddress, userAddress));
    vaultUser.sharesTVL = BigInt.zero();
    vaultUser.vault = vaultAddress.toHex();
    vaultUser.user = userAddress.toHex();
    vaultUser.save();
  }

  return vaultUser as VaultUser;
}
