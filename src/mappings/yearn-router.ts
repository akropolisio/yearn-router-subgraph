import { Deposit, Withdraw } from '../../generated/YearnRouter/YearnRouter';
import { createEventLog } from '../entities/createEventLog';
import { createOrLoadVault, createOrLoadVaultUser, createUser } from '../entities';

export function handleDeposit(event: Deposit): void {
  const vaultAddress = event.params.vault;
  const userAddress = event.params.recipient;
  const shares = event.params.shares;

  createUser(userAddress);
  const vault = createOrLoadVault(vaultAddress);
  const vaultUser = createOrLoadVaultUser(vaultAddress, userAddress);

  vault.sharesTVL = vault.sharesTVL.plus(shares);
  if (vaultUser.sharesTVL.isZero()) {
    vault.usersCount += 1;
  }
  vaultUser.sharesTVL = vaultUser.sharesTVL.plus(shares);

  vault.save();
  vaultUser.save();

  createEventLog(event, vaultAddress, userAddress, 'YEARN_ROUTER_DEPOSIT');
}

export function handleWithdraw(event: Withdraw): void {
  const vaultAddress = event.params.vault;
  const userAddress = event.transaction.from;

  createEventLog(event, vaultAddress, userAddress, 'YEARN_ROUTER_WITHDRAW');
}
