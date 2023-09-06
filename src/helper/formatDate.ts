export const formatDate = (date: string) => {
	const dateObj = new Date(date)
	const day =
		dateObj.getDate() < 10 ? `0${dateObj.getDate()}` : dateObj.getDate()
	const month =
		dateObj.getMonth() + 1 < 10
			? `0${dateObj.getMonth() + 1}`
			: dateObj.getMonth() + 1
	const year = dateObj.getFullYear()
	const hour =
		dateObj.getHours() < 10 ? `0${dateObj.getHours()}` : dateObj.getHours()
	const minute = dateObj.getMinutes()
	return `${day}/${month}/${year} ${hour}:${minute}`
}
