'use client'
import Cookies from 'js-cookie'
import ky from 'ky'

export const baseUrl = process.env.NEXT_PUBLIC_CHATBOT_URL

export const api = ky.create({
  prefixUrl: baseUrl,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  hooks: {
    beforeRequest: [
      (request) => {
        request.headers.set('Authorization', 'Bearer ' + Cookies.get('token'))
      },
    ],
  },
})