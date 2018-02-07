import React, { Component } from 'react';
import styled from 'styled-components';
import Link from 'react-router-dom/Link';

function willCss(dom) {
  return styled(dom)`
    transition: all 200ms;
    display: ${props => (props.inline ? 'inline-flex' : 'flex')};
    color: ${props => props.co || '#000'};
    text-decoration: ${props => props.decoration || 'none'};
    margin-top: ${props => props.mt || null};
    margin-right: ${props => props.mr || null};
    margin-bottom: ${props => props.mb || null};
    margin-left: ${props => props.ml || null};
    margin: ${props => props.m || null};
    align-items: center;
    justify-content: center;
    font-size: ${props => props.size || null};
    z-index: ${props => props.z || null};
    :hover {
      background-color: ${props => props['hover-bgc'] || null};
      color: ${props => props['hover-co'] || null};
      & .hco {
        color: ${props => props['hover-co'] || null} !important;
      }
      & .hbgc {
        background-color: ${props => props['hover-bgc'] || null} !important;
      }
    }
  `;
}

export function parseSearch(search) {
  if (search.indexOf('?') !== 0) {
    console.warn('not a search URL');
    return null;
  }
  const item = search.substr(1).split('&');
  if (item.length === 0) return undefined;
  const obj = {};
  item.map((elm) => {
    const _ = elm.split('=');
    obj[_[0]] = _[1];
  });
  return obj;
}

export function setSearch(search, seter) {
  const _ = parseSearch(search);
  const rep = seter.split('=');
  const rxp = new RegExp(`${rep[0]}=[^&].*`, 'ig');
  if (rxp.test(search)) {
    return search.replace(rxp, seter);
  }
  return `${search}&${seter}`;
}

const Href = ({
  src, base, keep, children, ...rest
}) => {
  if (typeof src === 'string' && src.indexOf('//') === 0) {
    const A = willCss('a');
    return (
      <A {...rest} href={src}>
        {children}
      </A>
    );
  }
  const Alink = willCss(Link);
  let _src = src;
  if (typeof window !== 'undefined') {
    const win_search = window.location.search;
    if (typeof src === 'object') {
      const {
        pathname, hash, search, state
      } = src;
      _src = {
        pathname,
        hash,
        state,
        search: keep ? setSearch(win_search, search) : `?${search}`
      };
    }
  }
  // just route to pathname when not browser
  return (
    <Alink {...rest} to={_src}>
      {children}
    </Alink>
  );
};

export default Href;
