import {
  GetTokensInputDTO,
  TokensResponseDTO,
  RefreshTokenInputDTO,
  CreateHashedTokensInputDTO,
} from '../dtos';

export type CreateTokenAdapter = {
  getTokens(params: GetTokensInputDTO): Promise<TokensResponseDTO>;
  refreshTokens(params: RefreshTokenInputDTO): Promise<TokensResponseDTO>;
  createHashedTokens(
    params: CreateHashedTokensInputDTO,
  ): Promise<TokensResponseDTO>;
};
