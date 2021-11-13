import React, { useEffect } from "react";
import tw from "tailwind-styled-components";
import { useRouter } from "next/router";
import { signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { auth, provider } from "../firebase";

const Login = () => {
  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push("/");
      }
    });
  }, []);
  return (
    <Wrapper>
      <UberLogo src="https://i.ibb.co/n6LWQM4/Post.png" />

      <Title>Log In To Access Your Account</Title>
      <MainImg src="https://i.ibb.co/CsV9RYZ/login-image.png" />
      <SignInButton onClick={() => signInWithPopup(auth, provider)}>
        {" "}
        Sign In With Google
      </SignInButton>
    </Wrapper>
  );
};

export default Login;

const Wrapper = tw.div`flex flex-col h-screen w-screen p-4 bg-gray-200`;

const SignInButton = tw.button`
bg-black text-white text-center py-4 mt-8 self-center w-full
`;
const UberLogo = tw.img`h-20 w-auto object-contain self-start`;

const Title = tw.div`text-5xl p-4 text-gray-500 text-center`;

const MainImg = tw.img`object-contain w-full h-80`;
