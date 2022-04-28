import nookies from "nookies";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useToast } from "@chakra-ui/react";

const Logout = ({ loggedOut }) => {
  const toast = useToast();
  const router = useRouter();

  useEffect(() => {
    if (loggedOut) {
      toast({
        title: "Logged out! Goodbye!",
        status: "success",
        isClosable: true,
        duration: 3000,
      });
    }
    router.push("/");
  }, []);

  return <></>;
};

export const getServerSideProps = async (ctx) => {
  const cookies = nookies.get(ctx);

  const jwt = cookies.jwt || null;

  if (jwt) {
    nookies.destroy(ctx, "jwt", {
      path: "/",
    });
  }

  return {
    props: {
      loggedOut: jwt != null,
    },
  };
};

export default Logout;
