type Drink = "tea" | "chocolate" | "coffee";

type SugarAmount = 1 | 2;

type InputProtocol = {
  drinkType: Drink;
  sugarAmount?: SugarAmount;
};

type OutputProtocol = Omit<InputProtocol, "sugarAmount"> & {
  sugarAmount: SugarAmount | 0;
  withStick: boolean;
};

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

const shouldHaveStick = (sugarAmount?: SugarAmount) => {
  if (!sugarAmount) return false;
  return true;
};

export const domain = ({ sugarAmount, drinkType }: InputProtocol): OutputProtocol => {
  const withStick = shouldHaveStick(sugarAmount);
  return {
    drinkType,
    sugarAmount,
    withStick,
  };
};

export const acl = ({ sugarAmount, drinkType, withStick }: OutputProtocol) => {
  const drinkTypeInstruction = drinkTypeToInstructionMap[drinkType];
  const sugarAmountInstruction = sugarAmountToInstruction(sugarAmount);
  const withStickInstruction = stickAmountToInstruction(withStick);

  return `${drinkTypeInstruction}:${sugarAmountInstruction}:${withStickInstruction}`;
};

export const buildDrinkMakerProtocol = (input: InputProtocol) => {
  return acl(domain(input));
};
