export class Subreddits {
  subList: SubData[];

  constructor(data: any) {
    this.subList = data.data.data.children.map( d => {
      // console.log(d)
      var sub: SubData = {
        title: d.data.title,
        thumbnail : d.data.thumbnail,
        source: d.data.source,
        url: d.data.url,
        link: d.data.link,
        permalink: 'http://reddit.com' + d.data.permalink,
        videoSrc: d.data.secure_media && d.data.secure_media.reddit_video &&  d.data.secure_media.reddit_video.fallback_url,
        type: this.CheckMediaType(d.data)
      }

      return sub;
    })
  }

  CheckMediaType(data: any): string {
    // check if url is like 'i.redd.it'
    var iframe = data.url.indexOf('redd');

    if(iframe < 0) 
      return 'iframe'
    if(data.secure_media && data.secure_media.reddit_video &&  data.secure_media.reddit_video.fallback_url)
      return 'video'

    return 'image'
  }
}