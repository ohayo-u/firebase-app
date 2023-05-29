import React from "react";
import { DishPic } from "./DishPic";

interface Props {
  setIsModalOpen: any;
  food: any;
  relation: any;
  nakayoshiImg: any;
  containDishList: any;
  foodImgURL: string;
}

export const FoodModal: React.FC<Props> = (props) => {
  return (
    <>
      <div className="modal" onClick={() => props.setIsModalOpen(false)}></div>
      <div className="modal-inner">
        <div
          style={{ display: "flex", flexWrap: "wrap", marginBottom: "40px" }}
        >
          <div style={{ textAlign: "center", flex: "1 1 300px" }}>
            <img src={props.foodImgURL} style={{ width: "300px" }}></img>
          </div>
          <div style={{ textAlign: "center", flex: "1 1 300px" }}>
            <h3>あなたと{props.food.name}は</h3>
            <h1>{props.relation}</h1>
            <h3>仲良し度</h3>
            <img src={props.nakayoshiImg} style={{ width: "300px" }}></img>
          </div>
        </div>
        <div>
          <h3>今までに作った{props.food.name}料理</h3>
          <ul
            style={{
              display: "grid",
              gridGap: "3rem",
              gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr)",
            }}
          >
            {props.containDishList.map((containDish: any) => (
              <DishPic key={containDish.id} containDish={containDish} />
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};
