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
import { MessageOutlined, PlusOutlined } from "@ant-design/icons";
import avatar from "../../../assets/images/avatar.jpg";
import { useAppDispatch, useAppSelector } from "store";
import { setModelData, resetModelData } from "providers/GeneralProvider/slice";
import { AvatarGenerator } from "random-avatar-generator";
import {
  requestAddMember,
  getUserOfRom,
  deleteMember,
} from "providers/AuthProvider/slice";
import Helper from "utils/Helper";
import _difference from "lodash/difference";
import VirtualList from "rc-virtual-list";
import { push } from "connected-react-router";
type MyObjectType = {
  id: number;
  receiver: {
    email: string;
    name: string | null;
    // other properties as needed
  };
  address: null;
  avatarUrl: null;
  birthday: null;
  desc: null;
  email: string;
  enable: boolean;
  name: string | null;
  password: string;
  phone: string | null;
  role: string;
  token: null;
  verificationCode: string | null;
  sendAt: string;
  sender: {
    email: string;
    name: string | null;
    // other properties as needed
  };
};
const ModelOption = (props): JSX.Element => {
  const ContainerHeight = 400;
  const { Option } = Select;
  const modalData = useAppSelector((state) => state.general.modelData);
  const { visible, data } = modalData;
  const generator = new AvatarGenerator();
  const listUser = useAppSelector((state) => state.auth.listUser) || [];
  const userOfRom = useAppSelector((state) => state.auth.userOfRom) || [];
  const [listNotMember, setListNotMember] = useState([]);

  const dispatch = useAppDispatch();

  const handleCancel = (value: boolean) => {
    dispatch(setModelData({ visible: false }));
  };

  const handleOk = () => {
    dispatch(setModelData({ visible: false }));
  };

  const handleChange = (value: string[]) => {
  };

  useEffect(() => {
    if (data.group) {
      dispatch(getUserOfRom({ roomId: data.id }));
      const users = listUser.map((item) => item.email);
      const members = data.members.map((item) => item.email);
      const list = _difference(users, members);
      setListNotMember(list);
    }
  }, [data]);

  const handleAddMember = (value) => {
    dispatch(
      requestAddMember({
        id: data.id,
        members: value.members,
      })
    );
    dispatch(getUserOfRom({ roomId: data.id }));
  };
  const handleRemoveMember = (member: any) => {
    dispatch(deleteMember({ roomId: data.id, username: member.email }));
    setTimeout(() => {
      dispatch(getUserOfRom({ roomId: data.id }));
    }, 1000);
  };
  return (
    <>
      <Modal
        title="Basic Modal"
        open={visible}
        onOk={handleOk}
        onCancel={() => {
          dispatch(setModelData({ visible: false }));
        }}
        footer={false}
      >
        <div className="w-full flex flex-col justify-center items-center">
          {data.group ? (
            <Form
              className="w-full"
              layout="vertical"
              name="wrap"
              labelCol={{ flex: "110px" }}
              labelAlign="left"
              labelWrap
              wrapperCol={{ flex: 1 }}
              colon={false}
              onFinish={handleAddMember}
            >
              <Form.Item
                label="List Not Members"
                name="members"
                rules={[{ required: true }]}
                className="w-full"
              >
                <Select
                  className="w-full h-full"
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
                  size="large"
                  onChange={handleChange}
                >
                  {listNotMember.length &&
                    listNotMember?.map((item: any, index: number) => {
                      return (
                        <Option key={index} value={item}>
                          <div className="my-2 flex item-center">
                            {" "}
                            <Avatar
                              src={generator.generateRandomAvatar(item)}
                            />
                            {item}
                          </div>
                        </Option>
                      );
                    })}
                </Select>
              </Form.Item>
              <span>List Member</span>
              <List
                dataSource={data.members}
                renderItem={(item: any) => (
                  <List.Item key={item.email}>
                    <List.Item.Meta
                      avatar={
                        <Avatar
                          src={generator.generateRandomAvatar(item.email)}
                        />
                      }
                    />
                    <div className="flex items-start justify-between w-full">
                      <span>{item.email} </span>
                      <Button
                        onClick={() => handleRemoveMember(item)}
                        danger
                        ghost
                        className="mt-3 w-max flex items-center"
                      >
                        Delete
                      </Button>
                    </div>
                  </List.Item>
                )}
              />
              <Form.Item label=" " className="w-full flex justify-center">
                <Button
                  type="primary"
                  ghost
                  htmlType="submit"
                  className="mt-3 w-max flex items-center"
                >
                  <PlusOutlined /> Add Member
                </Button>
              </Form.Item>
            </Form>
          ) : (
            <Card bordered={false}>
              <Avatar
                className="my-4 text-center"
                shape="square"
                size={160}
                src={generator.generateRandomAvatar(
                  data.members
                    ? Helper.getEmailUser(data.members, props.profile?.email)
                    : data.email
                )}
              />
              <div className="flex flex-col">
                <span className="text-base text-gray-600 font-medium leading-8">
                  {data.members?Helper.getEmailUser(data.members,
                  props.profile?.email): data.email}
                </span>
                <span className="text-xs font-normal text-gray-400 leading-6">
                  Frontend developer
                </span>
              </div>
              <Button type="primary" ghost className="mt-3 w-max">
                <MessageOutlined /> Messages
              </Button>
            </Card>
          )}
        </div>
      </Modal>
    </>
  );
};
export default ModelOption;
