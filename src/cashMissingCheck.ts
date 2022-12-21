import { Drink } from ".";

type CashMissingInput = { drinkType: Drink; userCash: number };

const drinkPricesMap = {
  tea: 40,
  chocolate: 50,
  coffee: 60,
};

export const cashMissingCheck = ({ drinkType, userCash }: CashMissingInput) => {
  const requiredCash = drinkPricesMap[drinkType];
  if (userCash) {
    const missingCash = requiredCash - userCash;
    return missingCash < 0 ? 0 : missingCash;
  }
  return requiredCash;
};
