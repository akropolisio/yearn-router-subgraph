import { Deposit, Withdraw } from '../../generated/YearnRouter/YearnRouter';
import { createEventLog } from '../entities/createEventLog';
import { EventType } from '../utils';
import { createOrLoadVault, createOrLoadVaultUser, createUser } from '../entities';

export function handleDeposit(event: Deposit): void {
  const { vault: vaultAddress, recipient: userAddress, shares } = event.params;

  createUser(userAddress);
  const vault = createOrLoadVault(vaultAddress);
  const vaultUser = createOrLoadVaultUser(vaultAddress, userAddress);

  vault.totalSharesTVL = vault.totalSharesTVL.plus(shares);
  if (vaultUser.sharesTVL.isZero()) {
    vault.usersCount += 1;
  }
  vaultUser.sharesTVL = vaultUser.sharesTVL.plus(shares);

  vault.save();
  vaultUser.save();

  createEventLog(event, vaultAddress, userAddress, EventType.DEPOSIT);
}

export function handleWithdraw(event: Withdraw): void {
  const { vault: vaultID } = event.params;
  const userID = event.transaction.from;

  createEventLog(event, vaultID, userID, EventType.WITHDRAW);
}
