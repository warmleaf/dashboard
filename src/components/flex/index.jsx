import styled from 'styled-components';

const Flex = styled.div`
  display: ${props => (props.hidden ? 'none' : props.inline ? 'inline-flex' : 'flex')};
  position: ${props => (props.abs ? 'absolute' : props.rela ? 'relative' : null)};
  flex-direction: ${props => (props.column ? 'column' : null)};
  width: ${props => props.w || null};
  top: ${props => props.tp || null};
  right: ${props => props.rt || null};
  left: ${props => props.lt || null};
  bottom: ${props => props.bm || null};
  min-width: ${props => props.miw || null};
  max-width: ${props => props.maw || null};
  height: ${props => props.h || null};
  min-height: ${props => props.mih || null};
  max-height: ${props => props.mah || null};
  background-color: ${props => props.bgc || null};
  background: ${props => props.bg || null};
  justify-content: ${props =>
    (!props.column
      ? props.vc ? (props.vc === true ? 'center' : props.vc) : null
      : props.hc ? (props.hc === true ? 'center' : props.hc) : null)};
  align-items: ${props =>
    (props.column
      ? props.vc ? (props.vc === true ? 'center' : props.vc) : null
      : props.hc ? (props.hc === true ? 'center' : props.hc) : null)};
  margin-top: ${props => props.mt || null};
  margin-right: ${props => props.mr || null};
  margin-bottom: ${props => props.mb || null};
  margin-left: ${props => props.ml || null};
  margin: ${props => props.m || null};
  padding-top: ${props => props.pt || null};
  padding-right: ${props => props.pr || null};
  padding-bottom: ${props => props.pb || null};
  padding-left: ${props => props.pl || null};
  padding: ${props => props.p || null};
  border-top: ${props => props.bt || null};
  border-right: ${props => props.br || null};
  border-bottom: ${props => props.bb || null};
  border-left: ${props => props.bl || null};
  border: ${props => props.b || null};
  align-self: ${props => props.as || null};
  flex: ${props => (props.full ? 1 : null)};
  border-radius: ${props => props.round || null};
  overflow: ${props => (props.nonOverflow ? 'hidden' : props.auto ? 'auto' : null)};
  transform: ${props => props.t || null};
  z-index: ${props => props.z || null};
  box-shadow: ${props => props.shadow || null};
  font-size: ${props => props.size || null};
  box-sizing: border-box;
  cursor: ${props => props.cur || null};

  &:hover,
  &.on {
    background-color: ${props => props['hover-bgc'] || null};
    color: ${props => props['hover-co'] || null};
    border-color: ${props => props['hover-bco'] || null};
    display: ${props => props['hover-show'] || null};
    & .hco {
      color: ${props => props['hover-co'] || null} !important;
    }
    & .hbgc {
      background-color: ${props => props['hover-bgc'] || null} !important;
    }
    & .hbco {
      border-color: ${props => props['hover-bco'] || null} !important;
    }
  }
`;

export default Flex;
