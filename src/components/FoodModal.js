import { DishPic } from "./DishPic";

export function FoodModal({
  setIsModalOpen,
  food,
  relation,
  nakayoshiImg,
  containDishList,
  foodImgURL,
}) {
  return (
    <>
      <div className="modal" onClick={() => setIsModalOpen(false)}></div>
      <div
        className="modal-inner"
        // style={{
        //   display: "grid",
        //   gridTemplateColumns: "1fr 1fr",
        //   gridTemplateRows: "300px 1fr",
        // }}
      >
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          <div style={{ textAlign: "center", flex: "0 1 300px", flexGrow: 1 }}>
            <img src={foodImgURL} style={{ width: "300px" }}></img>
          </div>
          <div style={{ textAlign: "center", flex: "0 1 300px", flexGrow: 1 }}>
            <h3>あなたと{food.name}は</h3>
            <h1>{relation}</h1>
            <h3>仲良し度</h3>
            <img src={nakayoshiImg} style={{ width: "300px" }}></img>
          </div>
        </div>
        <div
        // style={{ gridColumn: "1/3" }}
        >
          <h3>今までに作った{food.name}料理</h3>
          <ul className="dish-list">
            {containDishList.map((containDish) => (
              <DishPic key={containDish.id} containDish={containDish} />
            ))}
          </ul>
        </div>
        {/* <button
          className="modal-close-btn"
          onClick={() => setIsModalOpen(false)}
        > */}
        {/* ×</button> */}
      </div>
    </>
  );
}
