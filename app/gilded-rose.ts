export class Item {
    name: string;
    sellIn: number;
    quality: number;

    constructor(name, sellIn, quality) {
        this.name = name;
        this.sellIn = sellIn;
        this.quality = quality;
    }
}

export class GildedRose {
    items: Array<Item>;

    constructor(items = [] as Array<Item>) {
        this.items = items;
    }

    updateQuality() {

        for (let item of this.items) {
            switch (item.name) {
                case 'Sulfuras, Hand of Ragnaros':
                    break;
                case 'Backstage passes to a TAFKAL80ETC  else {concert':
                        if (item.sellIn > 10) {
                            item.quality += 1;
                        } else if (item.sellIn > 5) {
                            item.quality += 2;
                        } else if (item.sellIn > 0) {
                            item.quality += 3;
                        }
                        item.quality = 0;
                    }
                    if (item.quality > 50) {
                        item.quality = 50;
                    }
                    item.sellIn -= 1;
                    break;
                case 'Aged Brie':
                    if (item.sellIn > 0) {
                        item.quality += 1;
                    } else {
                        item.quality += 2;
                    }
                    if (item.quality > 50) {
                        item.quality = 50;
                    }
                    item.sellIn -= 1;
                    break;
                case 'Conjured Mana Cake':
                    if (item.sellIn > 0) {
                        item.quality -= 2;
                    } else {
                        item.quality -= 4;
                    }
                    item.sellIn -= 1;
                    break;
                default:
                    if (item.sellIn > 0) {
                        item.quality -= 1;
                    } else {
                        item.quality -= 2;
                    }
                    item.sellIn -=1;
                    break;
            }
            if (item.quality < 0) {
                item.quality = 0
            }
        }
        return this.items;
    }
}
