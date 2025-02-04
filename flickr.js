const fetch = require("node-fetch");

class Flickr {
 async search(query, opt_size) {
  let endpoint = "https://api.flickr.com/services/rest";
  let method = "method=flickr.photos.search";
  let key = "73dcc158504f1a4c3c95203a1b55e235";
  let format = "format=json&nojsoncallback=1";
  let size = opt_size ? opt_size : "40";
  let text = encodeURIComponent(query);
  let api = `${endpoint}/?${method}&api_key=${key}&text=${text}&${format}&per_page=${size}&sort=relevance`;

  let result = await fetch(api);
  let data = await result.json();
  // console.log(JSON.stringify(data, undefined, 2));
  return data.photos.photo.map(photo => {
    let url = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`;                    
    return url;
   });
 }
}

module.exports = {
 Flickr: Flickr
};
