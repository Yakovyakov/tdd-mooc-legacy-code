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
    this.items.forEach((item) => this.updateSingleItem(item));
    return this.items;
  }

  updateSingleItem(item) {
    switch (item.name) {
      case "Aged Brie":
        this.updateAgedBrie(item);
        break;
      case "Backstage passes to a TAFKAL80ETC concert":
        this.updateBackstagePasses(item);
        break;
      case "Sulfuras, Hand of Ragnaros":
        this.updateSulfras(item);
        break;
      case "Conjured":
        this.updateConjuredItem(item);
        break;
      default:
        this.updateNormalItem(item);
    }
  }

  // TODO: Specific methods by item type

  updateSulfras(item) {
    item.quality = 80;
  }

  updateNormalItem(item) {
    this.decreaseQuality(item);
    item.sellIn -= 1;

    if (item.sellIn < 0) {
      this.decreaseQuality(item);
    }
  }

  updateBackstagePasses(item) {
    this.increaseQuality(item);
    if (item.sellIn < 11) {
      this.increaseQuality(item);
    }
    if (item.sellIn < 6) {
      this.increaseQuality(item);
    }

    item.sellIn -= 1;

    if (item.sellIn < 0) {
      item.quality = 0;
    }
  }

  updateAgedBrie(item) {
    this.increaseQuality(item);
    item.sellIn -= 1;

    if (item.sellIn < 0) {
      this.increaseQuality(item);
    }
  }

  updateConjuredItem(item) {
    this.decreaseQuality(item, 2);
    item.sellIn -= 1;

    if (item.sellIn < 0) {
      this.decreaseQuality(item, 2);
    }
  }

  //TODO: some helpers

  decreaseQuality(item, degradation = 1) {
    item.quality = Math.max(0, item.quality - degradation);
  }

  increaseQuality(item) {
    item.quality = Math.min(item.quality + 1, 50);
  }
}
