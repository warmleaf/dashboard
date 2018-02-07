import React, { Component } from 'react'
import Portal from '../../app/portal'
import Flex from '../../components/flex'
import Base from '../../components/base'
import Button from '../../components/button'

const FuncDetail = ({ }) => {
  return <Portal width="800px" column size="14px">
    <Base.Span height="48px" lihe="48px" pale="20px">详细信息</Base.Span>
    <Base.Table width="100%" boto="1px solid rgba(0,0,0,.08)" bobo="1px solid rgba(0,0,0,.08)" padding="20px">
      <Base.Tbody>
        <Base.Tr>
          <Base.Td width="5em" padding="8px 0" color="rgba(0,0,0,.3)">
            <Base.Span>函数名称</Base.Span>
            <Base.Span>：</Base.Span>
          </Base.Td>
          <Base.Td>
            <Base.Span>函数名称</Base.Span>
          </Base.Td>
        </Base.Tr>
        <Base.Tr>
          <Base.Td padding="8px 0" color="rgba(0,0,0,.3)">
            <Base.Span>函数类型</Base.Span>
            <Base.Span>：</Base.Span>
          </Base.Td>
          <Base.Td>
            <Base.Span>函数类型</Base.Span>
          </Base.Td>
        </Base.Tr>
        <Base.Tr>
          <Base.Td padding="8px 0" color="rgba(0,0,0,.3)">
            <Base.Span>函数用途</Base.Span>
            <Base.Span>：</Base.Span>
          </Base.Td>
          <Base.Td>
            <Base.Span>函数用途</Base.Span>
          </Base.Td>
        </Base.Tr>
        <Base.Tr>
          <Base.Td padding="8px 0" color="rgba(0,0,0,.3)">
            <Flex inline vc="space-between" w="4em">
              <Base.Span>责</Base.Span>
              <Base.Span>任</Base.Span>
              <Base.Span>人</Base.Span>
            </Flex>
            <Base.Span>：</Base.Span>
          </Base.Td>
          <Base.Td padding="8px 0">
            <Base.Span>责任人</Base.Span>
          </Base.Td>
        </Base.Tr>
        <Base.Tr>
          <Base.Td padding="8px 0" color="rgba(0,0,0,.3)">
            <Flex inline vc="space-between" w="4em">
              <Base.Span>修</Base.Span>
              <Base.Span>改</Base.Span>
              <Base.Span>人</Base.Span>
            </Flex>
            <Base.Span>：</Base.Span>
          </Base.Td>
          <Base.Td padding="8px 0">
            <Base.Span>修改人</Base.Span>
          </Base.Td>
        </Base.Tr>
        <Base.Tr>
          <Base.Td padding="8px 0" color="rgba(0,0,0,.3)">
            <Base.Span>修改时间</Base.Span>
            <Base.Span>：</Base.Span>
          </Base.Td>
          <Base.Td>
            <Base.Span>修改时间</Base.Span>
          </Base.Td>
        </Base.Tr>
        <Base.Tr>
          <Base.Td padding="8px 0" color="rgba(0,0,0,.3)">
            <Base.Span>命令格式</Base.Span>
            <Base.Span>：</Base.Span>
          </Base.Td>
          <Base.Td>
            <Base.Span>命令格式</Base.Span>
          </Base.Td>
        </Base.Tr>
        <Base.Tr>
          <Base.Td padding="8px 0" color="rgba(0,0,0,.3)">
            <Base.Span>参数说明</Base.Span>
            <Base.Span>：</Base.Span>
          </Base.Td>
          <Base.Td>
            <Base.Span>参数说明</Base.Span>
          </Base.Td>
        </Base.Tr>
      </Base.Tbody>
    </Base.Table>
    <Flex vc="flex-end" h="48px" pl="20px" pr="20px">
      <Button primary>关闭</Button>
    </Flex>
  </Portal>
}
export default FuncDetail
