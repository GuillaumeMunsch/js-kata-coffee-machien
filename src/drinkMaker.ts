import { Drink, DrinkOutputProtocol, SugarAmount } from ".";

const drinkTypeToInstructionMap: Record<Drink, string> = {
  tea: "T",
  chocolate: "H",
  coffee: "C",
  orange: "O",
};

const sugarAmountToInstruction = (sugarAmount?: SugarAmount | 0) => {
  if (!sugarAmount) return "";
  return sugarAmount;
};

const stickAmountToInstruction = (withStick: boolean) => (withStick ? "0" : "");

export const drinkMaker = ({ sugarAmount, drinkType, withStick, temperature }: DrinkOutputProtocol) => {
  const drinkTypeInstruction = drinkTypeToInstructionMap[drinkType];
  const drinkTemperature = temperature === "extraHot" ? "h" : "";
  const sugarAmountInstruction = sugarAmountToInstruction(sugarAmount);
  const withStickInstruction = stickAmountToInstruction(withStick);

  return `${drinkTypeInstruction}${drinkTemperature}:${sugarAmountInstruction}:${withStickInstruction}`;
};
