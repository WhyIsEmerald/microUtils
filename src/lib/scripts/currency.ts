/**
 * Convert currency amount from one currency to another.
 *
 * @param amount - The amount of money to convert.
 * @param fromCurrency - The base currency code (e.g. "USD").
 * @param toCurrency - The target currency code (e.g. "EUR").
 * @returns Promise<number> - The converted amount.
 */
export async function convertCurrency(
  amount: number,
  fromCurrency: string,
  toCurrency: string
): Promise<number | null> {
  fromCurrency = fromCurrency.toLowerCase()
  toCurrency = toCurrency.toLowerCase()

  // Fetch exchange rates with base currency as fromCurrency
  const url = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${fromCurrency}.json`

  try {
    const response = await fetch(url)
    if (!response.ok) throw new Error('Failed to fetch exchange rates')

    const data = await response.json()

    // Get the rate for the target currency
    const rate = data[fromCurrency][toCurrency]
    // if (!rate) throw new Error(`Currency code "${toCurrency}" not found`);

    // Calculate converted amount
    const convertedAmount = amount * rate

    return convertedAmount
  } catch (error) {
    console.error(error)
    return null
  }
}
