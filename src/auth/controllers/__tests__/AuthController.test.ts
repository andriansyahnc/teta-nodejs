import AuthController from "../AuthController";
import SignUpUsecase from "../../usecases/SignUpUsecase";
import LoginUsecase from "../../usecases/LoginUsecase";

describe('AuthController', () => {
    let controller: AuthController;

    beforeEach(() => {
        controller = new AuthController();
    });

    describe("SignUp", () => {
        it('should sign up successfully', async () => {
            const userData: any = {
                name: "andriansyah",
                password: "passcode"
            };

            const mockExecute = jest
                .spyOn(SignUpUsecase.prototype, "execute")
                .mockResolvedValueOnce(userData);

            const result = await controller.signUpUser(userData);

            expect(result).toEqual(userData);
            expect(mockExecute).toHaveBeenCalledWith(userData);
        })
    })

    describe("Login", () => {
        it('should log in successfully', async () => {
            const userData: any = {
                name: "andriansyah",
                password: "passcode"
            };

            const mockExecute = jest
                .spyOn(LoginUsecase.prototype, "execute")
                .mockResolvedValueOnce(userData);

            const result = await controller.logInUser(userData);

            expect(result).toEqual(userData);
            expect(mockExecute).toHaveBeenCalledWith(userData);
        })
    })
})