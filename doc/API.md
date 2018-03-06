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

## API/table_tree

method: POST

type
字段|字段類型|是否必須|默認值
:-|:-|:-|:-
data|arrayOf(nodeType)|✓|x

nodeType
字段|字段類型|是否必須|默認值|说明
:-|:-|:-|:-|:-
name|string|✓|x
title|string|✓|x
type|oneOf(folder, table, customTable, view)|-|x
spec|arrayOf(string\<Spec\>)|-|x|如果 type 为 folder 则 spec 不存在
fields|arrayOf(fieldType)|-|x|如果 type 为 folder 则 fields 不存在
children|arrayOf(nodeType)|-|x

Spec
字段|字段類型|是否必須|默認值
:-|:-|:-|:-
名称|string|-|x
责任人|string|-|x
描述|string|-|x
创建日期|string|-|x
更多详情|string|-|x

fieldType
字段|字段類型|是否必須|默認值
:-|:-|:-|:-
id|string|-|x
name|string|-|x
type|string|-|x
comment|string|-|x
isMainKey|boolean|-|x

example

```json
{
  "data": [
    {
      "name": "folder01",
      "title": "文件夾01",
      "type": "folder",
      "children": [
        {
          "name": "folder02",
          "title": "文件夾02",
          "type": "folder",
          "children": [
            {
              "name": "table01",
              "title": "数据表01",
              "spec": [
                "数据表01",
                "01264 name",
                "描述信息描述信息描述信息描述信息描述信息描述信息描述信息",
                "2018-02-02",
                "//demo.url"
              ],
              "fields": [
                {
                  "id": 1,
                  "type": "string",
                  "name": "id",
                  "comment": "字段ID",
                  "isMainKey": true
                },
                {
                  "id": 2,
                  "type": "string",
                  "name": "name",
                  "comment": "字段名称",
                  "isMainKey": false
                },
                {
                  "id": 3,
                  "type": "string",
                  "name": "phone",
                  "comment": "用户手机号",
                  "isMainKey": false
                },
                {
                  "id": 4,
                  "type": "string",
                  "name": "address",
                  "comment": "用户住址",
                  "isMainKey": false
                },
                {
                  "id": 5,
                  "type": "string",
                  "name": "friends",
                  "comment": "用户朋友圈",
                  "isMainKey": false
                }
              ],
              "type": "table"
            },
            {
              "name": "table02",
              "title": "数据表02",
              "spec": [
                "数据表02",
                "01264 name",
                "描述信息描述信息描述信息描述信息描述信息描述信息描述信息",
                "2018-02-02",
                "//demo.url"
              ],
              "fields": [
                {
                  "id": 1,
                  "type": "string",
                  "name": "id",
                  "comment": "字段ID",
                  "isMainKey": true
                },
                {
                  "id": 2,
                  "type": "string",
                  "name": "name",
                  "comment": "字段名称",
                  "isMainKey": false
                },
                {
                  "id": 3,
                  "type": "string",
                  "name": "phone",
                  "comment": "用户手机号",
                  "isMainKey": false
                },
                {
                  "id": 4,
                  "type": "string",
                  "name": "address",
                  "comment": "用户住址",
                  "isMainKey": false
                },
                {
                  "id": 5,
                  "type": "string",
                  "name": "friends",
                  "comment": "用户朋友圈",
                  "isMainKey": false
                }
              ],
              "type": "table"
            },
            {
              "name": "table03",
              "title": "数据表03",
              "spec": [
                "数据表03",
                "01264 name",
                "描述信息描述信息描述信息描述信息描述信息描述信息描述信息",
                "2018-02-02",
                "//demo.url"
              ],
              "fields": [
                {
                  "id": 1,
                  "type": "string",
                  "name": "id",
                  "comment": "字段ID",
                  "isMainKey": true
                },
                {
                  "id": 2,
                  "type": "string",
                  "name": "name",
                  "comment": "字段名称",
                  "isMainKey": false
                },
                {
                  "id": 3,
                  "type": "string",
                  "name": "phone",
                  "comment": "用户手机号",
                  "isMainKey": false
                },
                {
                  "id": 4,
                  "type": "string",
                  "name": "address",
                  "comment": "用户住址",
                  "isMainKey": false
                },
                {
                  "id": 5,
                  "type": "string",
                  "name": "friends",
                  "comment": "用户朋友圈",
                  "isMainKey": false
                }
              ],
              "type": "customTable"
            }
          ]
        },
        {
          "name": "table04",
          "title": "数据表04",
          "spec": [
            "数据表04",
            "01264 name",
            "描述信息描述信息描述信息描述信息描述信息描述信息描述信息",
            "2018-02-02",
            "//demo.url"
          ],
          "fields": [
            {
              "id": 1,
              "type": "string",
              "name": "id",
              "comment": "字段ID",
              "isMainKey": true
            },
            {
              "id": 2,
              "type": "string",
              "name": "name",
              "comment": "字段名称",
              "isMainKey": false
            },
            {
              "id": 3,
              "type": "string",
              "name": "phone",
              "comment": "用户手机号",
              "isMainKey": false
            },
            {
              "id": 4,
              "type": "string",
              "name": "address",
              "comment": "用户住址",
              "isMainKey": false
            },
            {
              "id": 5,
              "type": "string",
              "name": "friends",
              "comment": "用户朋友圈",
              "isMainKey": false
            }
          ],
          "type": "table"
        },
        {
          "name": "table05",
          "title": "数据表05",
          "spec": [
            "数据表05",
            "01264 name",
            "描述信息描述信息描述信息描述信息描述信息描述信息描述信息",
            "2018-02-02",
            "//demo.url"
          ],
          "fields": [
            {
              "id": 1,
              "type": "string",
              "name": "id",
              "comment": "字段ID",
              "isMainKey": true
            },
            {
              "id": 2,
              "type": "string",
              "name": "name",
              "comment": "字段名称",
              "isMainKey": false
            },
            {
              "id": 3,
              "type": "string",
              "name": "phone",
              "comment": "用户手机号",
              "isMainKey": false
            },
            {
              "id": 4,
              "type": "string",
              "name": "address",
              "comment": "用户住址",
              "isMainKey": false
            },
            {
              "id": 5,
              "type": "string",
              "name": "friends",
              "comment": "用户朋友圈",
              "isMainKey": false
            }
          ],
          "type": "customTable"
        }
      ]
    },
    {
      "name": "view01",
      "title": "视图01",
      "spec": [
        "视图01",
        "01264 name",
        "描述信息描述信息描述信息描述信息描述信息描述信息描述信息",
        "2018-02-02",
        "//demo.url"
      ],
      "type": "view"
    },
    {
      "name": "view02",
      "title": "视图02",
      "spec": [
        "视图02",
        "01264 name",
        "描述信息描述信息描述信息描述信息描述信息描述信息描述信息",
        "2018-02-02",
        "//demo.url"
      ],
      "type": "view"
    }
  ],
  "message": "success"
}
```
