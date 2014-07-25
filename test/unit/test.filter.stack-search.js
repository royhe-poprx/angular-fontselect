/* global DEFAULT_WEBSAFE_FONTS */
describe('stackSearch filter', function() {
  var filter;
  beforeEach(inject(function($filter) {
    filter = $filter('stackSearch');
  }));

  it('should exist', function() {
    expect(filter).toBeInstanceOf(Function);
  });

  it('should have a consistent set of fixture fonts', function() {
    expect(DEFAULT_WEBSAFE_FONTS.length).toBe(5);
    expect(DEFAULT_WEBSAFE_FONTS[0].name).toBe('Arial');
  });

  it('should find a font by a part of its stack', function() {
    expect(filter(DEFAULT_WEBSAFE_FONTS, DEFAULT_WEBSAFE_FONTS[0].stack)).toEqual([DEFAULT_WEBSAFE_FONTS[0]]);
  });

  it('should find a font by a part of its stack', function() {
    expect(filter(DEFAULT_WEBSAFE_FONTS, 'Arial')).toEqual([DEFAULT_WEBSAFE_FONTS[0]]);
  });

  it('should find the best fallback font if multiple stacks are matching', function() {
    expect(filter(DEFAULT_WEBSAFE_FONTS, 'Helvetica')).toEqual([DEFAULT_WEBSAFE_FONTS[2]]);
  });

  it('should return multiple fonts when we cant not figure out the best one', function() {
    expect(filter(DEFAULT_WEBSAFE_FONTS, 'sans-serif')).toEqual([DEFAULT_WEBSAFE_FONTS[0], DEFAULT_WEBSAFE_FONTS[2]]);
  });

  describe('caching', function() {
    it('should not create a weighted font List for the same input twice', function() {
      spyOn(filter, 'createWeightedFontList').andCallThrough();
      filter(DEFAULT_WEBSAFE_FONTS, 'Helvetica');
      filter(DEFAULT_WEBSAFE_FONTS, 'Arial');
      expect(filter.createWeightedFontList.calls.length).toBe(1);
    });
  });

  describe('normalizeStack helper', function() {
    var normalizeStack;

    beforeEach(function() {
      normalizeStack = filter.normalizeStack;
    });

    it('should exist', function() {
      expect(normalizeStack).toBeInstanceOf(Function);
    });

    it('should split a string by comma', function() {
      expect(normalizeStack('a,b,c')).toEqual(['a', 'b', 'c']);
    });

    it('should clean up every token', function() {
      expect(normalizeStack('foo   ,"bar lorem " ')).toEqual(['foo', 'bar lorem']);
    });
  });

});
