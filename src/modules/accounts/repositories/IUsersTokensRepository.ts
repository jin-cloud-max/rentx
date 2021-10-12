import { ICreateUsersTokensDTO } from "../dtos/ICreateUsersTokensDTO";
import { UserTokens } from "../infra/typeorm/entities/UserTokens";

interface IUsersTokensRepository {
  create(data: ICreateUsersTokensDTO): Promise<UserTokens>;
}

export { IUsersTokensRepository };
