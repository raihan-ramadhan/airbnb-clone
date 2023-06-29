"use client";

import axios from "axios";
import { toast } from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { signIn } from "next-auth/react";

import useRegisterModal from "@/app/hooks/useRegisterModal";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import Button from "../Button";
import { useRouter } from "next/navigation";
import useLoginModal from "@/app/hooks/useLoginModal";

const RegisterModal = () => {
  const router = useRouter();
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios
      .post("/api/register", data)
      .then(async () => {
        const loggedIn = await signIn("credentials", {
          ...data,
          redirect: false,
        });

        registerModal.onClose();
        router.refresh();

        loggedIn?.ok && !loggedIn?.error
          ? toast.success("Logged In")
          : loginModal.onOpen();
      })
      .catch((error) => {
        console.log(error, "ERROR_REGISTER");
        toast.error(error.message);
      })
      .finally(() => setIsLoading(false));
  };

  const toggle = useCallback(() => {
    registerModal.onClose();
    loginModal.onOpen();
  }, [loginModal, registerModal]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome to Airbnb" subtitle="Create an account" />
      <Input
        id="name"
        label="Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        onEnter={handleSubmit(onSubmit)}
      />
      <Input
        id="email"
        type="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        onEnter={handleSubmit(onSubmit)}
      />
      <Input
        id="password"
        type="password"
        label="Password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        onEnter={handleSubmit(onSubmit)}
      />
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button
        outline
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() => signIn("google")}
      />
      <Button
        outline
        label="Continue with Github"
        icon={AiFillGithub}
        onClick={() => signIn("github")}
      />
      <div className="text-neutral-500 text-center mt-4 font-light">
        <div className="text-center">
          <div className="inline-block">Already have an account</div>{" "}
          <div
            onClick={toggle}
            className="text-neutral-800 cursor-pointer hover:underline inline-block"
          >
            Log in
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title="Register"
      actionLabel="Continue"
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default RegisterModal;
