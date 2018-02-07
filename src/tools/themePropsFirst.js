const cssTypes = {
    h: "height",
    w: "width",
    bc: "background-color",
    br: "border-radius",
    pd: "padding",
    ws: "white-space",
    mw: "max-width",
    lc: "line-clamp",
    bs: "box-shadow",
    fs: "font-size",
}

const themePropsFirst = (props, css) => {
    const { theme, cid } = props;
    if (theme && cid) {
        const selfTheme = theme[cid];
        if (selfTheme) {
            const keyStyle = selfTheme[cssTypes[css]];
            return keyStyle ? ifUnit(keyStyle, css) : ifUnit(props[css], css);
        }
    }
    return isfloat(props[css]);
}

export const ifUnit = (key, css) => {
    if (["lc"].indexOf(css) >= 0) {
        return key;
    }
    return isfloat(key);
}

export const isfloat = (num) => {
    if (!num) return null;
    if (typeof num === 'number') {
        return `${num}px`;
    }
    return num;
}

export default themePropsFirst;