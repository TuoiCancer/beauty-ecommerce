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

interface IAdminProductPageProps {
  lang: Locale,
  dictionary: { [key: string]: any }
}

const AdminProductPage: FunctionComponent<IAdminProductPageProps> = ({ lang, dictionary }) => {
  const [listProduct, setListProduct] = useState<any>([]);
  const [paginationMeta, setPaginationMeta] = useState({
		pageCount: 0, // tổng số page
		page: DEFAULT_PAGE,
		limit: DEFAULT_PAGE_LIMIT,
		itemCount: 0 // tổng số product get được từ api
	})

  const {
		isLoading: gettingProducts,
		mutate: getProductByPage,
		data: dataGetListProduct
	} = useGetProductByPage();

  const { UserSlice } = useStore();

  useEffect(() => {
    getProductByPage({
      page: DEFAULT_PAGE,
      limit: DEFAULT_PAGE_LIMIT,
      sort: DEFAULT_SORT.SORT_BY,
      order: DEFAULT_SORT.SORT_TYPE,
      // product_shop: 'The Ordinary',
      // product_category: 'Body',
      user_id: UserSlice.user?.id,
      // search_key: filterOptions.searchKey
    })
	}, []);

  useEffect(() => {
		if (dataGetListProduct !== undefined) {
			if (dataGetListProduct?.result?.length === 0) {
				setListProduct([])
				setPaginationMeta({
					pageCount: 0,
					page: DEFAULT_PAGE,
					limit: DEFAULT_PAGE_LIMIT,
					itemCount: 0
				})
				return;
			}
			setPaginationMeta(dataGetListProduct.pageMetaDto);

			const oldData = listProduct || []
			const newData = [...dataGetListProduct?.result, ...oldData]

			const dataFilter = newData.filter((item, index) => {
				return newData.findIndex(item2 => item2.page === item.page) === index
			});
      
			// sắp xếp từ bé đến lớn của page
			dataFilter.sort((a, b) => {
				return a.page - b.page
			})

			setListProduct(dataFilter)
		}
	}, [dataGetListProduct])
  

  return (
    // <Box sx={{ width: 'calc(100% - 268px)' }}>
      <BaseDataTable
        total={paginationMeta.itemCount}
        paging={{ page: paginationMeta.page, limit: paginationMeta.limit, total: paginationMeta.itemCount }}
        configColumn={productTableColumn}
        data={listProduct[0]?.data ?? []}
      />
    // </Box>
  )
};

export default AdminProductPage;