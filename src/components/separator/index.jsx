import styled from 'styled-components';

const Separator = styled.div`
  position: relative;
  width: ${props => (props.h ? '1px' : '100%')};
  margin-top: ${props => props.mt || null};
  margin-right: ${props => props.mr || null};
  margin-bottom: ${props => props.mb || null};
  margin-left: ${props => props.ml || null};
  margin: ${props => props.m || null};
  position: relative;
  height: ${props => (props.h ? '100%' : '1px')};
  backface-visibility: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translateZ(0) scale(1, 1);
  z-index: 3;
  &:after {
    height: ${props => (props.h && props.size ? props.size : '100%')};
    background: #e8e8e8;
    background: -moz-linear-gradient(
      left,
      transparent 0%,
      rgba(0, 0, 0, 0.09) 35%,
      rgba(0, 0, 0, 0.09) 70%,
      transparent 100%
    );
    background: -webkit-gradient(
      linear,
      left top,
      right top,
      color-stop(0%, transparent),
      color-stop(35%, rgba(0, 0, 0, 0.09)),
      color-stop(70%, rgba(0, 0, 0, 0.09)),
      color-stop(100%, transparent)
    );
    background: -webkit-linear-gradient(
      left,
      transparent 0%,
      rgba(0, 0, 0, 0.09) 35%,
      rgba(0, 0, 0, 0.09) 70%,
      transparent 100%
    );
    background: -o-linear-gradient(
      left,
      transparent 0%,
      rgba(0, 0, 0, 0.09) 35%,
      rgba(0, 0, 0, 0.09) 70%,
      transparent 100%
    );
    background: -ms-linear-gradient(
      left,
      transparent 0%,
      rgba(0, 0, 0, 0.09) 35%,
      rgba(0, 0, 0, 0.09) 70%,
      transparent 100%
    );
    background: linear-gradient(
      to right,
      transparent 0%,
      rgba(0, 0, 0, 0.09) 35%,
      rgba(0, 0, 0, 0.09) 70%,
      transparent 100%
    );
    content: '';
    width: ${props => (props.v && props.size ? props.size : '100%')};
  }
`;
export default Separator;
