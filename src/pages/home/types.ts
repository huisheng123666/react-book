import { IBookInfo } from "@/types/book";

export interface IRanking {
  id: string;
  title: string;
  books: IBookInfo[];
}

export interface IBanner {
  src: string;
  alt: string;
}

export interface IHomeData {
  banner: IBanner[];
  limited: IBookInfo[];
  popular: IBookInfo[];
  ranking: IRanking[];
  recommend: IBookInfo[];
}
