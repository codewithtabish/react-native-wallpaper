import axios from "axios"

const API_KEY = "43631310-d68b96cf3fd0acd74f5306b77"
const api_url = `https://pixabay.com/api/?key=${API_KEY}`

const formatUrl = (params: any) => {
  let url = api_url + "&per_page=25&safesearch=true&editors_choice=true"
  if (!params) return url
  const paramsKey = Object.keys(params)
  paramsKey.map((key) => {
    let value = key === "q" ? encodeURIComponent(params[key]) : params[key]
    url += `&${key}=${value}`
  })
  console.log(url)
  return url
}

export const apiCall = async (params) => {
  try {
    const response = await axios.get(formatUrl(params))
    return { success: true, data: response.data }
  } catch (error) {
    console.log("The error is", error.msg)
    return { success: false, error: error.msg }
  }
}

/**
 * Encodes the search query parameter (q) to ensure it is properly formatted
 * for inclusion in the API's URL or internal processing. This helps maintain
 * the integrity of the URL and prevents issues with special characters.
 *
 * @param {Express.Request} req - The incoming HTTP request object.
 * @param {Express.Response} res - The HTTP response object used to send the
 *                                 response back to the client.
 */
