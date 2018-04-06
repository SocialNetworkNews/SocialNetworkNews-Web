import {Inject, Pipe, PipeTransform} from '@angular/core';
import * as linkify from 'linkifyjs';
import * as linkifyStr from 'linkifyjs/string';
import * as hashtag from 'linkifyjs/plugins/hashtag';
import * as mention from 'linkifyjs/plugins/mention';
import {DOCUMENT} from '@angular/common';

@Pipe({name: 'linkify'})
export class LinkifyPipe implements PipeTransform {
  constructor(
    @Inject(DOCUMENT) dom: Document) {
    hashtag(linkify);
    mention(linkify);
  }
  transform(str: string): string {
    return str ? linkifyStr(str, {target: '_blank', attributes: {rel: 'noopener noreferrer'}}) : str;
  }
}
