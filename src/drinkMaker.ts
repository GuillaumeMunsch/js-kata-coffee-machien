import { Drink, DrinkOutputProtocol, SugarAmount } from ".";

const drinkTypeToInstructionMap: Record<Drink, string> = {
  tea: "T",
  chocolate: "H",
  coffee: "C",
};

const sugarAmountToInstruction = (sugarAmount?: SugarAmount | 0) => {
  if (!sugarAmount) return "";
  return sugarAmount;
};

const stickAmountToInstruction = (withStick: boolean) => (withStick ? "0" : "");

export const drinkMaker = ({ sugarAmount, drinkType, withStick }: DrinkOutputProtocol) => {
  const drinkTypeInstruction = drinkTypeToInstructionMap[drinkType];
  const sugarAmountInstruction = sugarAmountToInstruction(sugarAmount);
  const withStickInstruction = stickAmountToInstruction(withStick);

  return `${drinkTypeInstruction}:${sugarAmountInstruction}:${withStickInstruction}`;
};
