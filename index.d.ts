import { Listing, Submission } from 'snoowrap';

declare global {
  type RedditResponseType = Listing<Submission>;
  type ContentType = (Element | boolean)[];
  type AppendType = (
    content: ContentType,
    responseInput: RedditResponseType,
    windowOwner: string[],
    app: Element,
    willContinue: boolean,
    tagType: string,
  ) => void;
}
