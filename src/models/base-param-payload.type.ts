import { PAGE_SIZE_OPTIONS } from "../constants/common.constant";

export type AllowedPageLimit = typeof PAGE_SIZE_OPTIONS;

export type PageLimit = AllowedPageLimit[number];

export type PagingParam = {
  page: number;
  limit: PageLimit;
};

export type SearchingParam = {
  [key: string]: string;
};

export type SortingParam = {
  order?: 'asc' | 'desc';
  sort?: string;
};

export type ListQueryParams = PagingParam & SearchingParam & SortingParam;

export type PagingData = PagingParam & {
  total: number;
};