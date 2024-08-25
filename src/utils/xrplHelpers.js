// 트랜잭션을 생성을 하는 헬퍼함수

const xrpl = require("xrpl");

function createGrantTransaction(address, title) {
  return {
    Account: address,
    TransactionType: "AccountSet",
    Memos: [
      {
        Memo: {
          MemoType: Buffer.from("Title").toString("hex"),
          MemoData: Buffer.from(title).toString("hex"),
        },
      },
    ],
  };
}

module.exports = createGrantTransaction;
