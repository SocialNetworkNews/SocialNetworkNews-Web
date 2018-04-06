// Type definitions for linkifyjs v2.1.3
// Project: https://github.com/SoapBox/linkifyjs
// Definitions by: Aleksey Nemiro <https://github.com/alekseynemiro>
declare namespace LinkifyJs {

  interface ILinkifyOptions {

    /** Object of attributes to add to each new link. Note: the class and target attributes have dedicated options. */
    attributes?: any | (( href, type ) => void);

    /** class attribute to use for newly created links. */
    className?: string;

    /** Protocol that should be used in href attributes for URLs without a protocol (e.g., github.com). */
    defaultProtocol?: string;

    /** Add event listeners to newly created link elements. Takes a hash where each key is an standard event name and the value is an event handler. */
    events?: any | (( href, type ) => void);

    /** Format the text displayed by a linkified entity. e.g., truncate a long URL. */
    format?: (( value, type ) => void) | any;

    /** Similar to format, except the result of this function will be used as the href attribute of the new link. */
    formatHref?: (( href, type ) => void) | any;

    /** Prevent linkify from trying to parse links in the specified tags. This is useful when running linkify on arbitrary HTML. */
    ignoreTags?: Array<string>;

    /** If true, \n line breaks will automatically be converted to <br> tags. */
    nl2br?: boolean;

    /** The tag name to use for each link. For cases where you can’t use anchor tags. */
    tagName?: string | (( href, type ) => void) | any;

    /** target attribute for generated link. */
    target?: string | (( href, type ) => void) | any;

    /** If option resolves to false, the given value will not show up as a link. */
    validate?: boolean;

  }


  type linkify = (value: string, options?: ILinkifyOptions) => string;

}

declare module 'linkifyjs' {

  export = LinkifyJs;

}

declare module 'linkifyjs/html' {

  export default function linkifyHtml(str: string, opts: Object): Array<string>;

}

declare module 'linkifyjs/string' {}

declare module 'linkifyjs/plugins/hashtag' {
  import ILinkifyOptions = LinkifyJs.ILinkifyOptions;
  type hashtag = (linkify: ILinkifyOptions) => void;
  export default hashtag;
}

declare module 'linkifyjs/plugins/mention' {
  import ILinkifyOptions = LinkifyJs.ILinkifyOptions;
  type mention = (linkify: ILinkifyOptions) => void;
  export default mention;
}

declare var linkify: LinkifyJs.linkify;
declare var linkifyHtml: LinkifyJs.linkify;
