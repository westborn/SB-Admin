{/* prettier-ignore */}
const WEBAPP_API_URL =
	'https://script.google.com/macros/s/AKfycbyorA5KdrqYx5Dfmy67S3Wa4K0tiPkrZsFv0gMrOXnZiq-L3v6y_Qr1r3cPYKT1wYO2mw/exec'

export async function sendToServer(payload) {
	try {
		const response = await fetch(WEBAPP_API_URL, {
			method: 'POST',
			headers: { 'Content-Type': 'text/plain' },
			body: JSON.stringify(payload)
		})
		const res = await response.json()
		return res
	} catch (err) {
		console.log({ err })
		return {
			result: 'error',
			data: err.message
		}
	}
}

function getIdFromUrl(url) {
	return url.match(/[-\w]{25,}(?!.*[-\w]{25,})/)
}
export function getViewURL(url) {
	return `https://drive.google.com/uc?export=view&id=${getIdFromUrl(url)}`
}

// from https://stackoverflow.com/questions/46155/how-can-i-validate-an-email-address-in-javascript
export function validateEmail(inputText) {
	var mailformat =
		/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
	if (inputText.match(mailformat)) {
		return true
	} else return false
}
