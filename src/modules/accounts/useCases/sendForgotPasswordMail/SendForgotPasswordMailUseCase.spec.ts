import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { MailProviderInMemory } from "@shared/container/providers/MailProvider/in-memory/MailProviderInMemory";
import { AppError } from "@shared/errors/AppError";
import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let mailProvider: MailProviderInMemory;

describe("Send forgot mail", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    mailProvider = new MailProviderInMemory();

    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider,
      mailProvider
    );
  });

  it("should be able to send a forgot password mail to user", async () => {
    const sendMail = jest.spyOn(mailProvider, "sendEmail");

    await usersRepositoryInMemory.create({
      driver_license: "88888",
      email: "osmupi@arnijcac.pm",
      name: "Angel Banks",
      password: "1234",
    });

    await sendForgotPasswordMailUseCase.execute("osmupi@arnijcac.pm");

    expect(sendMail).toHaveBeenCalled();
  });

  it("should not be able to send an email if user doesn't exists", async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute("etoamo@neadoha.gp")
    ).rejects.toEqual(new AppError("User doesn't exists!"));
  });

  it("should be able to create an users token", async () => {
    const generateTokenMail = jest.spyOn(
      usersTokensRepositoryInMemory,
      "create"
    );

    usersRepositoryInMemory.create({
      driver_license: "3379076",
      email: "evu@hepbila.bi",
      name: "Elva Wright",
      password: "1234",
    });

    await sendForgotPasswordMailUseCase.execute("evu@hepbila.bi");

    expect(generateTokenMail).toHaveBeenCalled();
  });
});
