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

//   const queryURL = () => {
//     let coordinates = [];

//     for (let i = 0; i <= path.features.length - 1; i++) {
//         coordinates.push(path.features[i].geometry.coordinates);
//     }

//     return `https://api.mapbox.com/optimized-trips/v1/mapbox/walking/${coordinates.join(
//         ';',
//     )}?&overview=full&steps=true&geometries=geojson&source=first&access_token=${mapboxgl.accessToken}`;
// };
//   const displayOwnRoutes = () => {
//           map.getSource('route').setData(nothing);
//       };



  return {
    props: {
      data: data.data,
    },
  };
};

export default DetailedRoute;
