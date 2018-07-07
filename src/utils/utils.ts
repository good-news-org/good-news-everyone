type HasId = {
  id: string;
};

export const addUnique = <T>(items: Array<T & HasId>, item: T & HasId): Array<T> =>
  items.some(x => x.id === item.id) ? items : [...items, item];
