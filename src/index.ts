import { cashMissingCheck } from "./cashMissingCheck";
import { drinkMaker } from "./drinkMaker";

export type Drink = "tea" | "chocolate" | "coffee";

export type SugarAmount = 1 | 2;

export type DrinkInputProtocol = {
  drinkType: Drink;
  sugarAmount?: SugarAmount;
};

export type DrinkOutputProtocol = Omit<DrinkInputProtocol, "sugarAmount"> & {
  sugarAmount: SugarAmount | 0;
  withStick: boolean;
};

type DrinkMakerInput = {
  drinkInput: DrinkInputProtocol;
  userCash: number;
};

const shouldHaveStick = (sugarAmount?: SugarAmount) => {
  if (!sugarAmount) return false;
  return true;
};

export const generateDrinkOrderInstruction = ({ sugarAmount, drinkType }: DrinkInputProtocol): DrinkOutputProtocol => {
  const withStick = shouldHaveStick(sugarAmount);
  return {
    drinkType,
    sugarAmount,
    withStick,
  };
};

export const buildDrinkMakerProtocol = ({ drinkInput, userCash }: DrinkMakerInput) => {
  const missingCash = cashMissingCheck({ userCash, drinkType: drinkInput.drinkType });
  if (missingCash > 0) return `${missingCash} cents missing`;

  return drinkMaker(generateDrinkOrderInstruction(drinkInput));
};
