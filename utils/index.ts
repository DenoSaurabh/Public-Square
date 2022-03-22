import { LensHub__factory } from "@/typechain-types";
import { ethers } from "ethers";

export const cleanUrl = (url: string) => {
  if (!url) return url;
  return url.replace(/^https?:\/\//, "");
};

export const smallAddress = (address: string, cutBy?: number) => {
  if (!address) return address;

  const smallAddress = [
    address.slice(0, cutBy || 4),
    "...",
    address.slice(address.length - (cutBy || 4), address.length),
  ].join("");

  return smallAddress;
};

export const EMPTY_ADDRESS = "0x0000000000000000000000000000000000000000";

export const decodeTxEncodedData = (data: string) => {
  const lensHubI = new ethers.utils.Interface(LensHub__factory.abi);

  try {
    const decodedData = lensHubI.decodeFunctionData("post", data);

    const filteredDecodedData = Object.keys(decodedData.vars).map(
      (key: any, i: number, arr) => {
        if (!Number(key)) {
          return;
        }

        delete decodedData.vars[`${key}`];
        return;
      }
    );

    return filteredDecodedData;
  } catch (err) {
    console.log("decodeTxEncodedData", err);

    return {
      message: "Couldn't determine the data!",
      error: err,
    };
  }
};
