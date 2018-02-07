import Task from '../module/task'
import Role from '../module/role'
import Upload from '../module/upload'

export default [{
    path: '/',
    exact: true,
}, {
    path: '/pane/1',
    component: Task
}, {
    path: '/unknow/3',
    component: Task
}, {
    path: '/bulk-upload',
    component: Upload
}, {
    path: '/timing-tasks',
    component: Upload
}]