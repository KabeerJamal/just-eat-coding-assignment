/**
 * Instead of throwing generic errors, this class ensures all API-related failures
 * follow a consistent structure (message, status, type). 
 */
export class APIError extends Error {
  status: number;
  type: string;

  constructor(message: string, status: number, type: string = 'ServerError') {
    super(message);
    this.name = 'APIError';
    this.status = status;
    this.type = type;

    Object.setPrototypeOf(this, APIError.prototype);
  }
}
