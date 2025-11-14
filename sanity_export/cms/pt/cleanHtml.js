const cleanHtml = (html) => {
  return html.replace('<strong>', '').replace('</strong>', '').replace('<em>', '').replace('</em>', '')
}

export default cleanHtml