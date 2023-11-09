'use client';

import React, { FunctionComponent, useEffect, useState } from "react";
import { Locale } from "../../../../../i18n-config";
import { Box } from "@mui/material";
import BaseDataTable from "@/components/base/BaseDataTable";
import { productTableColumn } from "@/config/config-product-data-table";
import { IFilterOption } from "@/utils/filterOption.interface";
import { useGetProductByPage } from "@/service/react-query/product.query";
import { useStore } from "@/store";
import { DEFAULT_PAGE, DEFAULT_PAGE_LIMIT, DEFAULT_SORT } from "@/constants/common.constant";
import {PagingParam} from "@/models/base-param-payload.type";

interface IAdminProductPageProps {
  lang: Locale,
  dictionary: { [key: string]: any }
}

const AdminProductPage: FunctionComponent<IAdminProductPageProps> = ({ lang, dictionary }) => {
  const [listProduct, setListProduct] = useState<{page: number, data: any[]}[]>([]);
  const [paginationMeta, setPaginationMeta] = useState({
		pageCount: 0, // tổng số page
		page: DEFAULT_PAGE,
		limit: DEFAULT_PAGE_LIMIT,
		itemCount: 0 // tổng số product get được từ api
  });

	const [listProductFinal, setListProducFinal] = useState<any[]>([]);

  const {
		isLoading: gettingProducts,
		mutate: getProductByPage,
		data: dataGetListProduct
  } = useGetProductByPage();

  const { UserSlice } = useStore();

	const getListProduct = (paging: PagingParam) => getProductByPage({
		page: paging.page ?? DEFAULT_PAGE,
		limit: paging.limit ?? DEFAULT_PAGE_LIMIT,
		sort: DEFAULT_SORT.SORT_BY,
		order: DEFAULT_SORT.SORT_TYPE,
		// product_shop: 'The Ordinary',
		// product_category: 'Body',
		user_id: UserSlice.user?.id,
		// search_key: filterOptions.searchKey
	});

	const handleListProduct = (data: any) => {
		const oldData = listProduct || []
		const newData = [...data?.result, ...oldData]

		const dataFilter = newData.filter((item, index) => {
			return newData.findIndex(item2 => item2.page === item.page) === index
		})
		dataFilter.sort((a, b) => a.page - b.page);
		setListProduct(dataFilter);
	}

  useEffect(() => {
    getListProduct({
			page: DEFAULT_PAGE,
			limit: DEFAULT_PAGE_LIMIT
		});
		if (dataGetListProduct) {
			setPaginationMeta(dataGetListProduct.pageMetaDto);
			handleListProduct(dataGetListProduct);
			setListProducFinal(dataGetListProduct?.result.find((item: any) => item.page === DEFAULT_PAGE)?.data ?? []);
		}
	}, []);

	const onPageChange = (page: number) => {
		const isExists = listProduct.some(item => item.page === page);
		if (isExists) {
			const data = listProduct.find(item => item.page === page)?.data ?? [];
			setListProducFinal(data);
		} else {
			getListProduct({ page, limit: paginationMeta.limit });
			handleListProduct(dataGetListProduct);
			setListProducFinal(prev => ([
				...prev,
				...dataGetListProduct?.result.find((item: any) => item.page === page)?.data ?? []
			]));
		}
	}

  return (
		<BaseDataTable
			total={paginationMeta.pageCount}
			paging={{ page: paginationMeta.page, limit: paginationMeta.limit, total: paginationMeta.itemCount }}
			configColumn={productTableColumn}
			data={listProductFinal}
			onPagingModelChange={onPageChange}
		/>
  )
};

export default AdminProductPage;