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
      description: "generic item: quality is decrease to 0 if sellIn <= 0",
      input: { name: "foo", sellIn: 0, quality: 2 },
      expected: { name: "foo", sellIn: -1, quality: 0 }
    },
    { 
      description: "generic item: quality does not change if it is 0",
      input: { name: "foo", sellIn: 0, quality: 0 },
      expected: { name: "foo", sellIn: -1, quality: 0 }
    },
    { 
      description: "generic item: quality is decrease by one if sellIn > 0",
      input: { name: "foo", sellIn: 1, quality: 1 },
      expected: { name: "foo", sellIn: 0, quality: 0 }
    },
    { 
      description: "generic item: quality is decrease by two if sellIn <= 0",
      input: { name: "foo", sellIn: 0, quality: 3 },
      expected: { name: "foo", sellIn: -1, quality: 1 }
    },
    { 
      description: "generic item: testing extreme values",
      input: { name: "foo", sellIn: -10, quality: 50 },
      expected: { name: "foo", sellIn: -11, quality: 48 }
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

  [
    {
        description: "Aged Brie: quality is increase by one if sellIn > 0",
        input: { name: "Aged Brie", sellIn: 5, quality: 10 },
        expected: { sellIn: 4, quality: 11 }
    },
  ].forEach(({ description, input, expected }) => {
    test(description, () => {
        const gildedRose = new Shop([new Item(input.name, input.sellIn, input.quality)]);
        const items = gildedRose.updateQuality();
        
        expect(items[0].quality).toBe(expected.quality);
        expect(items[0].sellIn).toBe(expected.sellIn);
        expect(items[0].name).toBe("Aged Brie");
            });
});

});
