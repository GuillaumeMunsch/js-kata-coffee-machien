// @ts-ignore see https://github.com/jest-community/jest-extended#setup
import * as matchers from "jest-extended";
import { generateDrinkOrderInstruction, buildDrinkMakerProtocol, DrinkInputProtocol } from ".";
import { cashMissingCheck } from "./cashMissingCheck";
import { drinkMaker } from "./drinkMaker";

expect.extend(matchers);

describe.only("Coffee Machine Protocol", () => {
  it("Should make a tea", () => {
    const drinkInput: DrinkInputProtocol = { drinkType: "tea" };
    const userCash = 40;
    const drinkMakerInput = { userCash, drinkInput };
    expect(buildDrinkMakerProtocol(drinkMakerInput)).toEqual("T::");
  });

  it("Should ask for 40 cents missing", () => {
    const drinkInput: DrinkInputProtocol = { drinkType: "tea" };
    const userCash = 0;
    const drinkMakerInput = { userCash, drinkInput };
    expect(buildDrinkMakerProtocol(drinkMakerInput)).toEqual("40 cents missing");
  });

  it("Should ask for 40 cents missing", () => {
    const drinkInput: DrinkInputProtocol = { drinkType: "tea" };
    const userCash = 20;
    const drinkMakerInput = { userCash, drinkInput };
    expect(buildDrinkMakerProtocol(drinkMakerInput)).toEqual("20 cents missing");
  });

  it("Should ask for 30 cents missing", () => {
    const drinkInput: DrinkInputProtocol = { drinkType: "chocolate" };
    const userCash = 20;
    const drinkMakerInput = { userCash, drinkInput };
    expect(buildDrinkMakerProtocol(drinkMakerInput)).toEqual("30 cents missing");
  });

  it("Should make a coffee", () => {
    const drinkInput: DrinkInputProtocol = { drinkType: "coffee" };
    const userCash = 60;
    const drinkMakerInput = { userCash, drinkInput };
    expect(buildDrinkMakerProtocol(drinkMakerInput)).toEqual("C::");
  });

  it("Should make a chocolate", () => {
    const drinkInput: DrinkInputProtocol = { drinkType: "chocolate" };
    const userCash = 50;
    const drinkMakerInput = { userCash, drinkInput };
    expect(buildDrinkMakerProtocol(drinkMakerInput)).toEqual("H::");
  });

  it("Should make a tea with one sugar", () => {
    const drinkInput: DrinkInputProtocol = { drinkType: "chocolate", sugarAmount: 1 };
    const userCash = 50;
    const drinkMakerInput = { userCash, drinkInput };
    expect(buildDrinkMakerProtocol(drinkMakerInput)).toEqual("H:1:0");
  });

  it("Should make a tea with one sugar", () => {
    const drinkInput: DrinkInputProtocol = { drinkType: "chocolate", sugarAmount: 2 };
    const userCash = 50;
    const drinkMakerInput = { userCash, drinkInput };
    expect(buildDrinkMakerProtocol(drinkMakerInput)).toEqual("H:2:0");
  });

  it("Should make a tea with one sugar", () => {
    const drinkInput: DrinkInputProtocol = { drinkType: "tea", sugarAmount: 2 };
    const userCash = 40;
    const drinkMakerInput = { userCash, drinkInput };
    expect(buildDrinkMakerProtocol(drinkMakerInput)).toEqual("T:2:0");
  });
});

describe("ACL", () => {
  it("Should build the insctruction for a tea", () => {
    expect(drinkMaker({ drinkType: "tea", sugarAmount: 0, withStick: false })).toEqual("T::");
  });

  it("Should build the insctruction for a coffee", () => {
    expect(drinkMaker({ drinkType: "coffee", sugarAmount: 0, withStick: false })).toEqual("C::");
  });

  it("Should build the insctruction for a chocolate", () => {
    expect(drinkMaker({ drinkType: "chocolate", sugarAmount: 0, withStick: false })).toEqual("H::");
  });

  it("Should build the insctruction for a tea with one sugar", () => {
    expect(drinkMaker({ drinkType: "chocolate", sugarAmount: 1, withStick: true })).toEqual("H:1:0");
  });

  it("Should build the insctruction for a tea with one sugar", () => {
    expect(drinkMaker({ drinkType: "chocolate", sugarAmount: 2, withStick: true })).toEqual("H:2:0");
  });

  it("Should build the insctruction for a tea with one sugar", () => {
    expect(drinkMaker({ drinkType: "tea", sugarAmount: 2, withStick: true })).toEqual("T:2:0");
  });
});

describe("Domain", () => {
  it("Should build the insctruction for a chocolate", () => {
    expect(generateDrinkOrderInstruction({ drinkType: "chocolate" }).withStick).toEqual(false);
  });

  it("Should build the insctruction for a tea with one sugar", () => {
    expect(generateDrinkOrderInstruction({ drinkType: "chocolate", sugarAmount: 1 }).withStick).toEqual(true);
  });

  it("Should build the insctruction for a tea with one sugar", () => {
    expect(generateDrinkOrderInstruction({ drinkType: "chocolate", sugarAmount: 2 }).withStick).toEqual(true);
  });
});

describe("cashMissingCheck", () => {
  it("Should return 40 missing", () => {
    expect(cashMissingCheck({ drinkType: "tea", userCash: 0 })).toEqual(40);
  });

  it("Should return 50 missing", () => {
    expect(cashMissingCheck({ drinkType: "chocolate", userCash: 0 })).toEqual(50);
  });

  it("Should return 60 missing", () => {
    expect(cashMissingCheck({ drinkType: "coffee", userCash: 0 })).toEqual(60);
  });

  it("Should return 40 missing", () => {
    expect(cashMissingCheck({ drinkType: "tea", userCash: 0 })).toEqual(40);
  });

  it("Should return 10 missing", () => {
    expect(cashMissingCheck({ drinkType: "chocolate", userCash: 40 })).toEqual(10);
  });

  it("Should return 30 missing", () => {
    expect(cashMissingCheck({ drinkType: "chocolate", userCash: 20 })).toEqual(30);
  });

  it("Should return 0 missing", () => {
    expect(cashMissingCheck({ drinkType: "chocolate", userCash: 50 })).toEqual(0);
  });

  it("Should return 0 missing", () => {
    expect(cashMissingCheck({ drinkType: "chocolate", userCash: 60 })).toEqual(0);
  });
});