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
      }

      return sub;
    })
  }



}


