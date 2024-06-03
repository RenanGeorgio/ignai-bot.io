import Cookies from 'js-cookie'

export const baseUrl = process.env.REACT_APP_CHAT_HOST;

interface ApiResponse<T> {
  error?: boolean
  message?: string
  data?: T
}

export const postRequest = async <T>(
  url: string,
  body: unknown
): Promise<ApiResponse<T>> => {
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

  return { data }
}

export const getRequest = async <T>(url: string): Promise<ApiResponse<T>> => {
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

  return { data }
}

export const putRequest = async <T>(
  url: string,
  body: unknown
): Promise<ApiResponse<T>> => {
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

  return { data }
}

export const deleteRequest = async <T>(
  url: string
): Promise<ApiResponse<T>> => {
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

  return { data }
}
