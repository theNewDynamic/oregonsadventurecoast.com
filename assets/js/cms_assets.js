let domain = "https://www.oregonsadventurecoast.com"
let local_domain = window.location.origin
fetch(domain)
  .then(response => response.text())
  .then(html => {
    const f = document.createElement("html");
    f.innerHTML = html;
    Array.from(f.getElementsByTagName("link")).forEach(tag => {
      console.log(tag.name)
      if (tag.rel == "stylesheet" && !tag.media) {
        const link = document.createElement('link');
        var tag_href = tag.href
        if(tag_href.indexOf(local_domain) != -1){
          tag_href = tag_href.replace(local_domain, domain)
          console.log(tag_href)
        }
        link.href = tag_href;
        link.rel = tag.rel;
        link.class = "cms-only"
        document.getElementsByTagName('head')[0].appendChild(link);
      }
    });
    Array.from(f.getElementsByTagName("script")).forEach(tag => {
      const script = document.createElement('script');
      var tag_href = tag.src
      if(tag_href.indexOf(local_domain) != -1){
        tag_href = tag_href.replace(local_domain, domain)
      }
      script.src = tag_href;
      script.defer = true
      script.class = "cms-only"
      document.getElementsByTagName('head')[0].appendChild(script);
    })
  });