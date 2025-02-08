
import { handleGetCode } from './authHelper';
import axios from 'axios';

// Mock axios and toast
jest.mock('axios');
jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

describe('handleGetCode', () => {
  const mockSetCodeSent = jest.fn();
  const mockToast = require('react-toastify').toast; // Mock toast after import

  beforeEach(() => {
    jest.clearAllMocks(); 
  });

  it('should send the verification code successfully', async () => {
    // Mock the axios post response
    axios.post.mockResolvedValue({
      data: {
        success: true,
        message: 'Verification code sent successfully.',
      },
    });

    // Call the function
    await handleGetCode('test@example.com', mockSetCodeSent, mockToast);

    // Check that the toast success message was called
    expect(mockToast.success).toHaveBeenCalledWith('Verification code sent successfully.');
    expect(mockSetCodeSent).toHaveBeenCalledWith(true); // Ensure setCodeSent is called with true
  });

  it('should handle failure if axios request fails', async () => {
    // Mock the axios post to throw an error
    axios.post.mockRejectedValue({
      response: {
        data: {
          message: 'Failed to send code.',
        },
      },
    });

    // Call the function
    await handleGetCode('test@example.com', mockSetCodeSent, mockToast);

    // Check that the toast error message was called
    expect(mockToast.error).toHaveBeenCalledWith('Failed to send code.');
    expect(mockSetCodeSent).not.toHaveBeenCalled(); // Ensure setCodeSent is not called in case of failure
  });

  it('should handle generic errors', async () => {
    // Mock axios post to throw a generic error
    axios.post.mockRejectedValue(new Error('Network error'));

    // Call the function
    await handleGetCode('test@example.com', mockSetCodeSent, mockToast);

    // Check that the toast error message for generic error was called
    expect(mockToast.error).toHaveBeenCalledWith('Failed to send verification code. Please try again later.');
    expect(mockSetCodeSent).not.toHaveBeenCalled(); // Ensure setCodeSent is not called in case of failure
  });
});
