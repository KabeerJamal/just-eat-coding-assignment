import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../App';
import { fetchRestaurantData } from '../../api/restaurants';
import { createMockRestaurantApiResponse } from '../helpers/testHelpers';

jest.mock('../../api/restaurants');

const mockFetchRestaurantData = fetchRestaurantData as jest.MockedFunction<typeof fetchRestaurantData>;

function validPostcodeInput() {
  return screen.getByRole('textbox', { name: /^postcode$/i });
}

async function searchWithPostcode(postcode: string) {
  const user = userEvent.setup();
  await user.clear(validPostcodeInput());
  await user.type(validPostcodeInput(), postcode);
  await user.click(screen.getByRole('button', { name: /^search$/i }));
}

beforeEach(() => {
  jest.clearAllMocks();
});

describe('App UI', () => {
  test('happy path: when the API returns 10 restaurants, 10 cards appear', async () => {
    mockFetchRestaurantData.mockResolvedValue(createMockRestaurantApiResponse(10));

    render(<App />);

    await searchWithPostcode('EC4M 7RF');

    const list = await screen.findByRole('list');
    const items = within(list).getAllByRole('listitem');
    expect(items).toHaveLength(10);

    expect(within(list).getByText('Restaurant 1')).toBeInTheDocument();
    expect(within(list).getByText('Restaurant 10')).toBeInTheDocument();
  });

  test('loading state: shows loading text while fetching', async () => {
    let resolveFetch!: (value: ReturnType<typeof createMockRestaurantApiResponse>) => void;
    const fetchPromise = new Promise<ReturnType<typeof createMockRestaurantApiResponse>>((resolve) => {
      resolveFetch = resolve;
    });
    mockFetchRestaurantData.mockImplementation(() => fetchPromise);

    render(<App />);

    await searchWithPostcode('EC4M 7RF');

    expect(screen.getByText(/Finding restaurants/i)).toBeInTheDocument();

    resolveFetch(createMockRestaurantApiResponse(1));
    await waitFor(() => {
      expect(screen.queryByText(/Finding restaurants/i)).not.toBeInTheDocument();
    });
  });

  test('error state: when the service throws, the UI shows the error message', async () => {
    mockFetchRestaurantData.mockRejectedValue(new Error('Network failure'));

    render(<App />);

    await searchWithPostcode('SW1A 1AA');

    expect(await screen.findByText(/Network failure/i)).toBeInTheDocument();
  });
});
