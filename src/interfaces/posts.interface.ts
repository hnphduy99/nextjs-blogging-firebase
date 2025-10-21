export interface IPosts {
  id: string;
  hot: boolean;
  title: string;
  image: string;
  slug: string;
  category: string;
  author: string;
  status: number;
}

export interface ICategory {
  status: number;
  name: string;
  slug: string;
}
