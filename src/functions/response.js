const handleResponse = (response) => {
    const successCodes = [200, 201]
    if (!successCodes.includes(response.status)) {
        throw new Error('Error response returned from API')
    }
    return response.json()
}

export default handleResponse