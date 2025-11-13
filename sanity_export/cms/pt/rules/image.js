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

    if (el.tagName.toLowerCase() != 'img') {
      return undefined
    }
    let src = el.getAttribute("src")
    let publicSrc
    let caption = ''
    if(src.includes('http') ){
      publicSrc = src.replace('blob:', '')
    } else {
      src = src.replace('/uploads', '')
      publicSrc = `https://www.oregonsadventurecoast.com${src}`
    }
    if(el.getAttribute("data-caption")) {
      caption = el.getAttribute("data-caption")
    }
    return block({
      _type: "image",
      _sanityAsset: `image@${publicSrc}`,
      caption,
    })
  },
}