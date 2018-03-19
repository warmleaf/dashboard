import styled from 'styled-components';

const Button = styled.button`
  display: ${props => (props.inline ? 'inline-flex' : 'flex')};
  font-size: ${props => props.size || null};
  width: ${props => props.w || null};
  height: ${props => props.h || null};
  line-height: ${props => props.lh || null};
  margin-top: ${props => props.mt || null};
  margin-right: ${props => props.mr || null};
  margin-bottom: ${props => props.mb || null};
  margin-left: ${props => props.ml || null};
  margin: ${props => props.m || null};
  padding-top: ${props => props.pt || '6px'};
  padding-right: ${props => props.pr || '10px'};
  padding-bottom: ${props => props.pb || '6px'};
  padding-left: ${props => props.pl || '10px'};
  padding: ${props => props.p || null};
  border: ${props => (props['no-border'] ? '0' : '1px')} solid
    ${props =>
    (props.disabled ? 'rgba(0,0,0,.1)' : props.bc || props.theme.primaryColor || 'transparent')};
  color: ${props =>
    (props.disabled
      ? 'rgba(0,0,0,.3)'
      : props.co || (props.primary ? '#fff' : props.theme.primaryText || '#000'))};
  background-color: ${props =>
    (props.disabled
      ? 'rgba(0,0,0,.03)'
      : props.bgc || (props.primary ? props.theme.primaryColor : 'transparent'))};
  border-radius: ${props => (props.round ? (props.round === true ? '200px' : props.round) : null)};
  outline: none;
  cursor: pointer;
  flex: ${props => (props.full ? 1 : null)};
  text-align: center;
  align-items: center;
  justify-content: ${props => (props.vc === true ? 'center' : props.vc)};
  transition: all 200ms;
  :hover {
    background-color: ${props => props['hover-bgc'] || null};
    color: ${props => props['hover-co'] || null};
    box-shadow: ${props => props['hover-shadow'] || null};
    & .hco {
      color: ${props => props['hover-co'] || null} !important;
    }
    & .hbgc {
      background-color: ${props => props['hover-bgc'] || null} !important;
    }
  }
`;

export default Button;
