
import { expect } from 'chai';
import { Item, GildedRose } from '../app/gilded-rose';

describe('Gilded Rose', function () {
    // it('should foo', function () {
    //     const gildedRose = new GildedRose([new Item('foo', 0, 0)]);
    //     const items = gildedRose.updateQuality();
    //     expect(items[0].name).to.equal('fixme');
    // });
    it('quality and sellIn should decrease by 1 for non-special items within sell-in date', function () {
        const thing: Item = new Item('test', 2, 2);
        const gildedRose = new GildedRose([thing]);
        gildedRose.updateQuality();
        expect(thing.quality).to.equal(1);
        expect(thing.sellIn).to.equal(1);
    });
    it('quality should never go below zero for non-special items', function () {
        const thing: Item = new Item('test', 2, 0);
        const gildedRose = new GildedRose([thing]);
        gildedRose.updateQuality();
        expect(thing.quality).to.equal(0);
    });
    it('quality should decrease by 2 for non-special items after sell-in date', function () {
        const thing: Item = new Item('test', 0, 2);
        const gildedRose = new GildedRose([thing]);
        gildedRose.updateQuality();
        expect(thing.quality).to.equal(0);
    });
    it('quality should decrease by 2 for non-special items after sell-in date and no go below 0', function () {
        const thing: Item = new Item('test', 0, 1);
        const gildedRose = new GildedRose([thing]);
        gildedRose.updateQuality();
        expect(thing.quality).to.equal(0);
    });
    it('Brie quality should increase by 1 before sell-in date', function () {
        const thing: Item = new Item('Aged Brie', 5, 1);
        const gildedRose = new GildedRose([thing]);
        gildedRose.updateQuality();
        expect(thing.quality).to.equal(2);
    });
    it('Brie quality should increase by 2 after sell-in date', function () {
        const thing: Item = new Item('Aged Brie', -1, 6);
        const gildedRose = new GildedRose([thing]);
        gildedRose.updateQuality();
        expect(thing.quality).to.equal(8);
    });
    it('Brie quality should not exceed 50 within sell-in date', function () {
        const thing: Item = new Item('Aged Brie', 6, 50);
        const gildedRose = new GildedRose([thing]);
        gildedRose.updateQuality();
        expect(thing.quality).to.equal(50);
    });
    it('Brie quality should not exceed 50 after sell-in date, quality=49', function () {
        const thing: Item = new Item('Aged Brie', -1, 49);
        const gildedRose = new GildedRose([thing]);
        gildedRose.updateQuality();
        expect(thing.quality).to.equal(50);
    });
    it('Brie quality should not exceed 50 after sell-in date, quality=50', function () {
        const thing: Item = new Item('Aged Brie', -1, 50);
        const gildedRose = new GildedRose([thing]);
        gildedRose.updateQuality();
        expect(thing.quality).to.equal(50);
    });

    it('Sulfaras constant quality within sell-in date', function () {
        const thing: Item = new Item('Sulfuras, Hand of Ragnaros', 6, 80);
        const gildedRose = new GildedRose([thing]);
        gildedRose.updateQuality();
        expect(thing.quality).to.equal(80);
    });

    it('Sulfaras constant quality after sell-in date', function () {
        const thing: Item = new Item('Sulfuras, Hand of Ragnaros', -1, 80);
        const gildedRose = new GildedRose([thing]);
        gildedRose.updateQuality();
        expect(thing.quality).to.equal(80);
    });



    it('BP quality increases by 1 when sell-in date is over 10 days', function () {
        const thing: Item = new Item('Backstage passes to a TAFKAL80ETC concert', 11, 5);
        const gildedRose = new GildedRose([thing]);
        gildedRose.updateQuality();
        expect(thing.quality).to.equal(6);
    });


    it('BP quality increases by 2 when sell-in date is between 5-10 days (7)', function () {
        const thing: Item = new Item('Backstage passes to a TAFKAL80ETC concert', 7, 5);
        const gildedRose = new GildedRose([thing]);
        gildedRose.updateQuality();
        expect(thing.quality).to.equal(7);
    });

    it('BP quality increases by 2 when sell-in date is between 5-10 days (10)', function () {
        const thing: Item = new Item('Backstage passes to a TAFKAL80ETC concert', 10, 5);
        const gildedRose = new GildedRose([thing]);
        gildedRose.updateQuality();
        expect(thing.quality).to.equal(7);
    });


    it('BP quality increases by 3 when sell-in date is between 0-5 days (3)', function () {
        const thing: Item = new Item('Backstage passes to a TAFKAL80ETC concert', 3, 5);
        const gildedRose = new GildedRose([thing]);
        gildedRose.updateQuality();
        expect(thing.quality).to.equal(8);
    });

    it('BP quality increases by 3 when sell-in date is between 0-5 days (5)', function () {
        const thing: Item = new Item('Backstage passes to a TAFKAL80ETC concert', 5, 5);
        const gildedRose = new GildedRose([thing]);
        gildedRose.updateQuality();
        expect(thing.quality).to.equal(8);
    });


    it('BP quality increases by 3 when sell-in date is between 0-5 days (0)', function () {
        const thing: Item = new Item('Backstage passes to a TAFKAL80ETC concert', 0, 5);
        const gildedRose = new GildedRose([thing]);
        gildedRose.updateQuality();
        expect(thing.quality).to.equal(0);
    });



    it('BP quality 0 after sell-in date', function () {
        const thing: Item = new Item('Backstage passes to a TAFKAL80ETC concert', -1, 5);
        const gildedRose = new GildedRose([thing]);
        gildedRose.updateQuality();
        expect(thing.quality).to.equal(0);
    });



    it('BP quality < 50 when sell-in date is over 10 days', function () {
        const thing: Item = new Item('Backstage passes to a TAFKAL80ETC concert', 11, 50);
        const gildedRose = new GildedRose([thing]);
        gildedRose.updateQuality();
        expect(thing.quality).to.equal(50);
    });


    it('BP quality < 50 when sell-in date is between 5-10 days (7)', function () {
        const thing: Item = new Item('Backstage passes to a TAFKAL80ETC concert', 7, 50);
        const gildedRose = new GildedRose([thing]);
        gildedRose.updateQuality();
        expect(thing.quality).to.equal(50);
    });

    it('BP quality < 50 when sell-in date is between 5-10 days (10)', function () {
        const thing: Item = new Item('Backstage passes to a TAFKAL80ETC concert', 10, 49);
        const gildedRose = new GildedRose([thing]);
        gildedRose.updateQuality();
        expect(thing.quality).to.equal(50);
    });


    it('BP quality < 50 when sell-in date is between 0-5 days (3)', function () {
        const thing: Item = new Item('Backstage passes to a TAFKAL80ETC concert', 3, 49);
        const gildedRose = new GildedRose([thing]);
        gildedRose.updateQuality();
        expect(thing.quality).to.equal(50);
    });

    it('BP quality < 50 when sell-in date is between 0-5 days (5)', function () {
        const thing: Item = new Item('Backstage passes to a TAFKAL80ETC concert', 5, 48);
        const gildedRose = new GildedRose([thing]);
        gildedRose.updateQuality();
        expect(thing.quality).to.equal(50);
    });


    it('BP quality < 50 when sell-in date is between 0-5 days (0)', function () {
        const thing: Item = new Item('Backstage passes to a TAFKAL80ETC concert', 0, 48);
        const gildedRose = new GildedRose([thing]);
        gildedRose.updateQuality();
        expect(thing.quality).to.equal(0);
    });










});