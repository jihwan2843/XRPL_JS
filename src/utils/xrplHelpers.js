// 트랜잭션을 생성을 하는 헬퍼함수
class XRPHelpers {
  AccountSetTx(address, grant) {
    return {
      Account: address,
      TransactionType: "AccountSet",
      Memos: [
        {
          Memo: {
            MemoType: Buffer.from(grant.getTitle()).toString("hex"),
            MemoData: Buffer.from(JSON.stringify(grant)).toString("hex"),
          },
        },
      ],
    };
  }

  EscrowCreateTx(wallet, amount, grant) {
    return {
      TransactionType: "EscrowCreate",
      acount: wallet.address,
      amount: xrpl.xrpToDrops(amount),
      destination: grant.getOwner(),
      finishAfter: grant.getGrantDeadline(),
    };
  }

  PaymentTx(wallet, grant, amount) {
    return {
      TransactionType: "Payment",
      acount: wallet.address,
      amount: xrpl.xrpToDrops(amount),
      destination: grant.getOwner(),
    };
  }

  EscrowFinishTx(wallet, donation) {
    return {
      TransactionType: "EscrowFinish",
      acount: wallet.address,
      owner: donation.getSponsor(),
      offerSequence: donation.getEscrowCreateTxSequence(),
    };
  }
}

module.exports = XRPHelpers;
