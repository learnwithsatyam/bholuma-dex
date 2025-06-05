import { jupiterQuoteInterface } from "@/interfaces/jupiterQuoteInterface";

export interface JupiterSwapTransactionRequestInterface {
    userPublicKey: string; // Required

    wrapAndUnwrapSol?: boolean; // Default: true

    useSharedAccounts?: boolean;

    feeAccount?: string;

    trackingAccount?: string;

    prioritizationFeeLamports?: {
        priorityLevelWithMaxLamports: {
            maxLamports: number;
            priorityLevel: 'medium' | 'high' | 'veryHigh';
        };
        jitoTipLamports: number;
    }

    asLegacyTransaction?: boolean; // Default: false

    destinationTokenAccount?: string;

    dynamicComputeUnitLimit?: boolean; // Default: false

    skipUserAccountsRpcCalls?: boolean; // Default: false

    dynamicSlippage?: boolean; // Default: false

    computeUnitPriceMicroLamports?: number;

    blockhashSlotsToExpiry?: number;

    quoteResponse: jupiterQuoteInterface;
}
