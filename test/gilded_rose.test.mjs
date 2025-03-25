import { describe, test } from "vitest";
import { expect } from "chai";
import { Item, Shop } from "../src/gilded_rose.mjs";

describe("Shop", () => {
  test("should initialize with empty items array if no items are provided", () => {
    const shop = new Shop();
    expect(shop.items).toEqual([]);
  });
  test("should initialize with provided items", () => {
    const items = [new Item("Aged Brie", 2, 0)];
    const shop = new Shop(items);
    expect(shop.items).toEqual(items);
  });
});

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
      expected: { name: "foo", sellIn: -1, quality: 0 },
    },
    {
      description: "generic item: quality does not change if it is 0",
      input: { name: "foo", sellIn: 0, quality: 0 },
      expected: { name: "foo", sellIn: -1, quality: 0 },
    },
    {
      description: "generic item: quality is decrease by one if sellIn > 0",
      input: { name: "foo", sellIn: 1, quality: 1 },
      expected: { name: "foo", sellIn: 0, quality: 0 },
    },
    {
      description: "generic item: quality is decrease by one if sellIn > 0",
      input: { name: "foo", sellIn: 1, quality: 2 },
      expected: { name: "foo", sellIn: 0, quality: 1 },
    },
    {
      description: "generic item: quality is decrease by two if sellIn <= 0",
      input: { name: "foo", sellIn: 0, quality: 3 },
      expected: { name: "foo", sellIn: -1, quality: 1 },
    },
    {
      description: "generic item: testing extreme values",
      input: { name: "foo", sellIn: -10, quality: 50 },
      expected: { name: "foo", sellIn: -11, quality: 48 },
    },
  ].forEach(({ description, input, expected }) => {
    test(description, () => {
      const gildedRose = new Shop([new Item(input.name, input.sellIn, input.quality)]);
      const items = gildedRose.updateQuality();

      expect(items[0].name).to.equal("foo");
      expect(items[0].sellIn).to.equal(expected.sellIn);
      expect(items[0].quality).to.equal(expected.quality);
    });
  });

  [
    {
      description: "Aged Brie: quality is increase by one if sellIn > 0",
      input: { name: "Aged Brie", sellIn: 5, quality: 10 },
      expected: { sellIn: 4, quality: 11 },
    },
    {
      description: "Aged Brie: quality does not exceed 50 (sellIn > 0)",
      input: { name: "Aged Brie", sellIn: 3, quality: 50 },
      expected: { sellIn: 2, quality: 50 },
    },
    {
      description: "Aged Brie: quality is increase by 2 when sellIn <= 0",
      input: { name: "Aged Brie", sellIn: 0, quality: 10 },
      expected: { sellIn: -1, quality: 12 },
    },
    {
      description: "Aged Brie: Double increase does not exceed 50 (sellIn <= 0)",
      input: { name: "Aged Brie", sellIn: -2, quality: 49 },
      expected: { sellIn: -3, quality: 50 },
    },
    {
      description: "Aged Brie: Quality is increase by two if sellIn <= 0",
      input: { name: "Aged Brie", sellIn: 0, quality: 0 },
      expected: { sellIn: -1, quality: 2 },
    },
    {
      description: "Aged Brie: quality does not exceed 50 (sellIn > 0)",
      input: { name: "Aged Brie", sellIn: 1, quality: 49 },
      expected: { sellIn: 0, quality: 50 },
    },
    {
      description: "Aged Brie: quality increase by one if sellIn = 1",
      input: { name: "Aged Brie", sellIn: 1, quality: 30 },
      expected: { sellIn: 0, quality: 31 },
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
      expected: { sellIn: 14, quality: 21 },
    },
    {
      description: "Backstage passes...: quality is increase by 2 if 5 < sellIn <= 10",
      input: { name: "Backstage passes to a TAFKAL80ETC concert", sellIn: 10, quality: 20 },
      expected: { sellIn: 9, quality: 22 },
    },
    {
      description: "Backstage passes...: quality is increase by 2 if sellIn = 6",
      input: { name: "Backstage passes to a TAFKAL80ETC concert", sellIn: 6, quality: 20 },
      expected: { sellIn: 5, quality: 22 },
    },
    {
      description: "Backstage passes...: quality is increase by 3 if sellIn <= 5",
      input: { name: "Backstage passes to a TAFKAL80ETC concert", sellIn: 5, quality: 20 },
      expected: { sellIn: 4, quality: 23 },
    },
    {
      description: "Backstage passes...: quality does not exceed 50 (initial 49, sellIn > 10)",
      input: { name: "Backstage passes to a TAFKAL80ETC concert", sellIn: 12, quality: 49 },
      expected: { sellIn: 11, quality: 50 },
    },
    {
      description: "Backstage passes...: quality does not exceed 50 (initial 48, sellIn = 11)",
      input: { name: "Backstage passes to a TAFKAL80ETC concert", sellIn: 11, quality: 48 },
      expected: { sellIn: 10, quality: 49 },
    },
    {
      description: "Backstage passes...: quality does not exceed 50 (initial 49, sellIn < 11)",
      input: { name: "Backstage passes to a TAFKAL80ETC concert", sellIn: 10, quality: 49 },
      expected: { sellIn: 9, quality: 50 },
    },
    {
      description: "Backstage passes...: quality does not exceed 50 (initial 48, sellIn <= 5)",
      input: { name: "Backstage passes to a TAFKAL80ETC concert", sellIn: 3, quality: 48 },
      expected: { sellIn: 2, quality: 50 },
    },
    {
      description: "Backstage passes...: quality drops to 0 if sellIn < 0",
      input: { name: "Backstage passes to a TAFKAL80ETC concert", sellIn: 0, quality: 30 },
      expected: { sellIn: -1, quality: 0 },
    },
    {
      description: "Backstage passes...: quality is increase by 3 if sellIn = 1",
      input: { name: "Backstage passes to a TAFKAL80ETC concert", sellIn: 1, quality: 30 },
      expected: { sellIn: 0, quality: 33 },
    },
    {
      description: "Backstage passes...: quality 50 does not change although sellIn <= 5",
      input: { name: "Backstage passes to a TAFKAL80ETC concert", sellIn: 4, quality: 50 },
      expected: { sellIn: 3, quality: 50 },
    },
    {
      description: "Backstage passes...: quality 0 normally increases",
      input: { name: "Backstage passes to a TAFKAL80ETC concert", sellIn: 8, quality: 0 },
      expected: { sellIn: 7, quality: 2 },
    },
  ].forEach(({ description, input, expected }) => {
    test(description, () => {
      const gildedRose = new Shop([new Item(input.name, input.sellIn, input.quality)]);
      const items = gildedRose.updateQuality();

      expect(items[0].name).toBe("Backstage passes to a TAFKAL80ETC concert");
      expect(items[0].quality).toBe(expected.quality);
      expect(items[0].sellIn).toBe(expected.sellIn);
    });
  });

  [
    {
      description: "Sulfuras...: sellIn never change and quality is allways 80",
      input: { name: "Sulfuras, Hand of Ragnaros", sellIn: 7, quality: 80 },
      expected: { sellIn: 7 },
    },
    {
      description: "Sulfuras...: sellIn never change and quality is allways 80",
      input: { name: "Sulfuras, Hand of Ragnaros", sellIn: -1, quality: 80 },
      expected: { sellIn: -1 },
    },
    {
      description: "Sulfuras...: sellIn never change and quality is allways 80",
      input: { name: "Sulfuras, Hand of Ragnaros", sellIn: 33, quality: 44 },
      expected: { sellIn: 33 },
    },
  ].forEach(({ description, input, expected }) => {
    test(description, () => {
      const gildedRose = new Shop([new Item(input.name, input.sellIn, input.quality)]);
      const items = gildedRose.updateQuality();

      expect(items[0].name).toBe("Sulfuras, Hand of Ragnaros");
      expect(items[0].quality).toBe(80);
      expect(items[0].sellIn).toBe(expected.sellIn);
    });
  });
});

describe("Conjured Items", () => {
  test("should degrade quality by 2 if sellIn > 0", () => {
    const item = new Item("Conjured", 3, 10);
    const shop = new Shop([item]);
    shop.updateQuality();

    expect(item.name).toBe("Conjured");
    expect(item.sellIn).toBe(2);
    expect(item.quality).toBe(8);
  });

  test("should degrade quality by 2 if sellIn = 1", () => {
    const item = new Item("Conjured", 1, 10);
    const shop = new Shop([item]);
    shop.updateQuality();

    expect(item.name).toBe("Conjured");
    expect(item.sellIn).toBe(0);
    expect(item.quality).toBe(8);
  });

  test("should degrade quality by 4 if sellIn < 0", () => {
    const item = new Item("Conjured", 0, 10);
    const shop = new Shop([item]);
    shop.updateQuality();

    expect(item.name).toBe("Conjured");
    expect(item.sellIn).toBe(-1);
    expect(item.quality).toBe(6);
  });

  test("should not degrade quality below 0", () => {
    const item = new Item("Conjured", 0, 1);
    const shop = new Shop([item]);
    shop.updateQuality();

    expect(item.name).toBe("Conjured");
    expect(item.sellIn).toBe(-1);
    expect(item.quality).toBe(0);
  });
});
