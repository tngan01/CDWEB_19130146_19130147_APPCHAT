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
import logo from "assets/images/logo.png";

const Content = (): JSX.Element => {
  const dispatch = useDispatch();
  const generator = new AvatarGenerator();
  const params: any = useParams();

  const dataUser = params.id;

  const handleAddFriend = () => {
    dispatch(requestAddFriend({ receiver: dataUser }));
  };

  return (
    <div className="w-full h-[89vh]">
      <div className="flex flex-col h-full justify-center items-center w-full">
        <Card bordered={false} className="w-7/12">
          <div className="flex flex-col items-center justify-center">
              <div className="text-[30px] font-mono text-lime-600 font-normal leading-8 mb-5">
                Welcome To Talk Chat!
              </div>
            <div className="login-logo-ant">
              <img src={logo} width={300} />
            </div>
            {/* <Avatar
            className="my-4 text-center"
            shape="square"
            size={260}
            src={generator.generateRandomAvatar(dataUser)}
          /> */}
            <span className="text-lg text-gray-600 font-medium leading-8">
              {dataUser}
            </span>
            <span className="text-lg font-normal text-gray-600 leading-6">
            Chat easily with Talk Chat.
            </span>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Content;
