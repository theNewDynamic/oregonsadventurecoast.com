+++

+++
## Layout Field

The layout parameter in this project is what allows certain pages to belong a section of the site (our area, etc...).
This means your editors may need to touch the "layout" field in order to group pages under a same section. This is not always good practice. For now, the layout field is hidden for non-developer users.

## URL Field

In order for adventures and regular pages URL to be at the root of the website (and note served under /adventures or /sitepages), the Front Matter param `url` had to be systematically set by the editors.
I added this permalink pattern right in the configuration file so editors not longer have to set a URL upon creating a new page or adventure.

    [permalinks]
       adventure = ':slug/'
       sitepages = ':slug/'

## Drafts before and after

Some blog posts lived under /unpublishedblogs/. We suppose it was due to Netlify CMS needing this in order to identify drafts.
We moved those posts underneath the default blog directory and set them as draft as Forestry recognizes and handles drafts out of the box.

## Snippets

3 Snippets were added

* colortext
* columns-2 and colums-3
* float-image

## Code edits

### Select Mapping

Certain field values are numbers mapping to taxonomies (lodging categories, amenities etc...). In order for editors to see the name of the taxonomies and have the code correctly catch their corresponding numbers. The full string to select had to include the numbers, resulting in options looking like `2 - RV Parks & Camping`.
Exemple [here](https://app.forestry.io/sites/o8sfqh0cszrqrq/#/pages/site-content-lodgingitems-oac-vr-18-md/).
Code had to be edited to remove the number from the value when outputing on site.

### Lodging and TourAndEquipements

* [layouts/lodgingitems/list.json.json](https://github.com/theNewDynamic/coosbay/blob/d03f428f642625b776e2e085526b08effd436270/site/layouts/lodgingitems/list.json.json#L21-L29)
* [layouts/tourandequipment/list.json.json](https://github.com/theNewDynamic/coosbay/blob/d03f428f642625b776e2e085526b08effd436270/site/layouts/tourandequipment/list.json.json#L18-L26)

Could not reproduce the object mapping, so the updated files are able to tell from the two variations and return to output format accordingly.

## Known problems

There is a duplicate template called Regular Pages visible from the Forestry UX' list of Front Matter template even though the duplicate has been [removed from the repo](https://github.com/theNewDynamic/coosbay/commit/9722da9672fc49cf3e3c40430b1488aa256bf7ee).