'use client';

import React, { FunctionComponent, useEffect, useState } from "react";
import { Locale } from "../../../../../i18n-config";
import { Box } from "@mui/material";
import BaseDataTable from "@/components/base/BaseDataTable";
import { productTableColumn } from "@/config/config-product-data-table";
import { IFilterOption } from "@/utils/filterOption.interface";
import {useGetAdminProduct, useGetProductByPage} from "@/service/react-query/product.query";
import { useStore } from "@/store";
import { DEFAULT_PAGE, DEFAULT_PAGE_LIMIT, DEFAULT_SORT } from "@/constants/common.constant";
import {PagingParam} from "@/models/base-param-payload.type";
import {useSearchParams} from "next/navigation";
import ProgressLoading from "@/components/base/ProgressLoading";

interface IAdminProductPageProps {
  lang: Locale,
  dictionary: { [key: string]: any }
}

const AdminProductPage: FunctionComponent<IAdminProductPageProps> = ({ lang, dictionary }) => {
  const [paginationMeta, setPaginationMeta] = useState({
		pageCount: 0, // tổng số page
		page: DEFAULT_PAGE,
		limit: DEFAULT_PAGE_LIMIT,
		itemCount: 0 // tổng số product get được từ api
  });
	const [listProduct, setListProduct] = useState<any[]>([]);

	const { UserSlice } = useStore();

  const {
		isLoading: waitingGetListProduct,
		isFetched: fetchedGetListProduct,
		refetch: getListProduct,
		data: dataListProduct,
  } = useGetAdminProduct({
		page: paginationMeta.page ?? DEFAULT_PAGE,
		limit: paginationMeta.limit ?? DEFAULT_PAGE_LIMIT,
		sort: DEFAULT_SORT.SORT_BY,
		// product_shop: null,
		// product_category: filterOptions.category,
		// search_key: filterOptions.searchKey,
		user_id: UserSlice.user?.id,
		order: DEFAULT_SORT.SORT_TYPE
	});

	useEffect(() => {
		getListProduct();
		if (fetchedGetListProduct) {
			setPaginationMeta(dataListProduct.pageMetaDto);
			setListProduct(dataListProduct.listProduct);
		}
	}, [dataListProduct, paginationMeta]);

	const onPageChange = (page: number) => {
		setPaginationMeta(prev => ({...prev, page}));
	}

  return (
		<>
			<BaseDataTable
				total={paginationMeta?.pageCount}
				paging={{ page: paginationMeta?.page, limit: paginationMeta?.limit, total: paginationMeta?.itemCount }}
				configColumn={productTableColumn}
				data={listProduct}
				onPagingModelChange={onPageChange}
			/>
			{waitingGetListProduct && <ProgressLoading />}
		</>
  )
};

export default AdminProductPage;