import { apolloClient } from "@/apollo/client";
import { Avatar, AvatarImage } from "@/components/Avatar";
import { H1 } from "@/components/Heading";
import Input from "@/components/Input";
import { TextDefault } from "@/components/Text";
import { TextArea } from "@/components/TextArea";
import { MUTATE_PROFILE } from "@/graphql/PROFILE";
import { styled } from "@/stitches.config";
import { IPFSClient } from "@/utils/ipfs";
import { gql } from "@apollo/client";
import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";
import { toast } from "react-toastify";

const CreateProfile = () => {
  const router = useRouter();

  const [uploadedImgData, setUploadedImgData] = useState<string | ArrayBuffer>(
    ""
  );

  const [formInput, setFormInput] = useState({
    handle: "",
  });

  const [uploadedImg, setUploadedImg] = useState();

  const onFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;

    const reader = new FileReader();

    reader.addEventListener("load", async () => {
      const uploaded_image = reader.result;

      if (uploaded_image) {
        const res = await IPFSClient.add(uploaded_image);
        console.log(res);
        setUploadedImgData(uploaded_image);

        const url = `https://ipfs.infura.io/ipfs/${res.path}`;
        setUploadedImg(url);
      }
    });

    reader.readAsDataURL(e.target.files[0]);
  };

  const onFormSubmit = async (e) => {
    e.preventDefault();

    let imgUrl =
      uploadedImg ||
      `https://source.boringavatars.com/marble/25/${
        formInput.handle || "deno"
      }`;

    if (!imgUrl || !formInput.handle) return;

    console.log(uploadedImg, formInput.handle);

    try {
      const res = await apolloClient.mutate({
        mutation: gql(MUTATE_PROFILE),
        variables: {
          request: {
            handle: formInput.handle,
            profilePictureUri: imgUrl,
          },
        },
      });

      console.log(res);

      toast.success("Profile has been created!");

      router.push("/");
    } catch (err) {
      console.log(err);
      toast.error("Error creating profile");
    }
  };

  const onInputChange = (e: ChangeEvent) => {
    const { name, value } = e.target;
    setFormInput({ ...formInput, [name]: value });
  };

  return (
    <Center>
      <H1 italic font="serif">
        Create your Profile
      </H1>
      <Container onSubmit={onFormSubmit}>
        <TopContainer>
          <AvatarBox>
            <label htmlFor="avatar-upload">
              <Avatar
                css={{
                  width: "100px",
                  height: "100px",
                  margin: "2rem auto",
                  border: "1px solid $grey300",
                }}>
                <AvatarImage
                  as="div"
                  css={{
                    backgroundImage: `url(${
                      uploadedImgData ||
                      `https://source.boringavatars.com/marble/25/${
                        formInput.handle || "deno"
                      }`
                    })`,
                    objectFit: "cover",
                    backgroundSize: "cover",
                  }}
                />
              </Avatar>

              <UploadInputContainer>
                <UploadInput
                  id="avatar-upload"
                  type="file"
                  onChange={onFileUpload}
                />

                <TextDefault>Upload Avatar</TextDefault>
              </UploadInputContainer>
            </label>

            <LineInput
              name="handle"
              value={formInput.handle}
              placeholder="your handle, like @deno"
              onChange={onInputChange}
            />
          </AvatarBox>
        </TopContainer>

        <UpdateButton type="submit" onClick={onFormSubmit}>
          Create Profile
        </UpdateButton>
      </Container>
    </Center>
  );
};

export default CreateProfile;

const Center = styled("div", {
  marginTop: "8rem",

  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",

  width: "100%",
  height: "100%",

  h1: {
    margin: "3rem",
    padding: 0,
  },
});

const Container = styled("form", {
  display: "flex",
  flexDirection: "column",

  outline: "1px solid $grey300",
  borderRadius: "20px",

  width: "fit-content",
  height: "fit-content",
});

const TopContainer = styled("div", {
  display: "flex",
  justifyContent: "space-between",

  width: "100%",
  margin: "0 auto",
});

const AvatarBox = styled("div", {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "",
});

const UploadInputContainer = styled("div", {
  border: "1px solid $grey300",
  borderBottom: 0,
  borderLeft: 0,
  borderRight: 0,

  borderRadius: "0 0 20px 20px",

  marginTop: "4rem",
  flex: "1",

  textAlign: "center",

  'input[type="file"]': {
    display: "none",
  },
});

const UploadInput = styled(Input, {
  backgroundColor: "transparent",

  border: "1px solid $grey300",
  borderRadius: "0 0 20px 20px",
});

const Box = styled("div", {
  display: "flex",
  justifyContent: "space-between",
  borderBottom: "1px solid #D3D3D3",

  div: {
    flex: 1,

    borderTop: 0,
    borderBottom: 0,

    input: {
      border: 0,
    },

    "&:first-child": {
      borderLeft: 0,
      borderRight: "1px solid grey !important",
    },

    "&:last-child": {
      borderRight: 0,
      borderLeft: "1px solid grey !important",
    },
  },
});

const LineInput = styled(Input, {
  border: "1px solid $grey300",
  borderRadius: 0,
  backgroundColor: "transparent",
});

const UpdateButton = styled("button", {
  backgroundColor: "transparent",
  border: "1px solid $grey300",

  borderLeft: 0,
  borderRight: 0,
  borderBottom: 0,

  borderRadius: "0 0 20px 20px",

  height: "5rem",
  width: "100%",

  fontFamily: "$sansSerif",
  fontSize: "1.8rem",

  marginTop: "auto",

  "&:hover": {
    cursor: "pointer",
  },
});

const NoBorderTextArea = styled(TextArea, {
  borderTop: 0,
  borderLeft: 0,
  borderBottom: 0,

  borderRadius: 0,

  borderRight: "1px solid grey",

  height: "35rem",

  "&:last-child": {
    borderRight: 0,
  },
});
