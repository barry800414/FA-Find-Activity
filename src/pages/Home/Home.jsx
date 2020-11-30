import React, { useState, useContext, useEffect } from "react";
import styled from "@emotion/styled";
import Button from "../../components/common/Button";
import Header from "../../components/common/Header";
import Category from "../../components/common/Category";
import ActivityCard from "../../components/common/ActivityCard";
import Footer from "../../components/common/Footer";
import { FaAngleDoubleRight } from "react-icons/fa";
import { AuthContext } from "../../contexts";

const HomeContainer = styled.div`
  font-family: ${({ theme }) => theme.$fontFamily};
  padding-top: 4rem;
`;

const Carousel = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 100%;
  height: 380px;
  background-color: ${({ theme }) => theme.$colorYellow};
`;

const ActivityContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const MoreActivityButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1rem 0 2rem 0;
  height: 3rem;
`;

const MoreActivityButton = styled(Button)`
  width: 330px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: ${({ theme }) => theme.$colorWhite};
    box-shadow: inset 22rem 0 0 0 ${({ theme }) => theme.$colorRed};
    border: 0;
  }

  svg {
    margin: 0 0.5rem;
  }
`;

const Home = () => {
  const { activityData, setActivityData } = useContext(AuthContext);
  const [dataNum, setDataNum] = useState(0);
  const [categoryNum, setCategoryNum] = useState(1);

  const handleChangeCategory = (categoryNum) => {
    setCategoryNum(categoryNum);
    setDataNum(9);
  };

  const handleShowMoreActivity = () => {
    setDataNum((dataNum) => dataNum + 9);
  };

  useEffect(() => {
    handleShowMoreActivity();
  }, []);

  const ActivityCardLists = activityData
    .filter((data) => data.imageUrl !== "")
    .filter((data) => Number(data.category) === categoryNum)
    .map((data) => (
      <ActivityCard
        imageUrl={data.imageUrl}
        title={data.title}
        time={data.endDate}
        locationName={data.showInfo[0].locationName}
        description={data.descriptionFilterHtml}
      />
    ))
    .slice(1, dataNum + 1);
  console.log(activityData);
  console.log(categoryNum);
  console.log(dataNum);
  return (
    <>
      <Header />
      <HomeContainer>
        <Carousel />
        <Category handleChangeCategory={handleChangeCategory} />
        <ActivityContainer>{ActivityCardLists}</ActivityContainer>
        <MoreActivityButtonContainer>
          <MoreActivityButton onClick={handleShowMoreActivity}>
            尋找更多活動
            <FaAngleDoubleRight />
          </MoreActivityButton>
        </MoreActivityButtonContainer>
      </HomeContainer>
      <Footer />
    </>
  );
};

export default Home;
