import { ApiError } from '../../swagger/api/core/ApiError';
import type { ApiRequestOptions } from '../../swagger/api/core/ApiRequestOptions';
import type { ApiResult } from '../../swagger/api/core/ApiResult';

describe('ApiError', () => {
  const mockRequest: ApiRequestOptions = {
    method: 'GET',
    url: 'https://api.example.com/resource',
  };
  const mockResponse: ApiResult = {
    url: 'https://api.example.com/resource',
    status: 404,
    statusText: 'Not Found',
    body: { error: 'Resource not found' },
    ok: false,
  };
  const message = 'An error occurred';
  let error: ApiError;

  beforeEach(() => {
    error = new ApiError(mockRequest, mockResponse, message);
  });

  it('testValidName', () => {
    expect(error.name).toBe('ApiError');
  });

  it('testValidMessage', () => {
    expect(error.message).toBe(message);
  });

  it('testValidUrl', () => {
    expect(error.url).toBe(mockResponse.url);
  });

  it('testValidStatus', () => {
    expect(error.status).toBe(mockResponse.status);
  });

  it('testValidStatusText', () => {
    expect(error.statusText).toBe(mockResponse.statusText);
  });

  it('testValidBody', () => {
    expect(error.body).toBe(mockResponse.body);
  });

  it('testValidRequest', () => {
    expect(error.request).toBe(mockRequest);
  });
});
