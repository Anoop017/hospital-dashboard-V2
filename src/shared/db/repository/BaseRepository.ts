import { Model, Document } from "mongoose";

export abstract class BaseRepository<T extends Document> {
    protected model: Model<T>;

    constructor(model: Model<T>) {
        this.model = model;
    }

    async findById(id: string): Promise<T | null> {
        return this.model.findById(id).exec();
    }

    async create(data: Partial<T>): Promise<T> {
        return this.model.create(data);
    }

    async updateById(id: string, data: Partial<T>): Promise<T | null> {
        return this.model.findByIdAndUpdate(id, data, { new: true }).exec();
    }

    async deleteById(id: string): Promise<T | null> {
        return this.model.findByIdAndDelete(id).exec();
    }
}