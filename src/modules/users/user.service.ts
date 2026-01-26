import { UserRepository } from "./user.repository.js";
import { AppError } from "../../shared/errors/AppError.js";

export class UserService {
    private userRepo: UserRepository;

    constructor() {
        this.userRepo = new UserRepository();
    }

    async getUserById(userId: string) {
        const user = await this.userRepo.findById(userId);

        if (!user) {
            throw new AppError("User not found", 404, "USER_NOT_FOUND");
        }

        return user;
    }
}