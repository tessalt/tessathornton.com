(() => {
  
  const url = window.location.href;
  // const url = "https://tessathornton.com/posts/first-post.html";
  const el = document.getElementById("mentions");

  fetch("https://webmention.io/api/mentions.jf2?target=" + url)
    .then(response => response.json())
    .then((json) => {
      json.children.forEach((child) => {
        let author = child.author.name.length > 0 ? child.author.name: child.author.url;
        const li = el.appendChild(document.createElement('li'));
        if (child['wm-property'] === "in-reply-to") {
          li.innerHTML = `<p><a href="${child.url}">${author} replied \"${child.content.text}\"</a>`
        } else if (child['wm-property'] == 'like-of') {
          li.innerHTML = `<p><a href="${child.url}">${author} liked this</a>`   
        } else if (child['wm-property'] == 'repost-of') {
          li.innerHTML = `<p><a href="${child.url}">${author} reposted this</a>`   
        }
      })
    }); 
})();