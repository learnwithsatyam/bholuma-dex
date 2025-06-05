import { JupiterSwapTransactionRequestInterface } from "@/interfaces/jupiterSwapTransactionRequestInterface";
import { jupiterSwapTransactionResponseInterface } from "@/interfaces/jupiterSwapTransactionResponseInterface";
import axios from "axios";

export async function createSwapTransaction(
  body: JupiterSwapTransactionRequestInterface
): Promise<jupiterSwapTransactionResponseInterface | null> {
  try {
    const response = await axios.post<jupiterSwapTransactionResponseInterface>(
      "https://lite-api.jup.ag/swap/v1",
      body,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error: any) {
    console.error("Jupiter Swap Transaction Error:",  error);
    return null;
  }
}
