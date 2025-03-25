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
        this.updateEveryThingElse(item);
    }
  }

  updateSulfras(item) {
    item.quality = 80;
  }
  
  updateEveryThingElse(item) {
    this.decreaseQuality(item);
    item.sellIn = item.sellIn - 1;

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
    
    item.sellIn = item.sellIn - 1;

    if (item.sellIn < 0) {
      item.quality = 0;
    }
  }

  updateAgedBrie(item) {
    this.increaseQuality(item);
    item.sellIn = item.sellIn - 1;

    if (item.sellIn < 0) {
      this.increaseQuality(item);
    }
  }

  updateConjuredItem(item){
    this.decreaseQuality(item, 2);
    item.sellIn = item.sellIn - 1;

    if (item.sellIn < 0) {
      this.decreaseQuality(item, 2);
    }

  }

  decreaseQuality(item, degradation = 1) {
    item.quality = Math.max(0, item.quality - degradation);
  }

  increaseQuality(item) {
    if (item.quality < 50) {
      item.quality = item.quality + 1;
    }
  }
}
