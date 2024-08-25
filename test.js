const xrpl = require("xrpl");

global.fetch = require("node-fetch");

async function main() {
  const client = new xrpl.Client("wss://s.altnet.rippletest.net:51233");
  await client.connect();

  const wallet = xrpl.Wallet.fromSeed("sEdSRDZL4oGuFqvuqaaUgCmbiKZkT7Z"); // Test secret; don't use for real
  const transaction = {
    Account: wallet.address,
    TransactionType: "AccountSet",
    Memos: [
      {
        Memo: {
          MemoType: Buffer.from("Title").toString("hex"),
          MemoData: Buffer.from("grant").toString("hex"),
        },
      },
    ],
  };

  try {
    const prepared = await client.autofill(transaction);
    const signed = wallet.sign(prepared);
    const result = await client.submitAndWait(signed.tx_blob);
    console.log(result);
  } catch (error) {
    console.log(error);
  }

  await client.disconnect();
}

main();
