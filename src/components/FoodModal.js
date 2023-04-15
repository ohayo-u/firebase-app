export function FoodModal({
  setIsModalOpen,
  food,
  relation,
  nakayoshiImg,
  containDishList,
}) {
  return (
    <>
      <div className="modal" onClick={() => setIsModalOpen(false)}></div>
      <div className="modal-inner">
        <p>あなたと{food.name}は</p>
        <h1>{relation}</h1>
        <h3>仲良し度</h3>
        <img src={nakayoshiImg} id="nakayoshi_heart"></img>
        <h2 className="section-title">今までにつくった{food.name}料理</h2>
        <ul className="dish-list">
          {containDishList.map((containDish) => (
            <li key={containDish.id}>{containDish.name}</li>
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
