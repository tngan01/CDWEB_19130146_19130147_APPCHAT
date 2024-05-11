import {
  Button,
  Form,
  Input,
  Modal,
  InputNumber,
  message,
  Card,
  Avatar,
  List,
  Select,
} from "antd";
import { useEffect, useState } from "react";
import { MessageOutlined } from "@ant-design/icons";
import avatar from "../../../assets/images/avatar.jpg";
import { useAppDispatch, useAppSelector } from "store";
import {
  setConfirmModal,
  resetConfirmModal,
} from "providers/GeneralProvider/slice";
import { AvatarGenerator } from "random-avatar-generator";
import { requestCreateGroup, getAllRoom } from "providers/AuthProvider/slice";
const ModelAddGroup = (props: any): JSX.Element => {
  const { Option } = Select;
  const modalData = useAppSelector((state) => state.general.confirmModal);
  const { visible, data } = modalData;
  const generator = new AvatarGenerator();

  const dispatch = useAppDispatch();

  const handleCancel = (value: boolean) => {
    dispatch(setConfirmModal({ visible: false, data: {} }));
  };

  const handleOk = () => {
    dispatch(setConfirmModal({ visible: false, data: data }));
  };

  const handleChange = (value: string[]) => {};
  const handleSubmit = (value: any) => {
    dispatch(requestCreateGroup(value));
    dispatch(setConfirmModal({ visible: false, data: data }));
    dispatch(getAllRoom());
  };
  return (
    <>
      <Modal
        title="Basic Modal"
        open={visible}
        // onOk={handleOk}
        onCancel={() => {
          dispatch(setConfirmModal({ visible: false, data: {} }));
        }}
        footer={false}
      >
        <Form
          name="wrap"
          labelCol={{ flex: "110px" }}
          labelAlign="left"
          labelWrap
          wrapperCol={{ flex: 1 }}
          colon={false}
          style={{ maxWidth: 600 }}
          onFinish={handleSubmit}
        >
          <Form.Item
            label="Group Name"
            name="name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="List users"
            name="members"
            rules={[{ required: true }]}
          >
            <Select
              showSearch
              mode="multiple"
              placeholder="Search and Select User"
              // onSearch={debounce(onSearch, 1000)}
              optionFilterProp="children"
              filterOption={(input, option) =>
                option?.props.children
                  ?.toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
              onChange={handleChange}
              style={{ maxWidth: 600 }}
            >
              {props.listUser.length &&
                props.listUser?.map((item: any, index: number) => {
                  return (
                    <Option key={index} value={item?.email}>
                      {item?.email}
                    </Option>
                  );
                })}
            </Select>
          </Form.Item>

          <Form.Item label=" ">
            <Button type="primary" ghost htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default ModelAddGroup;
