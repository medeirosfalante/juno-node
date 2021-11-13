export interface ErrorResponse {
  timestamp: string
  status: Number
  error: string
  details: ErrorDetails[]
  path: string
}

export interface ErrorDetails {
  message: string
  errorCode: string
  error: string
}
