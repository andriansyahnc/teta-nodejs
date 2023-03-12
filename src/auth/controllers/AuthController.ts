import SignUpUsecase from "../usecases/SignUpUsecase";
import LoginUsecase from "../usecases/LoginUsecase";

export default class AuthController {

    async signUpUser(body: any) {
        const usecase = new SignUpUsecase();
        return usecase.execute(body);
    }

    async logInUser(body: any) {
        const usecase = new LoginUsecase();
        return usecase.execute(body);
    }
}