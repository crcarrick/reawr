import type { IIssue } from '../types'

interface IIssueResponse {
  readonly url: string
}

declare const API_URL: string

export async function fileIssue({
  email,
  title,
  body,
}: IIssue): Promise<IIssueResponse> {
  const response = await fetch(`${API_URL}/api/suggestion`, {
    body: JSON.stringify({ email, title, body }),
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
  })

  return response.json()
}
