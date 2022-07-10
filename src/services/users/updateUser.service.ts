import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/AppError";
import { IUserupdate } from "../../interfaces/users";
import { hash, compare } from "bcryptjs";

const updateUSerService = async ({
  userId,
  password,
}: IUserupdate): Promise<boolean> => {
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOneBy({ id: userId });

  if (await compare(password, user!.password)) {
    throw new AppError("Inform a different password!");
  }

  const pwdHash = await hash(password, 10);

  await userRepository.update(user!.id, { password: pwdHash });

  return true;
};
export default updateUSerService;
