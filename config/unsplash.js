import Unsplash from 'unsplash-js';

const config = {
  applicationId: "32ff113a39f558a3ba4282a160fd5414b89fe6a25d19d7a40ed1f1d453ba9387",
  secret: "275d2090ccaed4b562638a31e7a4ade85b80e16ba096a40409a83ecc8efbb753",
//   callbackUrl: "{CALLBACK_URL}"
};

export const unsplash = new Unsplash(config);