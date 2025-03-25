export class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class Shop {
  constructor(items = []) {
    this.items = items;
  }

  updateQuality() {
    for (var i = 0; i < this.items.length; i++) {
      this.updateSingleItem(this.items[i]);
    }

    return this.items;
  }

  updateSingleItem(item) {
    if (item.name === "Aged Brie"){
      this.updateAgedBrie(item);
      return;
    }
    if (item.name === "Backstage passes to a TAFKAL80ETC concert"){
      this.updateBackstagePasses(item);
      return;
    }
    if (item.name === "Sulfuras, Hand of Ragnaros") {
      return;
    }

    this.updateEveryThingElse(item);
  }



  updateEveryThingElse(item) {
    if (item.quality > 0) {
      item.quality = item.quality - 1;
    }
    item.sellIn = item.sellIn - 1;
    if (item.sellIn < 0) {
      if (item.quality > 0) {
        item.quality = item.quality - 1;
      }
    }
  }

  updateBackstagePasses(item) {
    if (item.quality < 50) {
      item.quality = item.quality + 1;
      if (item.sellIn < 11) {
        if (item.quality < 50) {
          item.quality = item.quality + 1;
        }
      }
      if (item.sellIn < 6) {
        if (item.quality < 50) {
          item.quality = item.quality + 1;
        }
      }
    }
    item.sellIn = item.sellIn - 1;
    if (item.sellIn < 0) {
      item.quality = item.quality - item.quality;
    }
  }

  updateAgedBrie(item) {
    this.increaseQuality(item);
    item.sellIn = item.sellIn - 1;

    if (item.sellIn < 0) {
      if (item.quality < 50) {
        item.quality = item.quality + 1;
      }
    }
  }

  increaseQuality(item) {
    if (item.quality < 50) {
      item.quality = item.quality + 1;
    }
  }
}
