import React, { useState, useContext, useEffect, useMemo } from "react";
import styled from "@emotion/styled";
import Button from "../../components/common/Button";
import Header from "../../components/common/Header";
import Category from "../../components/common/Category";
import ActivityCard from "../../components/common/ActivityCard";
import Footer from "../../components/common/Footer";
import { FaAngleDoubleRight } from "react-icons/fa";
import { AuthContext } from "../../contexts";
import SearchBar from "../../components/common/SearchBar";
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
  const { modifiedData } = useContext(AuthContext);
  // dataNum 是每頁的活動數嗎？  它會被改變嗎？ 如果不會，不需要存成 state，你用一個變數放在 component 外就好。
  const [dataNum, setDataNum] = useState(0);
  const [categoryNum, setCategoryNum] = useState(6);
  const [filteredInput, setFilteredInput] = useState(null);

  const handleChangeCategory = (categoryNum) => {
    setCategoryNum(categoryNum);
    setDataNum(9);
  };

  const handleShowMoreActivity = () => {
    setDataNum((dataNum) => dataNum + 9);
  };

  const handleUpdateInput = (e) => {
    setFilteredInput(e.target.value);
  };

  // 一般來說，我們通常 component 裡面存的是資料，而不是直接存 component
  // 所以這邊我改寫成，把你要顯示的活動卡片的資料先 filter 好，到下面 return
  // 的時候才 render

  const foundActivityCards = useMemo(() => {
    return modifiedData
      .filter((data) => {
        if (filteredInput === null) {
          // 這邊可以檢查 searchBar 裡面有沒有值，如果沒有，那就不過濾內容
          return true;
        } else {
          return data.title && data.title.indexOf(filteredInput) >= 0;
          // 這邊可以用字串的搜尋，只要有包含，就顯示出來。
          // 例如原本標題："《潛態》阮至立雕塑個展"
          // 只要有打"個展"，就可以搜尋到
        }
      })
      .filter((data) => Number(data.category) === categoryNum)
      .slice(0, dataNum);
  }, [modifiedData, filteredInput, categoryNum, dataNum]);

  useEffect(() => {
    handleShowMoreActivity();
  }, []);

  return (
    <>
      <Header />
      <HomeContainer>
        <SearchBar handleChange={handleUpdateInput} />
        <Carousel />
        <Category handleChangeCategory={handleChangeCategory} />
        <ActivityContainer>
          {foundActivityCards.map((data) => (
            <ActivityCard
              imageUrl={data.imageUrl}
              title={data.title}
              time={data.endDate}
              locationName={data.showInfo[0].locationName}
              description={data.descriptionFilterHtml}
              category={data.category}
              id={data.id}
              key={data.id} // render an array of component 的時候，要加上 key，不然效能會不好
            />
          ))}
        </ActivityContainer>
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
