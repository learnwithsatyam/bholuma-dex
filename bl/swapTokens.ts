import { JupiterSwapTransactionRequestInterface } from "@/interfaces/jupiterSwapTransactionRequestInterface"

export async function createSwapTransaction(
  body: JupiterSwapTransactionRequestInterface
): Promise<Uint8Array | null> {
  try {
    const response = await fetch('https://lite-api.jup.ag/swap/v1', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      const error = await response.text()
      throw new Error(`Swap request failed: ${error}`)
    }

    const result = await response.json()

    // result.swapTransaction is base64 encoded transaction
    const transactionBase64 = result.swapTransaction as string
    return Uint8Array.from(Buffer.from(transactionBase64, 'base64'))
  } catch (error) {
    console.error('Jupiter Swap Transaction Error:', error)
    return null
  }
}