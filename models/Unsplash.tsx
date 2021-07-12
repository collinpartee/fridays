export default class UnsplashData {
  alt_description: string;
  uri: string;
  textColor: string;
  attribution: string;
  backgroundColor: string;
  source: string;

  constructor(data: any) {
    this.alt_description = data.alt_description;
    this.textColor = data.color;
    this.attribution = data.user.username
    this.source = data.links.html;
    this.backgroundColor = GetBackgroundColor(data.color);
    this.uri = data.urls.regular;
  }

  
}

function GetBackgroundColor(color: string): string {
  let _color = color.replace('#', '');
  _color = (parseInt('FFFFFF', 16) - parseInt(_color, 16)).toString(16);
  return '#'+_color;
}