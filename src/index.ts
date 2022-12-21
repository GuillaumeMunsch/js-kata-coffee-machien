import { cashMissingCheck } from "./cashMissingCheck";
import { drinkMaker } from "./drinkMaker";

export type ColdNonSweetDrink = "orange";
export type ColdDrink = ColdNonSweetDrink;
export type HotDrink = "tea" | "chocolate" | "coffee";
export type Drink = ColdDrink | HotDrink;

export type SugarAmount = 0 | 1 | 2;

export type Temperature = "cold" | "hot" | "extraHot";

export type ColdNonSweetDrinkInputProtocol = {
  drinkType: ColdNonSweetDrink;
  temperature: "cold";
  sugarAmount: 0;
};

export type ColdDrinkInputProtocol =
  | ColdNonSweetDrinkInputProtocol
  | {
      drinkType: ColdDrink;
      temperature: "cold";
      sugarAmount: SugarAmount;
    };

export type HotDrinkInputProtocol = {
  drinkType: HotDrink;
  temperature: "hot" | "extraHot";
  sugarAmount: SugarAmount;
};

export type DrinkInputProtocol = ColdDrinkInputProtocol | HotDrinkInputProtocol;

export type DrinkOutputProtocol = Omit<DrinkInputProtocol, "sugarAmount"> & {
  sugarAmount: SugarAmount;
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

export const generateDrinkOrderInstruction = ({
  sugarAmount,
  drinkType,
  temperature,
}: DrinkInputProtocol): DrinkOutputProtocol => {
  const withStick = shouldHaveStick(sugarAmount);
  return {
    drinkType,
    sugarAmount,
    withStick,
    temperature,
  };
};

export const buildDrinkMakerProtocol = ({ drinkInput, userCash }: DrinkMakerInput) => {
  const missingCash = cashMissingCheck({ userCash, drinkType: drinkInput.drinkType });
  if (missingCash > 0) return `${missingCash} cents missing`;

  return drinkMaker(generateDrinkOrderInstruction(drinkInput));
};
