import type { IIssue } from '../types'

interface IIssueResponse {
  readonly url: string
}

export async function fileIssue({
  title,
  body,
}: IIssue): Promise<IIssueResponse> {
  const response = await fetch('https://reawr-api.vercel.app/api/suggestion', {
    body: JSON.stringify({ title, body }),
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
  })

  return response.json()
}
