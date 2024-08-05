import type { NextPage } from "next";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useEntryStore } from "../hooks/useEntryStore";
import { useEffect } from "react";

const Home: NextPage = () => {
  const router = useRouter();
  const { entry, updateHandle, updateFullName, updateId, updateIsLoading } = useEntryStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { handle: entry?.handle, fullName: entry?.fullName } });
  const onSubmit = async (data: { [x: string]: any }) => {
    updateFullName(data.fullName);
    updateIsLoading(false);
    router.push("/editor");
  };

  useEffect(() => {
    if (entry?.id) {
      router.push("/editor");
    }
  }, [router, entry?.id]);

  return (
    <>

      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Welcome!</h1>
        <h3>Please state your name</h3>
        <input
          type="text"
          placeholder="Full name"
          {...register("fullName", { required: true, max: 80, min: 5 })}
        />

        <input type="submit" className="button" />
      </form>
    </>
  );
};

export default Home;
