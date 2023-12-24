'use client'
import React, { useEffect } from 'react'

const DialogFlow = () => {
	useEffect(() => {
		const script = document.createElement('script')
		script.src =
			'https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1'
		script.async = true
		document.head.appendChild(script)

		return () => {
			// Cleanup script when component unmounts
			document.head.removeChild(script)
		}
	}, [])
	return (
		<df-messenger
			intent='welcome'
			chat-title='Glow&Grace Support'
			agent-id='99261190-f4c4-441b-a88e-b83ec0b0427a'
			language-code='en'
		></df-messenger>
	)
}

export default DialogFlow
