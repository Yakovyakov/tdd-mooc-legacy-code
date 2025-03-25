import { describe, test } from "vitest";
import { expect } from "chai";
import { Item, Shop } from "../src/gilded_rose.mjs";

describe("Gilded Rose", () => {
  test("foo", () => {
    const gildedRose = new Shop([new Item("foo", 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).to.equal("foo");
    expect(items[0].sellIn).to.equal(-1);
    expect(items[0].quality).to.equal(0);
  });

  [
    { 
      description: "generic item: quality dicrease to 0 if sellIn <= 0",
      input: { name: "foo", sellIn: 0, quality: 2 },
      expected: { name: "foo", sellIn: -1, quality: 0 }
    },
].forEach(({ description, input, expected }) => {
    test(description, () => {
      const gildedRose = new Shop([new Item(input.name, input.sellIn, input.quality)]);
      const items = gildedRose.updateQuality();
      
      expect(items[0].name).to.equal(expected.name);
      expect(items[0].sellIn).to.equal(expected.sellIn);
      expect(items[0].quality).to.equal(expected.quality);
    });
});

});
