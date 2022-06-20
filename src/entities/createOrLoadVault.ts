import { Address, BigInt } from '@graphprotocol/graph-ts';
import { Vault } from '../../generated/schema';
import { Vault as VaultTemplate } from '../../generated/templates';
import { Vault as VaultContract } from '../../generated/templates/Vault/Vault';
import { createToken } from './createToken';

export function createOrLoadVault(vaultAddress: Address): Vault {
  const id = vaultAddress.toHex();
  let vault = Vault.load(id);

  if (!vault) {
    VaultTemplate.create(vaultAddress);
    const contract = VaultContract.bind(vaultAddress);

    vault = new Vault(id);
    vault.sharesTVL = BigInt.zero();
    vault.usersCount = 0;
    vault.depositToken = createToken(contract.token()).id;
    vault.save();
  }

  return vault as Vault;
}
