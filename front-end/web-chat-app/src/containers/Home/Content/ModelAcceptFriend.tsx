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
  } from "antd";
  import { useEffect, useState } from "react";
  import { MessageOutlined } from "@ant-design/icons";
  import avatar from "../../../assets/images/avatar.jpg";
  import { useAppDispatch, useAppSelector } from "store";
  import { setFormModal} from "providers/GeneralProvider/slice";
  import { AvatarGenerator } from "random-avatar-generator";
  import { requestAcceptFriend } from "providers/AuthProvider/slice";
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
    const modelAccept = useAppSelector((state) => state.general.modelAccept);
    const { visible, data } = modelAccept;
    
    const generator = new AvatarGenerator();  
    const dispatch = useAppDispatch();
    const handleCancel = (value: boolean) => {
      dispatch(setFormModal({ visible: false }));
    };
  
    const handleOk = () => {
      dispatch(setFormModal({ visible: false }));
    };
  
    const handleAcceptRequestFriend = (id: number) => {
      dispatch(requestAcceptFriend({ id: id }));
    };
  
    return (
      <>
        <Modal
          title="List add friend"
          open={visible}
          onOk={handleOk}
          onCancel={() => {
            dispatch(setFormModal({ visible: false }));
          }}
          footer={false}
        >
          <div className="w-full flex flex-col justify-center items-center">
               <List
                className="w-full"
                dataSource={data}
                renderItem={(item: MyObjectType) => (
                  <List.Item key={item.sender.email}>
                    <List.Item.Meta
                      avatar={
                        <Avatar
                          src={generator.generateRandomAvatar(item.sender.email)}
                        />
                      }
                      title={item.sender.email}
                      description={item.sender.email}
                    />
                    <Button
                      type="primary"
                      ghost
                      className="mt-3 w-max"
                      onClick={() => handleAcceptRequestFriend(item.id)}
                    >
                      <MessageOutlined /> Accept
                    </Button>
                  </List.Item>
                )}
              />
          </div>
        </Modal>
      </>
    );
  };
  export default ModelOption;
  