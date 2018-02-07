import styled from "styled-components";

/**
 * wrapped with css properties
 * 
 * @param {string[]} CSSProperties
 * @returns 
 */
function withCssProps(dom) {
  return styled[dom]`
    align-content: ${(props) => props['alco'] || null};
    align-items: ${(props) => props['alit'] || null};
    align-self: ${(props) => props['alse'] || null};
    alignment-adjust: ${(props) => props['alad'] || null};
    alignment-baseline: ${(props) => props['alba'] || null};
    animation-delay: ${(props) => props['ande'] || null};
    animation-direction: ${(props) => props['andi'] || null};
    animation-iteration-count: ${(props) => props['anitco'] || null};
    animation-name: ${(props) => props['anna'] || null};
    animation-play-state: ${(props) => props['anplst'] || null};
    appearance: ${(props) => props.appearance || null};
    backface-visibility: ${(props) => props['bavi'] || null};
    background: ${(props) => props.background || null};
    background-attachment: ${(props) => props['baat'] || null};
    background-blend-mode: ${(props) => props['bablmo'] || null};
    background-color: ${(props) => props['baco'] || null};
    background-composite: ${(props) => props['bacom'] || null};
    background-image: ${(props) => props['baim'] || null};
    background-origin: ${(props) => props['baor'] || null};
    background-position: ${(props) => props['bapo'] || null};
    background-repeat: ${(props) => props['bare'] || null};
    background-size: ${(props) => props['basi'] || null};
    baseline-shift: ${(props) => props['bash'] || null};
    behavior: ${(props) => props.behavior || null};
    border: ${(props) => props.border || null};
    border-bottom: ${(props) => props['bobo'] || null};
    border-bottom-color: ${(props) => props['boboco'] || null};
    border-bottom-left-radius: ${(props) => props['bblr'] || null};
    border-bottom-right-radius: ${(props) => props['bbrr'] || null};
    border-bottom-style: ${(props) => props['bobost'] || null};
    border-bottom-width: ${(props) => props['bobowi'] || null};
    border-collapse: ${(props) => props['bocol'] || null};
    border-color: ${(props) => props['boco'] || null};
    border-corner-shape: ${(props) => props['bocosh'] || null};
    border-image-source: ${(props) => props['boimso'] || null};
    border-image-width: ${(props) => props['boimwi'] || null};
    border-left: ${(props) => props['bole'] || null};
    border-left-color: ${(props) => props['boleco'] || null};
    border-left-style: ${(props) => props['bolest'] || null};
    border-left-width: ${(props) => props['bolewi'] || null};
    border-radius: ${(props) => props['bora'] || null};
    border-right: ${(props) => props['bori'] || null};
    border-right-color: ${(props) => props['borico'] || null};
    border-right-style: ${(props) => props['borist'] || null};
    border-right-width: ${(props) => props['boriwi'] || null};
    border-spacing: ${(props) => props['bosp'] || null};
    border-style: ${(props) => props['bost'] || null};
    border-top: ${(props) => props['boto'] || null};
    border-top-color: ${(props) => props['botoco'] || null};
    border-top-left-radius: ${(props) => props['btlr'] || null};
    border-top-right-radius: ${(props) => props['btrr'] || null};
    border-top-style: ${(props) => props['botost'] || null};
    border-top-width: ${(props) => props['botowi'] || null};
    border-width: ${(props) => props['bowi'] || null};
    bottom: ${(props) => props.bottom || null};
    box-align: ${(props) => props['boal'] || null};
    box-decoration-break: ${(props) => props['bodebr'] || null};
    box-direction: ${(props) => props['bodi'] || null};
    box-line-progression: ${(props) => props['bolipr'] || null};
    box-lines: ${(props) => props['boli'] || null};
    box-ordinal-group: ${(props) => props['boorgr'] || null};
    box-flex: ${(props) => props['bofl'] || null};
    box-flex-group: ${(props) => props['boflgr'] || null};
    box-shadow: ${(props) => props['bosh'] || null};
    box-sizing: ${(props) => props['bosi'] || null};
    break-after: ${(props) => props['braf'] || null};
    break-before: ${(props) => props['brbe'] || null};
    break-inside: ${(props) => props['brin'] || null};
    clear: ${(props) => props.clear || null};
    clip: ${(props) => props.clip || null};
    clip-rule: ${(props) => props['clru'] || null};
    color: ${(props) => props.color || null};
    column-count: ${(props) => props['coco'] || null};
    column-fill: ${(props) => props['cofi'] || null};
    column-gap: ${(props) => props['coga'] || null};
    column-rule: ${(props) => props['coru'] || null};
    column-rule-color: ${(props) => props['coruco'] || null};
    column-rule-width: ${(props) => props['coruwi'] || null};
    column-span: ${(props) => props['cosp'] || null};
    column-width: ${(props) => props['cowi'] || null};
    columns: ${(props) => props.columns || null};
    counter-increment: ${(props) => props['coin'] || null};
    counter-reset: ${(props) => props['core'] || null};
    cue: ${(props) => props.cue || null};
    cue-after: ${(props) => props['cuaf'] || null};
    cursor: ${(props) => props.cursor || null};
    direction: ${(props) => props.direction || null};
    display: ${(props) => props.display || null};
    fill: ${(props) => props.fill || null};
    fill-opacity: ${(props) => props['fiop'] || null};
    fill-rule: ${(props) => props['firu'] || null};
    filter: ${(props) => props.filter || null};
    flex: ${(props) => props.flex || null};
    flex-align: ${(props) => props['flal'] || null};
    flex-basis: ${(props) => props['flba'] || null};
    flex-direction: ${(props) => props['fldi'] || null};
    flex-flow: ${(props) => props['flfl'] || null};
    flex-grow: ${(props) => props['flgr'] || null};
    flex-itemalign: ${(props) => props['flit'] || null};
    flex-line-pack: ${(props) => props['fllipa'] || null};
    flex-order: ${(props) => props['flor'] || null};
    flex-shrink: ${(props) => props['flsh'] || null};
    flex-wrap: ${(props) => props['flwr'] || null};
    float: ${(props) => props.float || null};
    flow-from: ${(props) => props['flfr'] || null};
    font: ${(props) => props.font || null};
    font-family: ${(props) => props['fofa'] || null};
    font-kerning: ${(props) => props['foke'] || null};
    font-size: ${(props) => props['fosi'] || null};
    font-size-adjust: ${(props) => props['fosiad'] || null};
    font-stretch: ${(props) => props['fostr'] || null};
    font-style: ${(props) => props['fost'] || null};
    font-synthesis: ${(props) => props['fosy'] || null};
    font-variant: ${(props) => props['fova'] || null};
    font-variant-alternates: ${(props) => props['fovaal'] || null};
    font-weight: ${(props) => props['fowe'] || null};
    grid-area: ${(props) => props['grar'] || null};
    grid-column: ${(props) => props['grco'] || null};
    grid-column-end: ${(props) => props['grcoen'] || null};
    grid-column-start: ${(props) => props['grcost'] || null};
    grid-row: ${(props) => props['grro'] || null};
    grid-row-end: ${(props) => props['grroen'] || null};
    grid-row-position: ${(props) => props['grropo'] || null};
    grid-row-span: ${(props) => props['grrosp'] || null};
    grid-template-areas: ${(props) => props['grtear'] || null};
    grid-template-columns: ${(props) => props['grteco'] || null};
    grid-template-rows: ${(props) => props['grtero'] || null};
    height: ${(props) => props.height || null};
    hyphenate-limit-chars: ${(props) => props['hylich'] || null};
    hyphenate-limit-lines: ${(props) => props['hylili'] || null};
    hyphenate-limit-zone: ${(props) => props['hylizo'] || null};
    hyphens: ${(props) => props.hyphens || null};
    ime-mode: ${(props) => props['immo'] || null};
    justify-content: ${(props) => props['juco'] || null};
    layout-grid: ${(props) => props['lagr'] || null};
    layout-grid-char: ${(props) => props['laygrch'] || null};
    layout-grid-line: ${(props) => props['laygrli'] || null};
    layout-grid-mode: ${(props) => props['laygrmo'] || null};
    layout-grid-type: ${(props) => props['lagrty'] || null};
    left: ${(props) => props.left || null};
    letter-spacing: ${(props) => props['lesp'] || null};
    line-break: ${(props) => props['libr'] || null};
    line-clamp: ${(props) => props['licl'] || null};
    line-height: ${(props) => props['lihe'] || null};
    list-style: ${(props) => props['list'] || null};
    list-style-image: ${(props) => props['listim'] || null};
    list-style-position: ${(props) => props['listpo'] || null};
    list-style-type: ${(props) => props['listty'] || null};
    margin: ${(props) => props.margin || null};
    margin-bottom: ${(props) => props['mabo'] || null};
    margin-left: ${(props) => props['male'] || null};
    margin-right: ${(props) => props['mari'] || null};
    margin-top: ${(props) => props['mato'] || null};
    marquee-direction: ${(props) => props['madi'] || null};
    marquee-style: ${(props) => props['mast'] || null};
    mask: ${(props) => props.mask || null};
    mask-border: ${(props) => props['msbo'] || null};
    mask-border-repeat: ${(props) => props['msbore'] || null};
    mask-border-slice: ${(props) => props['msbosl'] || null};
    mask-border-source: ${(props) => props['msboso'] || null};
    mask-border-width: ${(props) => props['msbowi'] || null};
    mask-clip: ${(props) => props['macl'] || null};
    mask-origin: ${(props) => props['maor'] || null};
    max-font-size: ${(props) => props['mafosi'] || null};
    max-height: ${(props) => props['mahe'] || null};
    max-width: ${(props) => props['mawi'] || null};
    min-height: ${(props) => props['mihe'] || null};
    min-width: ${(props) => props['miwi'] || null};
    opacity: ${(props) => props.opacity || null};
    order: ${(props) => props.order || null};
    orphans: ${(props) => props.orphans || null};
    outline: ${(props) => props.outline || null};
    outline-color: ${(props) => props['ouco'] || null};
    outline-offset: ${(props) => props['ouof'] || null};
    overflow: ${(props) => props.overflow || null};
    overflow-style: ${(props) => props['ovst'] || null};
    overflow-x: ${(props) => props['ovx'] || null};
    overflow-y: ${(props) => props['ovy'] || null};
    padding: ${(props) => props.padding || null};
    padding-bottom: ${(props) => props['pabo'] || null};
    padding-left: ${(props) => props['pale'] || null};
    padding-right: ${(props) => props['pari'] || null};
    padding-top: ${(props) => props['pato'] || null};
    page-break-after: ${(props) => props['pabraf'] || null};
    page-break-before: ${(props) => props['pabrbe'] || null};
    page-break-inside: ${(props) => props['pabrin'] || null};
    pause: ${(props) => props.pause || null};
    pause-before: ${(props) => props['pabe'] || null};
    perspective: ${(props) => props.perspective || null};
    perspective-origin: ${(props) => props['peor'] || null};
    pointer-events: ${(props) => props['poev'] || null};
    position: ${(props) => props.position || null};
    punctuation-trim: ${(props) => props['putr'] || null};
    quotes: ${(props) => props.quotes || null};
    region-fragment: ${(props) => props['refr'] || null};
    rest-after: ${(props) => props['reaf'] || null};
    rest-before: ${(props) => props['rebe'] || null};
    right: ${(props) => props.right || null};
    ruby-align: ${(props) => props['rual'] || null};
    ruby-position: ${(props) => props['rupo'] || null};
    shape-image-threshold: ${(props) => props['shimth'] || null};
    shape-inside: ${(props) => props['shin'] || null};
    shape-margin: ${(props) => props['shma'] || null};
    shape-outside: ${(props) => props['shou'] || null};
    speak: ${(props) => props.speak || null};
    speak-as: ${(props) => props['spas'] || null};
    stroke-opacity: ${(props) => props['stop'] || null};
    stroke-width: ${(props) => props['stwi'] || null};
    tab-size: ${(props) => props['tasi'] || null};
    table-layout: ${(props) => props['tala'] || null};
    text-align: ${(props) => props['teal'] || null};
    text-align-last: ${(props) => props['tealla'] || null};
    text-decoration: ${(props) => props['tede'] || null};
    text-decoration-color: ${(props) => props['tedeco'] || null};
    text-decoration-line: ${(props) => props['tedeli'] || null};
    text-decoration-line-through: ${(props) => props['tdlt'] || null};
    text-decoration-none: ${(props) => props['tedeno'] || null};
    text-decoration-overline: ${(props) => props['tedeov'] || null};
    text-decoration-skip: ${(props) => props['tedesk'] || null};
    text-decoration-style: ${(props) => props['tedest'] || null};
    text-decoration-underline: ${(props) => props['tedeun'] || null};
    text-emphasis: ${(props) => props['teem'] || null};
    text-emphasis-color: ${(props) => props['teemco'] || null};
    text-emphasis-style: ${(props) => props['teemst'] || null};
    text-height: ${(props) => props['tehe'] || null};
    text-indent: ${(props) => props['tein'] || null};
    text-justify-trim: ${(props) => props['tejutr'] || null};
    text-kashida-space: ${(props) => props['tekasp'] || null};
    text-line-through: ${(props) => props['telith'] || null};
    text-line-through-color: ${(props) => props['tltc'] || null};
    text-line-through-mode: ${(props) => props['tltm'] || null};
    text-line-through-style: ${(props) => props['tlts'] || null};
    text-line-through-width: ${(props) => props['tltw'] || null};
    text-overflow: ${(props) => props['tefl'] || null};
    text-overline: ${(props) => props['teli'] || null};
    text-overline-color: ${(props) => props['teovco'] || null};
    text-overline-mode: ${(props) => props['teovmo'] || null};
    text-overline-style: ${(props) => props['teovst'] || null};
    text-overline-width: ${(props) => props['teovwi'] || null};
    text-rendering: ${(props) => props['tere'] || null};
    text-script: ${(props) => props['tesc'] || null};
    text-shadow: ${(props) => props['tesh'] || null};
    text-transform: ${(props) => props['tetr'] || null};
    text-underline-position: ${(props) => props['teunpo'] || null};
    text-underline-style: ${(props) => props['teunst'] || null};
    top: ${(props) => props.top || null};
    touch-action: ${(props) => props['toac'] || null};
    transform: ${(props) => props.transform || null};
    transform-origin: ${(props) => props['tror'] || null};
    transform-origin-z: ${(props) => props['trorz'] || null};
    transform-style: ${(props) => props['trst'] || null};
    transition: ${(props) => props.transition || null};
    transition-delay: ${(props) => props['trde'] || null};
    transition-duration: ${(props) => props['trdu'] || null};
    transition-property: ${(props) => props['trpr'] || null};
    transition-timing-function: ${(props) => props['trtifu'] || null};
    unicode-bidi: ${(props) => props['unbi'] || null};
    unicode-range: ${(props) => props['unra'] || null};
    user-input: ${(props) => props['usin'] || null};
    vertical-align: ${(props) => props['veal'] || null};
    visibility: ${(props) => props.visibility || null};
    voice-balance: ${(props) => props['voba'] || null};
    voice-duration: ${(props) => props['vodu'] || null};
    voice-family: ${(props) => props['vofa'] || null};
    voice-pitch: ${(props) => props['vopi'] || null};
    voice-range: ${(props) => props['voran'] || null};
    voice-rate: ${(props) => props['vora'] || null};
    voice-stress: ${(props) => props['vost'] || null};
    voice-volume: ${(props) => props['vovo'] || null};
    white-space-treatment: ${(props) => props['whsptr'] || null};
    widows: ${(props) => props.widows || null};
    width: ${(props) => props.width || null};
    word-break: ${(props) => props['wobr'] || null};
    word-spacing: ${(props) => props['wosp'] || null};
    word-wrap: ${(props) => props['wowr'] || null};
    wrap-flow: ${(props) => props['wrfl'] || null};
    wrap-margin: ${(props) => props['wrma'] || null};
    wrap-option: ${(props) => props['wrop'] || null};
    writing-mode: ${(props) => props['wrmo'] || null};
    z-index: ${(props) => props['z'] || null};
    zoom: ${(props) => props.zoom || null};
  `
}

export default {
  A: withCssProps('a'),
  Abbr: withCssProps('abbr'),
  Address: withCssProps('address'),
  Area: withCssProps('area'),
  Article: withCssProps('article'),
  Aside: withCssProps('aside'),
  Audio: withCssProps('audio'),
  B: withCssProps('b'),
  Base: withCssProps('base'),
  Bdi: withCssProps('bdi'),
  Bdo: withCssProps('bdo'),
  Big: withCssProps('big'),
  Blockquote: withCssProps('blockquote'),
  Body: withCssProps('body'),
  Br: withCssProps('br'),
  Button: withCssProps('button'),
  Canvas: withCssProps('canvas'),
  Caption: withCssProps('caption'),
  Cite: withCssProps('cite'),
  Code: withCssProps('code'),
  Col: withCssProps('col'),
  Colgroup: withCssProps('colgroup'),
  Data: withCssProps('data'),
  Datalist: withCssProps('datalist'),
  Dd: withCssProps('dd'),
  Del: withCssProps('del'),
  Details: withCssProps('details'),
  Dfn: withCssProps('dfn'),
  Dialog: withCssProps('dialog'),
  Div: withCssProps('div'),
  Dl: withCssProps('dl'),
  Dt: withCssProps('dt'),
  Em: withCssProps('em'),
  Embed: withCssProps('embed'),
  Fieldset: withCssProps('fieldset'),
  Figcaption: withCssProps('figcaption'),
  Figure: withCssProps('figure'),
  Footer: withCssProps('footer'),
  Form: withCssProps('form'),
  H1: withCssProps('h1'),
  H2: withCssProps('h2'),
  H3: withCssProps('h3'),
  H4: withCssProps('h4'),
  H5: withCssProps('h5'),
  H6: withCssProps('h6'),
  Head: withCssProps('head'),
  Header: withCssProps('header'),
  Hgroup: withCssProps('hgroup'),
  Hr: withCssProps('hr'),
  Html: withCssProps('html'),
  I: withCssProps('i'),
  Iframe: withCssProps('iframe'),
  Img: withCssProps('img'),
  Input: withCssProps('input'),
  Ins: withCssProps('ins'),
  Kbd: withCssProps('kbd'),
  Keygen: withCssProps('keygen'),
  Label: withCssProps('label'),
  Legend: withCssProps('legend'),
  Li: withCssProps('li'),
  Link: withCssProps('link'),
  Main: withCssProps('main'),
  Map: withCssProps('map'),
  Mark: withCssProps('mark'),
  Menu: withCssProps('menu'),
  Menuitem: withCssProps('menuitem'),
  Meta: withCssProps('meta'),
  Meter: withCssProps('meter'),
  Nav: withCssProps('nav'),
  // Noindex: withCssProps('noindex'),
  Noscript: withCssProps('noscript'),
  Object: withCssProps('object'),
  Ol: withCssProps('ol'),
  Optgroup: withCssProps('optgroup'),
  Option: withCssProps('option'),
  Output: withCssProps('output'),
  P: withCssProps('p'),
  Param: withCssProps('param'),
  Picture: withCssProps('picture'),
  Pre: withCssProps('pre'),
  Progress: withCssProps('progress'),
  Q: withCssProps('q'),
  Rp: withCssProps('rp'),
  Rt: withCssProps('rt'),
  Ruby: withCssProps('ruby'),
  S: withCssProps('s'),
  Samp: withCssProps('samp'),
  Script: withCssProps('script'),
  Section: withCssProps('section'),
  Select: withCssProps('select'),
  Small: withCssProps('small'),
  Source: withCssProps('source'),
  Span: withCssProps('span'),
  Style: withCssProps('style'),
  Sub: withCssProps('sub'),
  Summary: withCssProps('summary'),
  Sup: withCssProps('sup'),
  Table: withCssProps('table'),
  Tbody: withCssProps('tbody'),
  Td: withCssProps('td'),
  Textarea: withCssProps('textarea'),
  Tfoot: withCssProps('tfoot'),
  Th: withCssProps('th'),
  Thead: withCssProps('thead'),
  Time: withCssProps('time'),
  Title: withCssProps('title'),
  Tr: withCssProps('tr'),
  Track: withCssProps('track'),
  U: withCssProps('u'),
  Ul: withCssProps('ul'),
  Strong: withCssProps('strong'),
  Video: withCssProps('video'),
  Wbr: withCssProps('wbr'),
  Svg: withCssProps('svg'),
  // Animate: withCssProps('animate'),
  // AnimateTransform: withCssProps('animateTransform'),
  Circle: withCssProps('circle'),
  ClipPath: withCssProps('clipPath'),
  Defs: withCssProps('defs'),
  // Desc: withCssProps('desc'),
  Ellipse: withCssProps('ellipse'),
  // FeBlend: withCssProps('feBlend'),
  // FeColorMatrix: withCssProps('feColorMatrix'),
  // FeComponentTransfer: withCssProps('feComponentTransfer'),
  // FeComposite: withCssProps('feComposite'),
  // FeConvolveMatrix: withCssProps('feConvolveMatrix'),
  // FeDiffuseLighting: withCssProps('feDiffuseLighting'),
  // FeDisplacementMap: withCssProps('feDisplacementMap'),
  // FeDistantLight: withCssProps('feDistantLight'),
  // FeFlood: withCssProps('feFlood'),
  // FeFuncA: withCssProps('feFuncA'),
  // FeFuncB: withCssProps('feFuncB'),
  // FeFuncG: withCssProps('feFuncG'),
  // FeFuncR: withCssProps('feFuncG'),
  // FeGaussianBlur: withCssProps('feGaussianBlur'),
  // FeImage: withCssProps('feImage'),
  // FeMerge: withCssProps('feMerge'),
  // FeMergeNode: withCssProps('feMergeNode'),
  // FeMorphology: withCssProps('feMorphology'),
  // FeOffset: withCssProps('feOffset'),
  // FePointLight: withCssProps('fePointLight'),
  // FeSpecularLighting: withCssProps('feSpecularLighting'),
  // FeSpotLight: withCssProps('feSpotLight'),
  // FeTile: withCssProps('feTile'),
  // FeTurbulence: withCssProps('feTurbulence'),
  // Filter: withCssProps('filter'),
  // ForeignObject: withCssProps('foreignObject'),
  G: withCssProps('g'),
  Image: withCssProps('image'),
  Line: withCssProps('line'),
  LinearGradient: withCssProps('linearGradient'),
  // Marker: withCssProps('marker'),
  Mask: withCssProps('mask'),
  // Metadata: withCssProps('metadata'),
  Path: withCssProps('path'),
  Pattern: withCssProps('pattern'),
  Polygon: withCssProps('polygon'),
  Polyline: withCssProps('polyline'),
  RadialGradient: withCssProps('radialGradient'),
  Rect: withCssProps('rect'),
  Stop: withCssProps('stop'),
  // Symbol: withCssProps('symbol'),
  Text: withCssProps('text'),
  // TextPath: withCssProps('textPath'),
  Tspan: withCssProps('tspan'),
  // Use: withCssProps('use'),
  // View: withCssProps('view'),
}
