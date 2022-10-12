const Web3 = require("web3");
const abi_def = require("./abi");
const ava_abi = require("./avaAbi");
const axios = require("axios");
const abi = abi_def;
let test;
const uri = [];
const finalMeta = [];

const rpcURL = "https://mainnet.infura.io/v3/21d1df8208a048dfa2fa3acf5ba3776b";
const web3 = new Web3(rpcURL);
var data = [];
const accountAddr = "0xD4f0053c4e9c599a719b36dc20d5dEd1198230af";
const ContractAddress = [
  { abi: abi, Address: "0xeDa3b617646B5fc8C9c696e0356390128cE900F8" },
  { abi: abi, Address: "0xd0F0C40FCD1598721567F140eBf8aF436e7b97cF" },
  { abi: ava_abi, Address: "0x86fc6f6c6702ceF7d3BaE87eF41256715416DB71" },
];

async function getdata() {
  for (let i = 0; i < ContractAddress.length; i++) {
    const contract = new web3.eth.Contract(
      ContractAddress[i].abi,
      ContractAddress[i].Address
    );

    if (i == 2) {
      const name = await contract.methods.name().call();
      const tokens = await contract.methods.tokensOfOwner(accountAddr).call();
      const balance = await contract.methods.balanceOf(accountAddr).call();

      for (let j = 0; j < tokens.length; j++) {
        uri[j] = await contract.methods.tokenURI(tokens[j]).call();

        const response = await axios.get(uri[j]);
        data.push({
          name: name,
          Balance: balance,
          TokenMetaData: response.data,
        });
      }
    } else {
      const stoken = await contract.methods.balanceOf(accountAddr).call();
      for (let i = 0; i < stoken; i++) {
        const result = await contract.methods
          .tokenOfOwnerByIndex(accountAddr, i)
          .call();
        test = result;
      }
      const uri = await contract.methods.tokenURI(test).call();
      const name = await contract.methods.name().call();
      const balance = await contract.methods.balanceOf(accountAddr).call();
      const response = await axios.get(uri);

      data.push({
        name: name,
        Balance: balance,
        TokenURI: uri,
        TokenMetaData: response.data,
      });
    }
  }
}
async function print() {
  await getdata();

  console.log(data);
}

print();
