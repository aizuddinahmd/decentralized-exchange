import React, { useState } from "react";
import styles from "../styles";
import { chevronDown } from "../assets";
import { Modal } from "antd";
import { tokenList } from "../constant";
import SwapIn from "./SwapIn";
import SwapOut from "./SwapOut";

const Exchange = () => {
  const [tokenOneAmount, setTokenOneAmount] = useState("");
  const [tokenTwoAmount, setTokenTwoAmount] = useState("");
  const [tokenOne, setTokenOne] = useState(tokenList[0]);
  const [tokenTwo, setTokenTwo] = useState(tokenList[1]);
  const [isOpen, setIsOpen] = useState(false);
  const [changeToken, setChangeToken] = useState(1);

  const changeAmount = (e) => {
    setTokenOneAmount(e.target.value);
  };

  const switchToken = () => {
    setTokenOneAmount("");
    const one = tokenOne;
    const two = tokenTwo;
    setTokenOne(two);
    setTokenTwo(one);
  };

  const modifyToken = (i) => {
    if (changeToken === 1) {
      setTokenOne(tokenList[i]);
    } else {
      setTokenTwo(tokenList[i]);
    }
    setIsOpen(false);
  };

  const openModal = (asset) => {
    setChangeToken(asset);
    setIsOpen(true);
  };

  return (
    <>
      <Modal
        open={isOpen}
        footer={null}
        onCancel={() => setIsOpen(false)}
        title="Select a token"
      >
        <div className={`${styles.currencyList} flex flex-col`}>
          {tokenList?.map((e, i) => {
            return (
              <div
                key={i}
                className={`${styles.currencyListItem} flex justify-between`}
                onClick={() => modifyToken(i)}
              >
                <img src={e.img} className={`h-10 w-10 object-contain`} />
                <div>{e.name}</div>
                <div>{e.ticker}</div>
              </div>
            );
          })}
        </div>
      </Modal>
      <div>
        <div className="">
          <SwapIn
            placeholder="0"
            value={tokenOneAmount}
            onChange={changeAmount}
            onClick={() => openModal(1)}
            token={tokenOne}
          />
        </div>
        <div className={`flex justify-center`}>
          <img
            src={chevronDown}
            alt="down"
            className={`w-8 h-8 object-contain cursor-pointer`}
            onClick={switchToken}
          />
        </div>
        <div className="mb-8">
          <SwapOut
            placeholder="0"
            value={tokenTwoAmount}
            onClick={() => openModal(2)}
            token={tokenTwo}
            disabled={true}
          />
        </div>
        <button className={`${styles.actionButton} bg-site-pink`}>Swap</button>
      </div>
    </>
  );
};

export default Exchange;
