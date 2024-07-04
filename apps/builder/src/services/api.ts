'use client'
import Cookies from 'js-cookie'
import ky from 'ky'

export const baseUrl = process.env.NEXT_PUBLIC_CHATBOT_URL + "/v1"
const mockToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NWJiZTAzNTlmODRkYTNhZjYwMWYzNzMiLCJpYXQiOjE1MTYyMzkwMjJ9.EmsGYpuePCzpnBohrABY-9nIL8EY0EkDjA6gjVczuqs"

export const api = ky.create({
  prefixUrl: baseUrl,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  hooks: {
    beforeRequest: [
      (request) => {
        // request.headers.set('Authorization', 'Bearer ' + Cookies.get('token'))
        request.headers.set('Authorization', 'Bearer ' + mockToken)
      },
    ],
  },
})