import React from 'react';
import { Alert, Space } from 'antd';
import './Error.scss';

function Error() {
    return (
        <Space direction='vertical' style={{ width: '100%' }}>
            <Alert
                className='error-alert'
                message='Error'
                description='Somthing has gone wrong! We are already trying to fix this.'
                type='error'
                showIcon
            />
        </Space>
    );
}

export default Error;
