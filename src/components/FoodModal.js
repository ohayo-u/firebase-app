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
      <div className="modal-inner">
        <div className="food-info">
          <img src={foodImgURL}></img>
          <div>
            <h3>あなたと{food.name}は</h3>
            <h1>{relation}</h1>
            <h3>仲良し度</h3>
            <img src={nakayoshiImg} id="nakayoshi_heart"></img>
          </div>
        </div>
        <h3>今までにつくった{food.name}料理</h3>
        <ul className="dish-list">
          {containDishList.map((containDish) => (
            <DishPic key={containDish.id} containDish={containDish} />
          ))}
        </ul>
        <button
          className="modal-close-btn"
          onClick={() => setIsModalOpen(false)}
        >
          ×
        </button>
      </div>
    </>
  );
}
