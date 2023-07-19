import { Alert } from "react-native";
import { LoginFormData } from "../../../validations/common/LoginScreen";
import { api } from "../../api";
import { PostLogin } from "./interface";

export const postLogin = async ({
  userCPF,
  password,
}: LoginFormData): Promise<PostLogin.Response> => {
  try {
    const payload = new FormData();
    const mock = {
      username: "125.477.326-61",
      password: "teste#EN2023",
    };
    payload.append("username", mock.username);
    payload.append("password", mock.password);

    const { data } = await api.post("/user/auth", payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return data;
  } catch (error: any) {
    Alert.alert("Error", error?.message);
    throw error;
  }
};
