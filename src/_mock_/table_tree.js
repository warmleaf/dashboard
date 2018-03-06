import { mock } from 'mockjs'; // eslint-disable-line

export default mock(/.*\/api\/table_tree/g, 'get', {
  data: [
    {
      name: 'folder01',
      title: '文件夾01',
      type: 'folder',
      children: [
        {
          name: 'folder02',
          title: '文件夾02',
          type: 'folder',
          children: [
            {
              name: 'table01',
              title: '数据表01',
              spec: [
                '数据表01',
                '01264 name',
                '描述信息描述信息描述信息描述信息描述信息描述信息描述信息',
                '2018-02-02',
                '//demo.url'
              ],
              fields: [
                {
                  id: 1,
                  type: 'string',
                  name: 'id',
                  comment: '字段ID',
                  isMainKey: true
                },
                {
                  id: 2,
                  type: 'string',
                  name: 'name',
                  comment: '字段名称',
                  isMainKey: false
                },
                {
                  id: 3,
                  type: 'string',
                  name: 'phone',
                  comment: '用户手机号',
                  isMainKey: false
                },
                {
                  id: 4,
                  type: 'string',
                  name: 'address',
                  comment: '用户住址',
                  isMainKey: false
                },
                {
                  id: 5,
                  type: 'string',
                  name: 'friends',
                  comment: '用户朋友圈',
                  isMainKey: false
                }
              ],
              type: 'table'
            },
            {
              name: 'table02',
              title: '数据表02',
              spec: [
                '数据表02',
                '01264 name',
                '描述信息描述信息描述信息描述信息描述信息描述信息描述信息',
                '2018-02-02',
                '//demo.url'
              ],
              fields: [
                {
                  id: 1,
                  type: 'string',
                  name: 'id',
                  comment: '字段ID',
                  isMainKey: true
                },
                {
                  id: 2,
                  type: 'string',
                  name: 'name',
                  comment: '字段名称',
                  isMainKey: false
                },
                {
                  id: 3,
                  type: 'string',
                  name: 'phone',
                  comment: '用户手机号',
                  isMainKey: false
                },
                {
                  id: 4,
                  type: 'string',
                  name: 'address',
                  comment: '用户住址',
                  isMainKey: false
                },
                {
                  id: 5,
                  type: 'string',
                  name: 'friends',
                  comment: '用户朋友圈',
                  isMainKey: false
                }
              ],
              type: 'table'
            },
            {
              name: 'table03',
              title: '数据表03',
              spec: [
                '数据表03',
                '01264 name',
                '描述信息描述信息描述信息描述信息描述信息描述信息描述信息',
                '2018-02-02',
                '//demo.url'
              ],
              fields: [
                {
                  id: 1,
                  type: 'string',
                  name: 'id',
                  comment: '字段ID',
                  isMainKey: true
                },
                {
                  id: 2,
                  type: 'string',
                  name: 'name',
                  comment: '字段名称',
                  isMainKey: false
                },
                {
                  id: 3,
                  type: 'string',
                  name: 'phone',
                  comment: '用户手机号',
                  isMainKey: false
                },
                {
                  id: 4,
                  type: 'string',
                  name: 'address',
                  comment: '用户住址',
                  isMainKey: false
                },
                {
                  id: 5,
                  type: 'string',
                  name: 'friends',
                  comment: '用户朋友圈',
                  isMainKey: false
                }
              ],
              type: 'customTable'
            }
          ]
        },
        {
          name: 'table04',
          title: '数据表04',
          spec: [
            '数据表04',
            '01264 name',
            '描述信息描述信息描述信息描述信息描述信息描述信息描述信息',
            '2018-02-02',
            '//demo.url'
          ],
          fields: [
            {
              id: 1,
              type: 'string',
              name: 'id',
              comment: '字段ID',
              isMainKey: true
            },
            {
              id: 2,
              type: 'string',
              name: 'name',
              comment: '字段名称',
              isMainKey: false
            },
            {
              id: 3,
              type: 'string',
              name: 'phone',
              comment: '用户手机号',
              isMainKey: false
            },
            {
              id: 4,
              type: 'string',
              name: 'address',
              comment: '用户住址',
              isMainKey: false
            },
            {
              id: 5,
              type: 'string',
              name: 'friends',
              comment: '用户朋友圈',
              isMainKey: false
            }
          ],
          type: 'table'
        },
        {
          name: 'table05',
          title: '数据表05',
          spec: [
            '数据表05',
            '01264 name',
            '描述信息描述信息描述信息描述信息描述信息描述信息描述信息',
            '2018-02-02',
            '//demo.url'
          ],
          fields: [
            {
              id: 1,
              type: 'string',
              name: 'id',
              comment: '字段ID',
              isMainKey: true
            },
            {
              id: 2,
              type: 'string',
              name: 'name',
              comment: '字段名称',
              isMainKey: false
            },
            {
              id: 3,
              type: 'string',
              name: 'phone',
              comment: '用户手机号',
              isMainKey: false
            },
            {
              id: 4,
              type: 'string',
              name: 'address',
              comment: '用户住址',
              isMainKey: false
            },
            {
              id: 5,
              type: 'string',
              name: 'friends',
              comment: '用户朋友圈',
              isMainKey: false
            }
          ],
          type: 'customTable'
        }
      ]
    },
    {
      name: 'view01',
      title: '视图01',
      spec: [
        '视图01',
        '01264 name',
        '描述信息描述信息描述信息描述信息描述信息描述信息描述信息',
        '2018-02-02',
        '//demo.url'
      ],
      type: 'view'
    },
    {
      name: 'view02',
      title: '视图02',
      spec: [
        '视图02',
        '01264 name',
        '描述信息描述信息描述信息描述信息描述信息描述信息描述信息',
        '2018-02-02',
        '//demo.url'
      ],
      type: 'view'
    }
  ],
  message: 'success'
});
