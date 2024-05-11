import { Avatar, Button, Card } from "antd";
import {
  CaretDownOutlined,
  UserAddOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import { setModelData } from "providers/GeneralProvider/slice";
import { useDispatch } from "react-redux";
import ModelProfile from "./ModelProfile";
import { useParams } from "react-router-dom";
import { AvatarGenerator } from "random-avatar-generator";
import { requestAddFriend } from "providers/AuthProvider/slice";
import { useEffect, useState } from "react";

const AddFriend = (props): JSX.Element => {
  const dispatch = useDispatch();
  const generator = new AvatarGenerator();
  const params: any = useParams();
  const [dataUser, setDataUser] = useState(props.idFriend);

  useEffect(() => {
    setTimeout(() => {
      setDataUser(params.id);
      console.log(dataUser, "he hekkkkkk");
    }, 500);
  }, []);
  const handleAddFriend = () => {
    dispatch(requestAddFriend({ receiver: dataUser }));
  };

  return (
    <div className="w-full h-[80vh]">
      <div className="py-3 px-5 flex justify-between items-center w-full border-b border-slate-400 ">
        <div className="w-max flex items-center">
          <Avatar src={generator.generateRandomAvatar(dataUser)} />
          <span className="mx-2  text-lg leading-8 font-medium">
            {dataUser}
          </span>
          <CaretDownOutlined />
        </div>
        <Button
          type="primary"
          ghost
          className="mt-3 w-max flex items-center"
          onClick={handleAddFriend}
        >
          <UserAddOutlined /> Add Friend
        </Button>
      </div>
      <div className="flex flex-col h-full justify-center items-center w-full">
        <div className="text-base text-gray-800 font-medium leading-8 mb-10">
          Make friends with <span className="text-red-600">{dataUser}</span> for
          the purpose of connecting and chatting!!
        </div>
        <Card bordered={false} className="w-6/12">
          <div className="flex flex-col items-center justify-center">
            <Avatar
              className="my-4 text-center"
              shape="square"
              size={260}
              src={generator.generateRandomAvatar(dataUser)}
            />
            <span className="text-lg text-gray-600 font-medium leading-8">
              {dataUser}
            </span>
            <span className="text-base font-normal text-gray-400 leading-6">
              Frontend developer
            </span>
            <Button
              type="primary"
              ghost
              className="mt-3 w-max flex items-center"
              onClick={handleAddFriend}
            >
              <UserAddOutlined /> Add Friend
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AddFriend;
