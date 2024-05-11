import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Cascader,
  Checkbox,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Switch,
  TreeSelect,
  Upload,
  Avatar,
  Card,
} from "antd";
import { updateProfile , getProfile} from "providers/AuthProvider/slice";
import React, { useState, useEffect } from "react";
import { useAppSelector } from "store";
import logo from "assets/images/logo.png";
import { storage } from "utils/firebase";
import { ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import { getDownloadURL } from "firebase/storage";
import { useDispatch } from "react-redux";

const FormDisabledDemo: React.FC = () => {
  const dispatch = useDispatch();
  const profileUser = useAppSelector((state) => state.auth.profileUser) || {};
  const { TextArea } = Input;
  const [imageUpload, setImageUpload] = useState<any>(null);
  const [urlImage, setUrlImage] = useState<any>(null);
  const handleFileChange = (e) => {
    setImageUpload(e.target.files[0]);
  };
  const uploadImage = () => {
    if (imageUpload !== null) {
      const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
      console.log(imageUpload.name);
      uploadBytes(imageRef, imageUpload).then(() => {
        getDownloadURL(imageRef).then((url) => {
          console.log(url);
          setUrlImage(url);
        });
      });
    } else return;
  };
  useEffect(() => {
    if (imageUpload) {
      uploadImage();
    }
  }, [imageUpload]);

  const [form] = Form.useForm();

  const handleUpdateUserProfile = (data: any) => {
    const body = {
      name: data.name,
      phone: data.phone,
      desc: data.description,
      avatarUrl: urlImage,
      address: data.address,
    };
    dispatch(updateProfile(body));
    dispatch(getProfile());
  };
  useEffect(()=>{
    dispatch(getProfile());
  },[])
  return (
    <div className="bg-blue-900 px-5 py-5 w-full flex justify-center item-center">
      <Card className="w-4/12 py-5 px-3">
        <h1 className="text-3xl">Update profile</h1>
        <div className="login-logo-ant">
          <img src={logo} width={150} />
        </div>
        <Form
          form={form}
          name="control-ref"
          onFinish={handleUpdateUserProfile}
          className="w-full"
          layout="vertical"
        >
          <Form.Item name="avatar">
            {urlImage && (
              <div className="px-10 mb-16">
                <div className="max-h-24 w-24 relative">
                  <Avatar
                    shape="square"
                    size={150}
                    className="h-16"
                    src={urlImage}
                  />
                </div>
              </div>
            )}
            <div className=" w-full h-full justify-start">
              <input className="" type="file" onChange={handleFileChange} />
            </div>
          </Form.Item>
          <Form.Item label="Name" name="name">
            <Input />
          </Form.Item>
          <Form.Item label="Your Phone" name="phone">
            <Input />
          </Form.Item>
          <Form.Item label="Address" name="address">
            <Input />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" ghost>
              Update
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default () => <FormDisabledDemo />;
