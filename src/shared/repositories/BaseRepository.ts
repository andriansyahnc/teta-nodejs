abstract class BaseRepository<T, U> {
    abstract findByProperties(data: U): Promise<T[]>;
    abstract create(data: T): Promise<T>;
    abstract updateBySlug(slug: string, data: Partial<T>): Promise<T>;
    abstract delete(id: number): Promise<T>;
}

export default BaseRepository;