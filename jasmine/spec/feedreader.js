/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function () {
  'use strict';
  /* This is our first test suite - a test suite just contains
   * a related set of tests. This suite is all about the RSS
   * feeds definitions, the allFeeds variable in our application.
   */
  describe('RSS Feeds: ', function () {
    /* This is our first test - it tests to make sure that the
     * allFeeds variable has been defined and that it is not
     * empty. Experiment with this before you get started on
     * the rest of this project. What happens when you change
     * allFeeds in app.js to be an empty array and refresh the
     * page?
     */
    it('are defined', function () {
      expect(allFeeds).toBeDefined();
      expect(allFeeds.length).not.toBe(0);
    });


    /* This is a test that loops through each feed
     * in the allFeeds array and ensures it has a URL and a name defined
     * and that the URL and name aren't empty. Jasmine's toBeTruthy functions is used,
     * because both an empty string and undefined are falsy values. A defined string value
     * that's not empty, however is truthy.
     */
    allFeeds.forEach((feed, ind) => {
      it(`allFeeds[${ind}].url is defined and not empty`, function () {
        expect(feed.url).toBeTruthy();
      });
      it(`allFeeds[${ind}].name is defined and not empty`, function () {
        expect(feed.name).toBeTruthy();
      });
    });
  });

  /* This test suite tests the functionality of our
   * slide menu.
   */
  describe('The Menu: ', function () {
    /* This test ensures the menu element is
     * hidden by default. And it shoud be, because the body
     * is initially given the 'menu-hidden' class.
     * So, we're checking it to ensure that nothing is
     * affecting the body and it's class. JQuery's hasClass function
     * returns either true or false, and we expect it to return true
     * in this case, because the menu should hidden.
     */
    it('menu is hidden by default', function () {
      expect($('body').hasClass('menu-hidden')).toBe(true);
    });

    /* This a test that ensures the menu changes
     * visibility when the menu icon is clicked, it has
     * two expectations: the menu displays when
     * clicked and it hides when clicked again.
     * So, we simulate clicks with JQuery's click method,
     * and then check how the body's "menu-hidden" class changes.
     */
    it('menu changes visibility when the menu icon is clicked', function () {
      $('.menu-icon-link').click();
      expect($('body').hasClass('menu-hidden')).not.toBe(true);
      $('.menu-icon-link').click();
      expect($('body').hasClass('menu-hidden')).toBe(true);
    });
  });


  /* This test suite tests the functionality of the entries
   * that are initial loaded with `loadFeed(0)`.
   */
  describe('Initial Entries: ', function () {

    /* The beforeEach function runs before any of our tests,
     * and can be used for asynchronous tests. When the beforeEach
     * function is finished, we call `done`, and then our tests
     * will start run.
     */
    beforeEach(function (done) {
      loadFeed(0, done);
    });

    /* This test runs after `loadFeed(0)` and ensures that there is at least
     * a single .entry element within the .feed container. We query the DOM for an
     * element that has the .entry class and is a child of .feed, and if we find
     * elements that match this query, they are returned in an object, with
     * a length property. We ensure that this length is greater than 0,
     * with Jasmine's toBeGreaterThan function, so there is at least
     * one element that matches our query.
     */
    it('at least a single .entry element within the .feed container, after loadFeed is called', function () {
      expect($('.feed .entry').length).toBeGreaterThan(0);
    });
  });


  /* This test suite tests functionality relating to
   * the loading in of a new feed.
   */
  describe('New Feed Selection: ', function () {

    /* We use the beforeEach function in this case to load in the first feed,
     * store this feed's innerHTML, and then load in another feed, and store
     * that feed's innerHTML. Once these async calls are finished, we call the
     * done function to start our testing.
     */
    var initialFeed, newFeed;
    beforeEach(function (done) {
      loadFeed(0, function () {
        initialFeed = $('.feed')[0].innerHTML;
        loadFeed(1, function () {
          newFeed = $('.feed')[0].innerHTML;
          done();
        });
      })
    });

    /* This test ensures that the content actually changes when
     * a new feed is loaded in by the loadFeed function. And, since
     * we've already stored the contents of the first and second feeds in
     * our initialFeed and newFeed variables, respectively; we only have to
     * test that the innerHTML from the first feed is not equal to the
     * innerHTML from the second feed, using `.not.toBe`.
     */
    it('new feed is loaded by the loadFeed function', function () {
      expect(newFeed).not.toBe(initialFeed);
    })
  });
}());