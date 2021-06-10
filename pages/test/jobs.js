import JobComponent from "@/components/JobComponent";

const Jobs = ({ data }) => {
  return <JobComponent data={data} />;
};

export const getServerSideProps = async () => {
  const res = await fetch(process.env.BASE_URL + "/api/jobs");
  const response = await res.json();
  const data = response.data;
  // console.log(data);
  return {
    props: { data },
  };
};

export default Jobs;
