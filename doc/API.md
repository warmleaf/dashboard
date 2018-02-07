# 接口说明

## 接口返回格式

* 正常返回

```json
{
  "data": {},
  "message": "success"
}
```

* 異常返回

```json
{
  "message": "異常消息",
  "error": 0 // 業務接口異常代碼
}
```

## API/task_tree

method: POST

type
字段|字段類型|是否必須|默認值
:-|:-|:-|:-
data|arrayOf(nodeType)|✓|x

nodeType
字段|字段類型|是否必須|默認值
:-|:-|:-|:-
name|string|✓|x
title|string|✓|x
type|oneOf(folder, tempTask, timingTask)|-|x
children|arrayOf(nodeType)|-|x

example

```json
{
  "data": [
    {
      "name": "myfolder",
      "title": "我的文件夾",
      "type": "folder",
      "children": [
        {
          "name": "myfolder2",
          "title": "我的文件夾2",
          "type": "folder",
          "children": [
            {
              "name": "task01",
              "title": "定時任務01",
              "type": "timingTask"
            },
            {
              "name": "task02",
              "title": "定時任務02",
              "type": "timingTask"
            },
            {
              "name": "task01",
              "title": "臨時任務01",
              "type": "tempTask"
            }
          ]
        },
        {
          "name": "task03",
          "title": "定時任務03",
          "type": "timingTask"
        },
        {
          "name": "task02",
          "title": "臨時任務02",
          "type": "tempTask"
        }
      ]
    },
    {
      "name": "task04",
      "title": "定時任務04",
      "type": "timingTask"
    },
    {
      "name": "task03",
      "title": "臨時任務03",
      "type": "tempTask"
    }
  ],
  "message": "success"
}
```
