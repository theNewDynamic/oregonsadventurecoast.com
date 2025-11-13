/**
What We want to return
{
  _type: image
  _sanityAsset: image@https://www.joinproviders.com/uploads/blog-tax-safe-graphic.jpg
}
 */

export default {
  deserialize(el, next, block) {
    if(typeof el.tagName == "undefined") {
      return undefined
    }

    if (el.tagName.toLowerCase() != 'a') {
      return undefined
    }
    let publicSrc
    const href = el.getAttribute("href")
    if(!href.startsWith('/uploads/') ){
      return undefined
    } else {
      publicSrc = `{domain}${href}`
    }
    return block({
      _type: "file",
      _sanityAsset: `file@${publicSrc}`,
    })
  },
}