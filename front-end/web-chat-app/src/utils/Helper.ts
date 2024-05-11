import { toast } from "react-toastify";
import { message } from "antd";
import api from "utils/service";

const Helper = {
  getAuthToken: (): string | null => localStorage.getItem("op_token"),
  storeAuthToken: (token): void => localStorage.setItem("op_token", token),
  getAuthrefreshToken: (): string | null =>
    localStorage.getItem("op_refreshToken"),
  storeAuthrefreshToken: (token): void =>
    localStorage.setItem("op_refreshToken", token),
  removeAuthrefreshToken: (): void =>
    localStorage.removeItem("op_refreshToken"),
  removeAuthToken: (): void => localStorage.removeItem("op_token"),

  uploadFile: async (file: {
    type: string;
    file: Blob;
  }): Promise<Record<string, unknown> | null> => {
    if (file) {
      const payload = new FormData();
      payload.append("type", file.type);
      payload.append("file", file.file);

      try {
        return await api.post("/upload/uploadImage", payload);
      } catch (e) {
        return null;
      }
    }
    return null;
  },
  // toastr: (description: string, messageContent: string, type = 'success'): void => {
  //   if (type === 'success') {
  //     toast.success(messageContent);
  //   } else if (type === 'error') {
  //     toast.error(message, { toastId: description });
  //   }
  // },
  arrayToString: (array = []): string => array.map((item) => item).join(", "),
  convertMessage: (res: any) => {
    if ((res.code && res.message) || res.message === "failed") {
      let messageTemp = "";
      const messageContent = res.message;
      const textFirst = `${messageContent
        .charAt(0)
        .toUpperCase()}${messageContent.slice(1)}`;
      messageTemp = `${textFirst}${messageTemp.substring(1)}`;
      const messageError = messageTemp.split(".");
      message.warning(messageError.join(" "));
    }
  },
  formatAmount: (amount) => {
    if (!amount && amount !== 0) return "-";
    const value = Number(amount);
    return value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
  },
  renderAvatar: (avatar) => {
    if (!avatar) {
      return "";
    } else {
      return `data:image/jpeg;base64,${avatar}`;
    }
  },
  renderFile: (avatar) => {
    return `data:image/jpeg;base64,${avatar}`;
  },
  convertString: (value: string) => {
    if (value) {
      const messageContent = value.toLowerCase().split("_");
      const messages = messageContent.map((e: any) => {
        return `${e.charAt(0).toUpperCase()}${e.slice(1, e.length)}`;
      });
      return messages.join(" ");
    }
  },
  formatDiscountRate: (data) => {
    if (data === "-") return data;
    if (data === 0) return "Free";
    return Helper.formatAmount(data) + " %";
  },
  downloadCSV(data, nameFile) {
    let csv = "";
    data.forEach(function (row) {
      csv += row.join(",");
      csv += "\n";
    });
    const hiddenElement = document.createElement("a");
    hiddenElement.href = "data:text/csv;charset=utf-8," + encodeURI(csv);
    hiddenElement.target = "_blank";
    hiddenElement.download = `${nameFile}.csv`;
    hiddenElement.click();
  },
  mapKey: (data: any) => {
    const mapKey = {
      BRMC: "Business Registration With Ministry Of Commerce",
      PATENT: "Patent",
      "Business License": "Business License",
      BUSINESS_LICENSE: "Business License",
      LOCAL_AUT_PERMIT: "Local Authority Permit",
      MAAI: "Memorandum Of Article Of Association Of Incorporation",
      BRL: "Board Of Resolution Letter",
      CONTACT_NID_PASSPORT: "Contact Person NID/Passport",
      REPRESENTATIVE_NID_PASSPORT: "Representative NID/Passport",
      REPRESENTATIVE_SELFIE: "Representative Photo Selfie",
      CONTACT_SELFIE: "Contact Person Photo Selfie",
    };

    return mapKey[data];
  },
  getEmailUser: (user: any, email: any) => {
    const profile = user?.find((item: any) => item?.email !== email);
    return profile?.email;
  },
};

export default Helper;
