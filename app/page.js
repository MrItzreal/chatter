import { redirect } from "next/navigation";

const Home = () => {
  redirect("/signin");
  return null;
};

export default Home;
