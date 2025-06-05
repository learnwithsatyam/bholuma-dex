import { JupiterSwapTransactionRequestInterface } from "@/interfaces/jupiterSwapTransactionRequestInterface";
import { jupiterSwapTransactionResponseInterface } from "@/interfaces/jupiterSwapTransactionResponseInterface";

import axios from "axios";

export async function createSwapTransaction(
  body: JupiterSwapTransactionRequestInterface
): Promise<jupiterSwapTransactionResponseInterface | string> {
  try {
    const response = await axios.post<jupiterSwapTransactionResponseInterface>(
      "https://quote-api.jup.ag/v6/swap",
      body,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      return error.message;
    }
    return "An unknown error occurred";
  }
}
