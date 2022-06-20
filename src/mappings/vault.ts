import { BigInt } from '@graphprotocol/graph-ts';
import { Transfer } from '../../generated/templates/Vault/Vault';
import { createOrLoadVault, createOrLoadVaultUser, createUser, loadVaultUser } from '../entities';
import { ZERO_ADDRESS, min } from '../utils';

export function handleTransfer(event: Transfer): void {
  const userAddress = event.params.sender;
  const transferredShares = event.params.value;
  const receiverAddress = event.params.receiver;
  const vaultAddress = event.address;

  const vaultUser = loadVaultUser(vaultAddress, userAddress);
  const sharesTVLBeforeTransfer = vaultUser ? vaultUser.sharesTVL : BigInt.zero();

  if (userAddress.equals(ZERO_ADDRESS) || !vaultUser || sharesTVLBeforeTransfer.le(BigInt.zero())) {
    return;
  }

  const shares = min(transferredShares, sharesTVLBeforeTransfer);

  vaultUser.sharesTVL = sharesTVLBeforeTransfer.minus(shares);

  const vault = createOrLoadVault(vaultAddress);
  if (vaultUser.sharesTVL.isZero()) {
    vault.usersCount -= 1;
  }

  if (receiverAddress.equals(ZERO_ADDRESS)) {
    vault.sharesTVL = vault.sharesTVL.minus(shares);
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
