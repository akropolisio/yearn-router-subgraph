import { Address, BigInt } from '@graphprotocol/graph-ts';
import { Vault } from '../../generated/schema';

export function createOrLoadVault(vaultAddress: Address): Vault {
  const id = vaultAddress.toHex();
  let vault = Vault.load(id);

  if (!vault) {
    vault = new Vault(id);
    vault.totalSharesTVL = BigInt.zero();
    vault.usersCount = 0;
    vault.save();
  }

  return vault as Vault;
}
