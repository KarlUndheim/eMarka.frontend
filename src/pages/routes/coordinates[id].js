import RouteView from "../../components/RouteView";
import { FRONTEND_URL, BACKEND_URL } from "../../../consts";

const DetailedRoute = ({ data }) => {
  return <RouteView post={data} />;
};

export const getServerSideProps = async (ctx) => {
  const { id } = ctx.query;

  const res = await fetch(`${BACKEND_URL}/api/routes/${id}`);
  const data = await res.json();

  if (data.data == null) {
    return {
      redirect: {
        destination: "/routes/explore",
        permanent: false,
      },
    };
  }

  return {
    props: {
      data: data.data,
    },
  };
};

export default DetailedRoute;
