import { Address, BigInt } from '@graphprotocol/graph-ts';
import { Vault } from '../../generated/schema';

export function createOrLoadVault(vaultAddress: Address): Vault {
  let vault = Vault.load(vaultAddress.toHex());

  if (!vault) {
    vault = new Vault(vaultAddress.toHex());
    vault.totalSharesTVL = BigInt.zero();
    vault.usersCount = 0;
    vault.save();
  }

  return vault as Vault;
}
