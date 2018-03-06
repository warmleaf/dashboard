import { mock } from 'mockjs'; // eslint-disable-line

export default mock(/.*\/api\/task_tree/g, 'get', {
  data: [
    {
      name: 'folder',
      title: '我的文件夾',
      type: 'folder',
      children: [
        {
          name: 'folder2',
          title: '我的文件夾2',
          type: 'folder',
          children: [
            {
              name: 'task01',
              title: '定時任務01',
              type: 'timingTask'
            },
            {
              name: 'task02',
              title: '定時任務02',
              type: 'timingTask'
            },
            {
              name: 'task01',
              title: '臨時任務01',
              type: 'tempTask'
            }
          ]
        },
        {
          name: 'task03',
          title: '定時任務03',
          type: 'timingTask'
        },
        {
          name: 'task02',
          title: '臨時任務02',
          type: 'tempTask'
        }
      ]
    },
    {
      name: 'task04',
      title: '定時任務04',
      type: 'timingTask'
    },
    {
      name: 'task03',
      title: '臨時任務03',
      type: 'tempTask'
    }
  ],
  message: 'success'
});
