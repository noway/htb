import { encode } from 'html-entities';

type Attrs = Record<string, string | true>;
type HtbChainer = (name: string, attrs?: Attrs, childrenCb?: ChildrenCb | Children) => HtbElement;
type HtbElement = { html: string, [HTB_ELEMENT_MARKER]: true } & HtbChainer;
type StringOrHtbElement = string | HtbElement;
type Children = StringOrHtbElement | StringOrHtbElement[];
type ChildrenCb = () => Children;

const HTB_ELEMENT_MARKER = Symbol('HTB_ELEMENT_MARKER');
const Htb = (name: string, attrs: Attrs = {}, childrenCb: ChildrenCb | Children = () => ''): HtbElement => {
  const htbChainer = (name: string, attrs: Attrs = {}, childrenCb: ChildrenCb | Children = () => ''): HtbElement => {
    const attrsStr = Object.entries(attrs).map(([key, value]) => value === true ? `${key}` : `${key}="${encode(value)}"`).join(' ');
    const openTag = attrsStr ? `<${name} ${attrsStr}>` : `<${name}>`;
    const closeTag = `</${name}>`;
    const children = typeof childrenCb === 'function' ? (childrenCb as ChildrenCb)() : childrenCb;
    let childrenStr = '';
    if (Array.isArray(children)) {
      for (const child of children) {
        childrenStr += Object.hasOwn(child as object, HTB_ELEMENT_MARKER) ? (child as HtbElement).html : encode(child as string);
      }
    } else {
      childrenStr = Object.hasOwn(children as object, HTB_ELEMENT_MARKER) ? (children as HtbElement).html : encode(children as string);
    }
    if (childrenStr === '') {
      htbChainer.html += `${openTag}`;
      return htbChainer;
    }
    else {
      htbChainer.html += `${openTag}${childrenStr}${closeTag}`;
      return htbChainer;
    }
  }
  htbChainer.html = '';
  htbChainer[HTB_ELEMENT_MARKER] = true as const;
  return htbChainer(name, attrs, childrenCb);
}

export default Htb;
export { Htb };
