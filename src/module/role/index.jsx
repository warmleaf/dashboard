import React, { Component } from 'react';
import Frame from 'react-frame-component';

export default class Role extends Component {
    render() {
        return <div>
            <div key="1">Taobao</div>
            <iframe src="//taobao.com"/>
        </div>
    }
}