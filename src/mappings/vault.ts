import { BigInt } from '@graphprotocol/graph-ts';
import { Transfer } from '../../generated/templates/Vault/Vault';
import { createOrLoadVault, createOrLoadVaultUser, createUser } from '../entities';
import { ZERO_ADDRESS, max } from '../utils';

export function handleTransfer(event: Transfer) {
  const { sender: userAddress, value: shares, receiver: receiverAddress } = event.params;
  const vaultAddress = event.address;

  if (userAddress.toHex() == ZERO_ADDRESS) {
    return;
  }

  createUser(userAddress);
  const vault = createOrLoadVault(vaultAddress);
  const vaultUser = createOrLoadVaultUser(vaultAddress, userAddress);

  vaultUser.sharesTVL = max(vaultUser.sharesTVL.minus(shares), BigInt.zero());

  if (vaultUser.sharesTVL.isZero()) {
    vault.usersCount -= 1;
  }

  if (receiverAddress.toHex() == ZERO_ADDRESS) {
    vault.totalSharesTVL = max(vault.totalSharesTVL.minus(shares), BigInt.zero());
  } else {
    createUser(receiverAddress);
    const newVaultUser = createOrLoadVaultUser(vaultAddress, receiverAddress);
    if (newVaultUser.sharesTVL.isZero()) {
      vault.usersCount += 1;
    }
    newVaultUser.sharesTVL = newVaultUser.sharesTVL.plus(shares);
    newVaultUser.save();
  }

  vault.save();
  vaultUser.save();
}

