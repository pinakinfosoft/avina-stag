import { Request, RequestHandler, Response } from "express";
import {
  formatPrice,
  formatPriceForFloatValue,
  getExchangeCurrencyRate,
} from "../utils/shared-functions";
import {
  DEFAULT_STATUS_CODE_ERROR,
  DEFAULT_STATUS_CODE_SUCCESS,
} from "../utils/app-messages";
import { resUnknownError } from "../utils/shared-functions";

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

/**
 * Extended Request interface with currency formatting methods
 */
export interface ICurrencyRequest extends Request {
  /** Format price with currency conversion and correction */
  formatPrice?: (
    price: number,
    product_type: number | null,
    correctionValue?: { flag: boolean; value: number } | null
  ) => Promise<string>;

  /** Format price for float values with currency conversion */
  formatPriceForFloatValue?: (price: number) => Promise<string>;
}

/**
 * Currency rate response structure
 */
interface ICurrencyRateResponse {
  currency: {
    rate: number;
    thousand_token: string;
    [key: string]: unknown;
  };
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Gets currency code from request query parameters
 * @param req - Express request object
 * @returns Currency code string or empty string
 */
const getCurrencyFromRequest = (req: Request): string => {
  return (req.query.currency as string) || "";
};

/**
 * Validates currency rate response
 * @param currencyRate - Currency rate response
 * @returns True if currency rate is valid
 */
const isValidCurrencyRate = (
  currencyRate: unknown
): currencyRate is ICurrencyRateResponse => {
  return (
    currencyRate !== null &&
    typeof currencyRate === "object" &&
    "currency" in currencyRate &&
    currencyRate.currency !== null &&
    typeof currencyRate.currency === "object" &&
    "rate" in currencyRate.currency &&
    typeof currencyRate.currency.rate === "number"
  );
};

/**
 * Gets exchange rate from currency rate response
 * @param currencyRate - Currency rate response
 * @returns Exchange rate (defaults to 1 if invalid)
 */
const getExchangeRate = (currencyRate: unknown): number => {
  if (isValidCurrencyRate(currencyRate)) {
    return currencyRate.currency.rate || 1;
  }
  return 1;
};

/**
 * Creates formatPrice function bound to currency rate
 * @param rate - Exchange rate
 * @param currencyRate - Currency rate response
 * @param req - Express request object
 * @returns Format price function
 */
const createFormatPriceFunction = (
  rate: number,
  currencyRate: ICurrencyRateResponse,
  req: Request
) => {
  return async (
    price: number,
    product_type: number | null,
    correctionValue?: { flag: boolean; value: number } | null
  ): Promise<string> => {
    const convertedPrice = Math.ceil(price) * rate;
    return formatPrice(
      convertedPrice,
      currencyRate.currency.thousand_token,
      product_type,
      correctionValue
    );
  };
};

/**
 * Creates formatPriceForFloatValue function bound to currency rate
 * @param rate - Exchange rate
 * @param currencyRate - Currency rate response
 * @returns Format price for float function
 */
const createFormatPriceForFloatFunction = (
  rate: number,
  currencyRate: ICurrencyRateResponse
) => {
  return async (price: number): Promise<string> => {
    const convertedPrice = Math.ceil(price) * rate;
    return formatPriceForFloatValue(
      convertedPrice,
      currencyRate.currency.thousand_token
    );
  };
};

// ============================================================================
// CURRENCY MIDDLEWARE
// ============================================================================

/**
 * Currency rate change middleware
 * 
 * This middleware:
 * - Extracts currency code from query parameters
 * - Fetches exchange rate for the currency
 * - Attaches price formatting functions to request object
 * 
 * The attached functions automatically apply currency conversion:
 * - req.formatPrice() - Formats price with currency conversion and product correction
 * - req.formatPriceForFloatValue() - Formats float price with currency conversion
 * 
 * @example
 * ```typescript
 * // In route handler:
 * const formattedPrice = await req.formatPrice(100, productType, correctionValue);
 * ```
 */
export const currencyMiddleware: RequestHandler = async (
  req: ICurrencyRequest,
  res: Response,
  next
) => {
  try {
    // Get target currency from query parameters
    const targetCurrency = getCurrencyFromRequest(req);

    // Get exchange currency rate
    const currencyRateResponse = await getExchangeCurrencyRate(
      targetCurrency,
      req
    );

    // Check if currency rate fetch was successful
    if (
      currencyRateResponse &&
      typeof currencyRateResponse === "object" &&
      "code" in currencyRateResponse &&
      currencyRateResponse.code !== DEFAULT_STATUS_CODE_SUCCESS
    ) {
      return res
        .status(DEFAULT_STATUS_CODE_ERROR)
        .send(resUnknownError({ data: currencyRateResponse }));
    }

    // Validate and extract currency rate
    if (!isValidCurrencyRate(currencyRateResponse)) {
      // If invalid, use default rate of 1 (no conversion)
      const defaultRate = 1;
      const defaultCurrencyRate: ICurrencyRateResponse = {
        currency: {
          rate: defaultRate,
          thousand_token: " ",
        },
      };

      req.formatPrice = createFormatPriceFunction(
        defaultRate,
        defaultCurrencyRate,
        req
      );
      req.formatPriceForFloatValue = createFormatPriceForFloatFunction(
        defaultRate,
        defaultCurrencyRate
      );

      return next();
    }

    // Extract exchange rate
    const rate = getExchangeRate(currencyRateResponse);

    // Attach price formatting functions to request object
    req.formatPrice = createFormatPriceFunction(
      rate,
      currencyRateResponse,
      req
    );
    req.formatPriceForFloatValue = createFormatPriceForFloatFunction(
      rate,
      currencyRateResponse
    );

    return next();
  } catch (error) {
    return res
      .status(DEFAULT_STATUS_CODE_ERROR)
      .send(resUnknownError({ data: error }));
  }
};
