export interface IService<T> {
  find(): Promise<T[]>;
  findOne(id: number): Promise<T | null>;
  create(data: Partial<T>): Promise<T>;
  update(id: number, data: Partial<T>): Promise<T | null>;
  remove(id: number): Promise<boolean>;
}
