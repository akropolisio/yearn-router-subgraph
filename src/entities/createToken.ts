import { Address } from '@graphprotocol/graph-ts';

import { Token } from '../../generated/schema';
import { ERC20Detailed } from '../../generated/templates/ERC20Detailed/ERC20Detailed';

export function createToken(address: Address): Token {
  const token = new Token(address.toHex());

  const contract = ERC20Detailed.bind(address);

  token.name = contract.name();
  token.decimals = contract.decimals();
  token.symbol = contract.symbol();

  token.save();

  return token;
}
