import Cookies from 'js-cookie'

export const baseUrl = 'http:/localhost:7000'

export const postRequest = async (url: string, body: any) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${Cookies.get('token')}`,
      'ngrok-skip-browser-warning': '69420',
    },
    body: JSON.stringify(body),
  })

  const data = await response.json()

  if (!response.ok) {
    let message = 'Ocorreu um erro...'
    if (data?.message) {
      message = data.message
    }

    return { error: true, message }
  }

  return data
}

export const getRequest = async (url: string) => {
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${Cookies.get('token')}`,
      'ngrok-skip-browser-warning': '69420',
    },
  })

  const data = await response.json()

  if (!response.ok) {
    let message = 'Ocorreu um erro...'
    if (data?.message) {
      message = data.message
    }

    return { error: true, message }
  }

  return data
}

export const putRequest = async (url: string, body: any) => {
  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${Cookies.get('token')}`,
      'ngrok-skip-browser-warning': '69420',
    },
    body: JSON.stringify(body),
  })

  const data = await response.json()

  if (!response.ok) {
    let message = 'Ocorreu um erro...'
    if (data?.message) {
      message = data.message
    }

    return { error: true, message }
  }

  return data
}

export const deleteRequest = async (url: string) => {
  const response = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${Cookies.get('token')}`,
      'ngrok-skip-browser-warning': '69420',
    },
  })

  const data = await response.json()

  if (!response.ok) {
    let message = 'Ocorreu um erro...'
    if (data?.message) {
      message = data.message
    }

    return { error: true, message }
  }

  return data
}
