import { getRepository, Repository } from "typeorm";

import { ICreateUsersTokensDTO } from "@modules/accounts/dtos/ICreateUsersTokensDTO";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";

import { UserTokens } from "../entities/UserTokens";

class UsersTokensRepository implements IUsersTokensRepository {
  private repository: Repository<UserTokens>;

  constructor() {
    this.repository = getRepository(UserTokens);
  }

  async create({
    expires_date,
    refresh_token,
    user_id,
  }: ICreateUsersTokensDTO): Promise<UserTokens> {
    const userTokens = this.repository.create({
      expires_date,
      refresh_token,
      user_id,
    });

    await this.repository.save(userTokens);

    return userTokens;
  }
}

export { UsersTokensRepository };
