const chai = require("chai");
const expect = chai.expect;
const sinon = require("sinon");

const GrantService = require("../services/grantService");
const XRPLService = require("../services/xrplService");
const xrpl = require("xrpl");

describe("GrantService", () => {
  let grantService;
  let mockXrplService;
  let mockWallet;

  beforeEach(() => {
    // Sinon의 stub을 사용하여 XRPLService의 메서드를 모의 구현
    mockXrplService = {
      // stub(): 함수를 대체하는 모의 함수 생성
      connect: sinon.stub().resolves(),
      submitTransaction: sinon.stub().resolves({
        result: {
          meta: {
            TransactionResult: "tesSUCCESS",
          },
        },
      }),
    };

    grantService = new GrantService(mockXrplService);

    // 모의 지갑 객체 생성
    mockWallet = {
      address: "rTestAddress",
      sign: sinon.stub().returns({ tx_blob: "mockSignedTx" }),
    };

    // Sinon의 stub을 사용하여 xrpl.Wallet.fromSeed 메서드를 모의 구현
    sinon.stub(xrpl.Wallet, "fromSeed").returns(mockWallet);
  });

  afterEach(() => {
    // restore(): 모든 스텁, 모의 객체, 스파이를 원래 상태로 복원
    sinon.restore();
  });

  it("should create a new grant successfully", async () => {
    const grant = await grantService.createGrant();

    expect(grant).to.exist;
    expect(grant.title).to.equal("grant");
    expect(grant.description).to.equal("grant");
    expect(grant.owner).to.equal("rTestAddress");
    expect(grant.status).to.equal("Pending");

    // calledOnce: 함수가 정확히 한 번 호출되었는지 확인
    expect(mockXrplService.submitTransaction.calledOnce).to.be.true;
  });

  it("should throw an error if transaction fails", async () => {
    // resolves(): 스텁이 반환할 Promise 값을 설정
    mockXrplService.submitTransaction.resolves({
      result: {
        meta: {
          TransactionResult: "tecFAILED",
        },
      },
    });

    // 비동기 함수에서 에러가 발생하는지 테스트
    await expect(grantService.createGrant()).to.be.false();
  });
});
