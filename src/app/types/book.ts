export interface IBook {
  id: number;
  title: string;
  author: string;
  year: number;
  pages: number;
  isFinished: boolean;
  isRemoved?: boolean;
}
