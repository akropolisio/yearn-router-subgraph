import { BigInt } from '@graphprotocol/graph-ts';
import { Transfer } from '../../generated/templates/Vault/Vault';
import { createOrLoadVault, createOrLoadVaultUser } from '../entities';
import { ZERO_ADDRESS, min } from '../utils';

export function handleTransfer(event: Transfer) {
  const { sender: userAddress, value: shares, receiver } = event.params;
  const vaultAddress = event.address;

  if (userAddress.toHex() == ZERO_ADDRESS) {
    return;
  }

  const vault = createOrLoadVault(vaultAddress);
  const vaultUser = createOrLoadVaultUser(vaultAddress, userAddress);

  vault.totalSharesTVL = min(vault.totalSharesTVL.minus(shares), BigInt.zero());
  vaultUser.sharesTVL = min(vaultUser.sharesTVL.minus(shares), BigInt.zero());

  if (vaultUser.sharesTVL.isZero() && receiver.toHex() == ZERO_ADDRESS) {
    vault.usersCount -= 1;
  }

  vault.save();
  vaultUser.save();
}
