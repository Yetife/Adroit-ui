 export const isOnline = async () => {
  if (!window.navigator.onLine) return false

  const url = new URL(window.location)

  // random value to prevent cached responses
  url.searchParams.set('rand', getRandomString())

  try {
    const response = await fetch(
      url.toString(),
      {method: 'HEAD'},
    )
    return response.ok
  } catch {
    return false
  }
}

function getRandomString () {
  return Math.random().toString(36).substring(2, 15)
}


export default isOnline()