---
title: 云建管低代码整合注意事项
date: 2023-11-27 10:44:01
tags:
---
### 注意事项
1. 低代码应该嵌入现有项目中，不应该在低代码中嵌入业务系统代码
2. 低代码渲染的component formCode应该是从父组件传入，不从component formCode内部通过routeProps获取(避免在不同route渲染component时，formCode的值不同)

### lowCode与流程审批是两个功能，不应该有业务关联
1. 各个系统的edit layout与detial layout应该由具体业务系统应用提供
2. 表单自定义只负责渲染部分，并且应该将数据返回给业务平台处理
3. lowCode平台应该简单灵活，不应与业务系统有过多关联


### 项目结构如下所示
1. CustomForm为自定义表单组件，负责渲染和数据处理
2. CsEditLayout为公共编辑布局组件
3. CsDetailLayout为公共详情布局组件
```javascript
+-- src
|   +-- components
|   |   +-- CsEditLayout
|   |   |   +--index.tsx
|   |   +-- CsDetailLayout
|   |   |   +--index.tsx
|   |   +-- CustomForm
|   |   |   +-- Detail
|   |   |   |   +--index.tsx
|   |   |   +-- Edit
|   |   |   |   +--index.tsx
|   +-- pages
|   |   +-- Business
|   |   |   +--edit.tsx
|   |   |   +--detail.tsx

```

### 在业务中使用低代码
1. 封装了低代码的公共layout组件，这里可以添加一些表单自定义的公共逻辑，并将表单提交逻辑要给业务逻辑
```javascript

import React, { useEffect, useReducer } from 'react';

import { Button, Col, notification, Row } from 'antd';
import type { FormInstance } from 'antd';


import Edit from '@/components/CustomForm/edit';

import useFormConfig from '@/hooks/useFormConfig';
import { getSubmitData } from '@/components/CustomForm/util';


function BaseForm(props: IProps) {
    const { handleSubmit, data: formdata, form, formCode, loading } = props;

    const { tableConfig } = useFormConfig(formCode);

    const { containers, formName, approvable } = tableConfig;

    const id = formdata?.id;

    // 保存表单数据
    async function saveFormData(type: SaveType, formValues) {
        // reactDispatch({ type: 'loading', data: true });
        const submitData = getSubmitData(tableConfig, formValues);
        const params = {
            ...submitData,
            id,
            formName,
            approvable,
            formCode,
        }
        handleSubmit(type, params);
    }

    return (
            <div>
                <Edit
                    id={id}
                    formCode={formCode}
                    containers={containers}
                    form={form}
                />
                <div className='mt-5 gap-4 flex'>
                    {approvable && (
                        <Button
                            type="primary"
                            onClick={() =>
                                form.validateFields().then((values) => {
                                    saveFormData(2, values)
                                })
                            }
                            disabled={loading}
                        >
                            提交审批
                        </Button>
                    )}
                    <Button
                        type='primary'
                        className='bg-[#ffa646] border-transparent'
                        disabled={loading}
                        onClick={() => form.validateFields().then((values) => saveFormData(1, values))}
                    >
                        保存
                    </Button>
                </div>
            </div>
    );
}

export default BaseForm;


```
### 在业务中使用低代码业务公共组件
```javascript
import React, { useEffect } from 'react';
import { Form } from 'antd';
import { ProForm ,ProFormText} from '@ant-design/pro-components';

import SelectTable from '@/components/selectTable';
import BaseForm from '@/components/CsEditLayout';
import useFetch from '@/hooks/useFetch';
import { query } from './services';

const EditForm= (props:Iprops) => {
  const { handleSubmit, data, formCode } = props;
  const [form] = Form.useForm();

  const { data: respData = {}, status } = useFetch(data?.id && query, { id: data?.id, formCode });

  useEffect(() => {
    form.setFieldsValue(formdata)
  }, [formdata])

  return (
    <ProForm
      form={form}
      submitter={false}
    >
        <ProFormText
            label="批次名称"
            name="batchName"
          />
      <BaseForm form={form} handleSubmit={handleSubmit} formCode={formCode} data={respData} />
    </ProForm>
  );
};

export default EditForm;

```