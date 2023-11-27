export interface ProvinceInterface {
	code: number
	codename: string
	districts: any[]
	division_type: string
	name: string
	phone_code: number
}

export interface DistrictInterface {
	code: number
	codename: string
	division_type: string
	name: string
	province_code: number
	wards: any[]
}

export interface WardInterface {
	name: string
	code: number
	division_type: string
	codename: string
	district_code: number
}
