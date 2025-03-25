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
    {
      description: "Aged Brie: quality does not exceed 50 (sellIn > 0)",
      input: { name: "Aged Brie", sellIn: 3, quality: 50 },
      expected: { sellIn: 2, quality: 50 }
    },
    {
        description: "Aged Brie: quality is increase by 2 when sellIn <= 0",
        input: { name: "Aged Brie", sellIn: 0, quality: 10 },
        expected: { sellIn: -1, quality: 12 }
    },
    {
        description: "Aged Brie: Double increase does not exceed 50 (sellIn <= 0)",
        input: { name: "Aged Brie", sellIn: -2, quality: 49 },
        expected: { sellIn: -3, quality: 50 }
    },
    {
        description: "Aged Brie: Quality is increase by two if sellIn <= 0",
        input: { name: "Aged Brie", sellIn: 0, quality: 0 },
        expected: { sellIn: -1, quality: 2 }
    },
    {
        description: "Aged Brie: quality does not exceed 50 (sellIn > 0)",
        input: { name: "Aged Brie", sellIn: 1, quality: 49 },
        expected: { sellIn: 0, quality: 50 }
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

  [
    {
        description: "Backstage passes...: quality is increase by 1 if sellIn > 10",
        input: { name: "Backstage passes to a TAFKAL80ETC concert", sellIn: 15, quality: 20 },
        expected: { sellIn: 14, quality: 21 }
    },
  ].forEach(({ description, input, expected }) => {
    test(description, () => {
      const gildedRose = new Shop([new Item(input.name, input.sellIn, input.quality)]);
      const items = gildedRose.updateQuality();
      
      expect(items[0].quality).toBe(expected.quality);
      expect(items[0].sellIn).toBe(expected.sellIn);
    });
  });


});
