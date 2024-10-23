import image1 from "../assets/banner_modelled_heme.jpg";
import image2 from "../assets/banner_protein_activesite.jpg";
import image3 from "../assets/banner_heme_watermol.jpg";

const HomeCover = () => {
  return (
    <div>
      <div className="flex max-w-screen-xl max-lg:max-w-2xl max-xl:h-[300px]  max-sm:h-[450px] mx-auto justify-center items-center  ">
        <div className=" carousel">
          <div
            id="item1"
            className="flex items-center justify-between w-full gap-3 mx-auto max-sm:flex-col carousel-item "
          >
            <div className="flex flex-col gap-2 w-[45%]">
              <h3 className="md:text-xl">
                The future of{" "}
                <span className="font-bold text-[#edeaff]">
                  Biotransformation
                </span>{" "}
                &nbsp;is here
              </h3>
              <p>
                Gone are the days of enzyme evolution. Now , design enzymes
                specific for your needs.Mange your product life cycle digitally
              </p>
            </div>
            <div className="w-[50%]">
              <img src={image1} alt="" className="w-full h-[85%] " />
            </div>
          </div>
          <div
            id="item2"
            className="flex items-center justify-center w-full mx-auto max-sm:flex-col carousel-item"
          >
            <div className="flex flex-col gap-2 w-[45%]">
              <h3 className="text-xl">
                Thinking <span className="font-bold text-[#a1dfa1]">green</span>
                &nbsp;is the first step
              </h3>
              <p>
                Want to reduce or eliminate the use of hazardous
                substances?Thinking of shelving your sustainability
                initiatives?Take the next step and talk to us.
              </p>
            </div>
            <div className="w-[50%]">
              <img src={image2} alt="" />
            </div>
          </div>
          <div
            id="item3"
            className="flex items-center justify-center w-full mx-auto max-sm:flex-col carousel-item"
          >
            <div className="flex flex-col gap-2 w-[45%]">
              <h1 className="text-xl">
                Partner with the{" "}
                <span className="text-[#ff9892] font-bold">best</span>
              </h1>
              <p>
                From discovery to engineering and engineering to scale-up,let
                technology do the hard work for you.With successful
                implementations,Quantumzyme is unmatched in its science and
                technology.
              </p>
            </div>
            <div className="w-[50%]">
              <img src={image3} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeCover;
