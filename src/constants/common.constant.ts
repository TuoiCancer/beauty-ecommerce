import { PageLimit } from '../models/base-param-payload.type'

export const PAGE_SIZE_OPTIONS = [5, 10, 25, 50, 100]

export const DEFAULT_PAGE_LIMIT: PageLimit = 10

export const DEFAULT_PAGE = 1

export const DEFAULT_SORT = {
	SORT_TYPE: 'DESC',
	SORT_BY: 'createdAt'
}
