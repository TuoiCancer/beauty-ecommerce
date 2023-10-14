'use client'
import React from 'react'

const ComponentForTest = ({ dictionary }: { dictionary: any }) => {
	return <div>{dictionary['welcome'].helloWorld}</div>
}

export default ComponentForTest
