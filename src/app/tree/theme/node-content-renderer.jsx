import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectGlobal } from 'styled-components';
import { ContextMenuTrigger } from 'react-contextmenu';
import theme from '../../../theme.default';

/* eslint-disable  */
injectGlobal`
.rowWrapper {
  height: 100%;
  box-sizing: border-box;
  cursor: move;

  &:hover {
    opacity: 0.7;
  }

  &:active {
    opacity: 1;
  }
}

.rowWrapperDragDisabled {
  cursor: default;
}

.row {
  height: 100%;
  white-space: nowrap;
  display: flex;
  position: relative;

  & > * {
    box-sizing: border-box;
  }
}

/**
 * The outline of where the element will go if dropped, displayed while dragging
 */
.rowLandingPad {
  border: none;
  box-shadow: none;
  outline: none;

  * {
    opacity: 0 !important;
  }

  &::before {
    background-color: lightblue;
    border: 2px dotted black;
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -1;
  }
}

/**
 * Alternate appearance of the landing pad when the dragged location is invalid
 */
.rowCancelPad {
  @extend .rowLandingPad;

  &::before {
    background-color: #e6a8ad;
  }
}

/**
 * Nodes matching the search conditions are highlighted
 */
.rowSearchMatch {
  box-shadow: inset 0 -7px 7px -3px #0080ff;
}

/**
 * The node that matches the search conditions and is currently focused
 */
.rowSearchFocus {
  box-shadow: inset 0 -7px 7px -3px #fc6421;
}

%rowItem {
  display: inline-block;
  vertical-align: middle;
}

.rowContents {
  @extend %rowItem;
  position: relative;
  height: 100%;
  flex: 1 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.rowLabel {
  @extend %rowItem;
  margin-left: 6px;
  flex: 0 1 auto;
  padding-right: 20px;
  & > span{
    color: ${theme.defaultFontColorInDark};
    font-size: 14px;
  }
}

.rowToolbar {
  @extend %rowItem;
  flex: 0 1 auto;
  display: flex;
}


.toolbarButton {
  @extend %rowItem;
}

.collapseButton,
.expandButton {
  appearance: none;
  border: none;
  background: transparent;
  padding: 0;
  z-index: 2;
  position: absolute;
  top: 45%;
  width: 30px;
  height: 30px;
  transform: translate3d(-50%, -50%, 0);
  cursor: pointer;

  &::after {
    content: '';
    position: absolute;
    transform-origin: 7px 4px;
    transform: translate3d(-50%, -20%, 0);
    border: solid transparent 5px;
    border-left-width: 4px;
    border-right-width: 4px;
    border-top-color: gray;
  }

  &:hover::after {
    border-top-color: black;
  }

  &:focus {
    outline: none;

    &::after {
      filter: drop-shadow(0 0 1px #83bef9) drop-shadow(0 0 1px #83bef9)
        drop-shadow(0 0 1px #83bef9);
    }
  }
}

.expandButton::after {
  transform: translate3d(-50%, -20%, 0) rotateZ(-90deg);
}

/**
 * Line for under a node with children
 */
.lineChildren {
  height: 100%;
  display: inline-block;
}

/* ==========================================================================
   Scaffold
    Line-overlaid blocks used for showing the tree structure
   ========================================================================== */
.lineBlock {
  height: 100%;
  position: relative;
  display: inline-block;
  flex: 0 0 auto;
}

.absoluteLineBlock {
  @extend .lineBlock;
  position: absolute;
  top: 0;
}

/* Highlight line for pointing to dragged row destination
   ========================================================================== */
$highlight-color: #36c2f6;
$highlight-line-size: 6px; // Make it an even number for clean rendering

/**
 * +--+--+
 * |  |  |
 * |  |  |
 * |  |  |
 * +--+--+
 */
.highlightLineVertical {
  z-index: 3;

  &::before {
    position: absolute;
    content: '';
    background-color: $highlight-color;
    width: $highlight-line-size;
    margin-left: $highlight-line-size / -2;
    left: 50%;
    top: 0;
    height: 100%;
  }

  @keyframes arrow-pulse {
    $base-multiplier: 10;
    0% {
      transform: translate(0, 0);
      opacity: 0;
    }
    30% {
      transform: translate(0, 30% * $base-multiplier);
      opacity: 1;
    }
    70% {
      transform: translate(0, 70% * $base-multiplier);
      opacity: 1;
    }
    100% {
      transform: translate(0, 100% * $base-multiplier);
      opacity: 0;
    }
  }

  &::after {
    content: '';
    position: absolute;
    height: 0;
    margin-left: -1 * $highlight-line-size / 2;
    left: 50%;
    top: 0;
    border-left: $highlight-line-size / 2 solid transparent;
    border-right: $highlight-line-size / 2 solid transparent;
    border-top: $highlight-line-size / 2 solid white;
    animation: arrow-pulse 1s infinite linear both;
  }
}

/**
 * +-----+
 * |     |
 * |  +--+
 * |  |  |
 * +--+--+
 */
.highlightTopLeftCorner {
  &::before {
    z-index: 3;
    content: '';
    position: absolute;
    border-top: solid $highlight-line-size $highlight-color;
    border-left: solid $highlight-line-size $highlight-color;
    box-sizing: border-box;
    height: calc(50% + #{$highlight-line-size / 2});
    top: 50%;
    margin-top: $highlight-line-size / -2;
    right: 0;
    width: calc(50% + #{$highlight-line-size / 2});
  }
}

/**
 * +--+--+
 * |  |  |
 * |  |  |
 * |  +->|
 * +-----+
 */
.highlightBottomLeftCorner {
  $arrow-size: 7px;
  z-index: 3;

  &::before {
    content: '';
    position: absolute;
    border-bottom: solid $highlight-line-size $highlight-color;
    border-left: solid $highlight-line-size $highlight-color;
    box-sizing: border-box;
    height: calc(100% + #{$highlight-line-size / 2});
    top: 0;
    right: $arrow-size;
    width: calc(50% - #{$arrow-size - ($highlight-line-size / 2)});
  }

  &::after {
    content: '';
    position: absolute;
    height: 0;
    right: 0;
    top: 100%;
    margin-top: -1 * $arrow-size;
    border-top: $arrow-size solid transparent;
    border-bottom: $arrow-size solid transparent;
    border-left: $arrow-size solid $highlight-color;
  }
}
`
/* eslint-enable  */

function isDescendant(older, younger) {
  return (
    !!older.children &&
    typeof older.children !== 'function' &&
    older.children.some(child => child === younger || isDescendant(child, younger))
  );
}

// eslint-disable-next-line react/prefer-stateless-function
class FileThemeNodeContentRenderer extends Component {
  render() {
    const {
      scaffoldBlockPxWidth,
      toggleChildrenVisibility,
      connectDragPreview,
      connectDragSource,
      isDragging,
      canDrop,
      canDrag,
      node,
      title,
      draggedNode,
      path,
      treeIndex,
      isSearchMatch,
      isSearchFocus,
      icons,
      buttons,
      className,
      style,
      didDrop,
      lowerSiblingCounts,
      listIndex,
      swapFrom,
      swapLength,
      swapDepth,
      treeId, // Not needed, but preserved for other renderers
      isOver, // Not needed, but preserved for other renderers
      parentNode, // Needed for dndManager
      ...otherProps
    } = this.props;
    const nodeTitle = title || node.title;

    const isDraggedDescendant = draggedNode && isDescendant(draggedNode, node);
    const isLandingPadActive = !didDrop && isDragging;

    // Construct the scaffold representing the structure of the tree
    const scaffold = [];
    lowerSiblingCounts.forEach((lowerSiblingCount, i) => {
      scaffold.push(<div
        key={`pre_${1 + i}`}
        style={{ width: scaffoldBlockPxWidth }}
        className="lineBlock"
      />);

      if (treeIndex !== listIndex && i === swapDepth) {
        // This row has been shifted, and is at the depth of
        // the line pointing to the new destination
        let highlightLineClass = '';

        if (listIndex === (swapFrom + swapLength) - 1) {
          // This block is on the bottom (target) line
          // This block points at the target block (where the row will go when released)
          highlightLineClass = 'highlightBottomLeftCorner';
        } else if (treeIndex === swapFrom) {
          // This block is on the top (source) line
          highlightLineClass = 'highlightTopLeftCorner';
        } else {
          // This block is between the bottom and top
          highlightLineClass = 'highlightLineVertical';
        }

        scaffold.push(<div
          key={`highlight_${1 + i}`}
          style={{
            width: scaffoldBlockPxWidth,
            left: scaffoldBlockPxWidth * i
          }}
          className={`absoluteLineBlock ${highlightLineClass}`}
        />);
      }
    });

    const nodeContent = (
      <div style={{ height: '100%' }} {...otherProps}>
        {toggleChildrenVisibility &&
          node.children &&
          node.children.length > 0 && (
            <button
              type="button"
              aria-label={node.expanded ? 'Collapse' : 'Expand'}
              className={
                node.expanded ? 'collapseButton' : 'expandButton'
              }
              style={{
                left: (lowerSiblingCounts.length - 0.7) * scaffoldBlockPxWidth
              }}
              onClick={() =>
                toggleChildrenVisibility({
                  node,
                  path,
                  treeIndex
                })}
            />
          )}
        <ContextMenuTrigger id="tree_context">
          <div className={`rowWrapper${!canDrag ? ' rowWrapperDragDisabled' : ''}${isSearchFocus ? ' rowSearchFocus' : ''}`}>
            {/* Set the row preview to be used during drag and drop */}
            {connectDragPreview(<div style={{ display: 'flex' }}>
              {scaffold}
              <div
                className={`row${isLandingPadActive ? ' rowLandingPad' : ''}${isLandingPadActive && !canDrop
                  ? ' rowCancelPad' : ''}${isSearchMatch ? ' rowSearchMatch' : ''}${className ? ' className' : ''}`}
                style={{
                  opacity: isDraggedDescendant ? 0.5 : 1,
                  ...style
                }}
              >
                <div className={`rowContents${!canDrag ? ' rowContentsDragDisabled' : ''}`}>
                  <div className="rowToolbar">
                    {icons.map((icon, index) => (
                      <div
                        key={index} // eslint-disable-line react/no-array-index-key
                        className="toolbarButton"
                      >
                        {icon}
                      </div>
                    ))}
                  </div>
                  <div className="rowLabel">
                    <span className="rowTitle">
                      {typeof nodeTitle === 'function'
                        ? nodeTitle({
                            node,
                            path,
                            treeIndex
                          })
                        : nodeTitle}
                    </span>
                  </div>

                  <div className="toolbarButton">
                    {buttons.map((btn, index) => (
                      <div
                        key={index} // eslint-disable-line react/no-array-index-key
                        className="toolbarButton"
                      >
                        {btn}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {/* eslint-disable */}
            </div>)}
            {/* eslint-enable */}
          </div>
        </ContextMenuTrigger>
      </div>
    );

    return canDrag
      ? connectDragSource(nodeContent, { dropEffect: 'copy' })
      : nodeContent;
  }
}

FileThemeNodeContentRenderer.defaultProps = {
  buttons: [],
  canDrag: false,
  canDrop: false,
  className: '',
  draggedNode: null,
  icons: [],
  isSearchFocus: false,
  isSearchMatch: false,
  parentNode: null,
  style: {},
  swapDepth: null,
  swapFrom: null,
  swapLength: null,
  title: null,
  toggleChildrenVisibility: null
};

FileThemeNodeContentRenderer.propTypes = {
  buttons: PropTypes.arrayOf(PropTypes.node),
  canDrag: PropTypes.bool,
  className: PropTypes.string,
  icons: PropTypes.arrayOf(PropTypes.node),
  isSearchFocus: PropTypes.bool,
  isSearchMatch: PropTypes.bool,
  listIndex: PropTypes.number.isRequired,
  lowerSiblingCounts: PropTypes.arrayOf(PropTypes.number).isRequired,
  node: PropTypes.shape({}).isRequired,
  path: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])).isRequired,
  scaffoldBlockPxWidth: PropTypes.number.isRequired,
  style: PropTypes.shape({}),
  swapDepth: PropTypes.number,
  swapFrom: PropTypes.number,
  swapLength: PropTypes.number,
  title: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
  toggleChildrenVisibility: PropTypes.func,
  treeIndex: PropTypes.number.isRequired,
  treeId: PropTypes.string.isRequired,

  // Drag and drop API functions
  // Drag source
  connectDragPreview: PropTypes.func.isRequired,
  connectDragSource: PropTypes.func.isRequired,
  didDrop: PropTypes.bool.isRequired,
  draggedNode: PropTypes.shape({}),
  isDragging: PropTypes.bool.isRequired,
  parentNode: PropTypes.shape({}), // Needed for dndManager
  // Drop target
  canDrop: PropTypes.bool,
  isOver: PropTypes.bool.isRequired
};

export default FileThemeNodeContentRenderer;
