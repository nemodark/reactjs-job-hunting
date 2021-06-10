import axios from "axios";

const handler = async (req, res) => {
  const url = "https://www.zippia.com/api/jobs";
  const data = {
    companySkills: true,
    dismissedListingHashes: [],
    fetchJobDesc: true,
    jobTitle: "Business Analyst",
    locations: [],
    numJobs: 20,
    previousListingHashes: [],
  };
  const header = {
    "Content-Type": "application/json",
  };
  //call the api using axios to fetch the data
  return new Promise((resolve, reject) => {
    axios
      .post(url, data, header)
      .then((response) => {
        if (response.status === 200 && response.data) {
          //assign the response values to a variable to be used on the components and pages
          const data = response.data;
          res.status(200).json({
            status: true,
            data: data,
          });
          resolve();
        }
      })
      .catch((err) => {
        res.json(err);
        res.status(401).json({
          status: false,
          data: null,
        });
        return reject(err);
      });
  });
};

export default handler;
