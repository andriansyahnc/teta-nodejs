abstract class BaseRepository<T, U> {
    abstract findByProperties(data: U): Promise<T[]>;
    abstract create(data: T): Promise<T>;
    abstract updateBySlug(slug: string, data: Partial<T>): Promise<T>;
    abstract delete(slug: string): Promise<void>;
}

export default BaseRepository;