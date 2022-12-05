// @ts-ignore see https://github.com/jest-community/jest-extended#setup
import * as matchers from "jest-extended";
import { acl, domain, buildDrinkMakerProtocol } from ".";

expect.extend(matchers);

describe("Coffee Machine Protocol", () => {
  it("Should make a tea", () => {
    expect(buildDrinkMakerProtocol({ drinkType: "tea" })).toEqual("T::");
  });

  it("Should make a coffee", () => {
    expect(buildDrinkMakerProtocol({ drinkType: "coffee" })).toEqual("C::");
  });

  it("Should make a chocolate", () => {
    expect(buildDrinkMakerProtocol({ drinkType: "chocolate" })).toEqual("H::");
  });

  it("Should make a tea with one sugar", () => {
    expect(buildDrinkMakerProtocol({ drinkType: "chocolate", sugarAmount: 1 })).toEqual("H:1:0");
  });

  it("Should make a tea with one sugar", () => {
    expect(buildDrinkMakerProtocol({ drinkType: "chocolate", sugarAmount: 2 })).toEqual("H:2:0");
  });

  it("Should make a tea with one sugar", () => {
    expect(buildDrinkMakerProtocol({ drinkType: "tea", sugarAmount: 2 })).toEqual("T:2:0");
  });
});

describe("ACL", () => {
  it("Should build the insctruction for a tea", () => {
    expect(acl({ drinkType: "tea", sugarAmount: 0, withStick: false })).toEqual("T::");
  });

  it("Should build the insctruction for a coffee", () => {
    expect(acl({ drinkType: "coffee", sugarAmount: 0, withStick: false })).toEqual("C::");
  });

  it("Should build the insctruction for a chocolate", () => {
    expect(acl({ drinkType: "chocolate", sugarAmount: 0, withStick: false })).toEqual("H::");
  });

  it("Should build the insctruction for a tea with one sugar", () => {
    expect(acl({ drinkType: "chocolate", sugarAmount: 1, withStick: true })).toEqual("H:1:0");
  });

  it("Should build the insctruction for a tea with one sugar", () => {
    expect(acl({ drinkType: "chocolate", sugarAmount: 2, withStick: true })).toEqual("H:2:0");
  });

  it("Should build the insctruction for a tea with one sugar", () => {
    expect(acl({ drinkType: "tea", sugarAmount: 2, withStick: true })).toEqual("T:2:0");
  });
});

describe("Domain", () => {
  it("Should build the insctruction for a chocolate", () => {
    expect(domain({ drinkType: "chocolate" }).withStick).toEqual(false);
  });

  it("Should build the insctruction for a tea with one sugar", () => {
    expect(domain({ drinkType: "chocolate", sugarAmount: 1 }).withStick).toEqual(true);
  });

  it("Should build the insctruction for a tea with one sugar", () => {
    expect(domain({ drinkType: "chocolate", sugarAmount: 2 }).withStick).toEqual(true);
  });
});
