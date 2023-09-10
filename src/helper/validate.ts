export const validateSignupForm = ({
	email,
	password,
	fullname,
	phoneNumber
}: {
	email: string
	password: string
	fullname: string
	phoneNumber: string
}) => {
	const errors: any = {}

	//regex email must have contain @ and .com
	const regex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/
	if (!email) {
		errors.msg = 'Email is required'
		return errors
	} else if (!regex.test(email)) {
		errors.msg = 'Email must contain @ and .com'
		return errors
	}

	// regex phone number must have contain 10 number , start with 0 or +84 or 84 and not contain any character
	const regexPhone = /(0|\+84|84)[0-9]{9}/
	if (!phoneNumber) {
		errors.msg = 'Phone number is required'
		return errors
	} else if (!regexPhone.test(phoneNumber)) {
		errors.msg = 'Phone number is invalid'
		return errors
	}

	if (!fullname) {
		errors.msg = 'Fullname is required'
		return errors
	}
	return errors
}

export const validateSigninForm = ({
	email,
	password
}: {
	email: string
	password: string
}) => {
	const errors: any = {}
	//regex email must have contain @ and .com
	const regex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/
	if (!email) {
		errors.msg = 'Email is required'
		return errors
	} else if (!regex.test(email)) {
		errors.msg = 'Email must contain @ and .com'
		return errors
	}

	if (!password) {
		errors.msg = 'Password is required'
		return errors
	}
}
