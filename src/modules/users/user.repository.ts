import { BaseRepository } from "../../shared/db/repository/BaseRepository.js";
import { UserDocument, UserModel } from "./user.model.js";

export class UserRepository extends BaseRepository<UserDocument> {
    constructor() {
        super(UserModel);
    }


    async findByEmail(email: string): Promise<UserDocument | null> {
        return this.model.findOne({ email }).exec();
    }
}