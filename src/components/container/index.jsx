import styled from 'styled-components';
import themePropsFirst from '../../tools/themePropsFirst';

const Container = styled.div.attrs({
  display: props => props.hidden ? 'none' : props.ds ? props.ds : props.inline ? 'inline-block' : null,
  visibility: props => props.hidden ? 'hidden' : null,
  flex: props => props.full ? 1 : null,
  height: props => themePropsFirst(props, 'h'),
  width: props => themePropsFirst(props, 'w'),
  backgroundColor: props => themePropsFirst(props, 'bc'),
  overflowY: props => props => props.ofy ? 'auto' : 'hidden',
  overflowX: props => props.ofx ? 'auto' : 'hidden',
  alignItems: props => props.ai,
  position: props => props.fixed ? 'fixed' : props.absolute ? 'absolute' : props.relative ? 'relative' : null,
  left: props => props.lf ? `${props.lf}px` : null,
  top: props => props.tp ? props.tp + 'px' : null,
  bottom: props => props.bt ? props.bt + 'px' : null,
  right: props => props.rg ? props.rg + 'px' : null,
  transform: props => props.tf,
  borderRadius: props => themePropsFirst(props, 'br'),
  padding: props => themePropsFirst(props, 'pd'),
  paddingTop: props => themePropsFirst(props, 'pdt'),
  whiteSpace: props => themePropsFirst(props, 'ws'),
  maxWidth: props => themePropsFirst(props, 'mw'),
  lineClamp: props => themePropsFirst(props, 'lc'),
  boxShadow: props => themePropsFirst(props, 'bs'),
  fontSize: props => themePropsFirst(props, 'fs'),
})`
  display: ${props => props.display};
  visibility: ${props => props.visibility};
  flex: ${props => props.flex};
  height: ${props => props.height};
  width: ${props => props.width};
  background-color: ${props => props.backgroundColor};
  overflow-y: ${props => props.overflowY};
  overflow-x: ${props => props.overflowX};
  align-items: ${props => props.alignItems};
  position: ${props => props.position};
  left: ${props => props.left};
  top: ${props => props.top};
  bottom: ${props => props.bottom};
  right: ${props => props.right};
  transform: ${props => props.transform};
  border-radius: ${props => props.borderRadius};
  padding: ${props => props.padding};
  padding-top: ${props => props.paddingTop};
  white-space: ${props => props.whiteSpace};
  max-width: ${props => props.maxWidth};
  -webkit-line-clamp: ${props => props.lineClamp};
  box-shadow: ${props => props.boxShadow};
  font-size: ${props => props.fontSize};
  box-sizing: border-box;
`;
const cssType = [
  "algin-items",
  "display"
];

function cssJustify() {
  
};


function pickRightCss(context, style, filter) {
  let css;
  let paseudo;
  let className;
  const { theme, cid } = context;
  const classCase = (css) => {
    let _css_;
    switch (css) {
      case "$before":
        return _css_ = `&:before {
          ${context[css]}
        }`;
      case "$after":
        return _css_ = `&:after {
          ${context[css]}
        }`;
      case "$active":
        return _css_ = `&:active {
          ${context[css]}
        }`;
      default:
        return _css_ = css + ": ${" + filter + "};";
    }
  }
  if (!theme) {
    return classCase(style)
  } else if (theme[cid]) {

  }
}

export default Container;
