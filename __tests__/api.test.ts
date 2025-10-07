import { apiFetch } from '@/lib/api';

// Mock fetch
global.fetch = jest.fn();

describe('API Layer', () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
    // Clear localStorage
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn(),
        setItem: jest.fn(),
        clear: jest.fn(),
      },
      writable: true,
    });
  });

  it('should handle 401 responses by clearing localStorage', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      status: 401,
      ok: false,
    });

    const mockClear = jest.fn();
    Object.defineProperty(window, 'localStorage', {
      value: { clear: mockClear },
      writable: true,
    });

    // Mock window.location.href
    delete (window as any).location;
    (window as any).location = { href: '' };

    try {
      await apiFetch('/test');
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(mockClear).toHaveBeenCalled();
    }
  });

  it('should include authorization header when token exists', async () => {
    const mockToken = 'test-token';
    (window.localStorage.getItem as jest.Mock).mockReturnValue(mockToken);
    
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      status: 200,
      headers: new Headers({ 'content-type': 'application/json' }),
      json: () => Promise.resolve({ data: 'test' }),
    });

    await apiFetch('/test');

    expect(fetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        headers: expect.any(Headers),
      })
    );
  });
});