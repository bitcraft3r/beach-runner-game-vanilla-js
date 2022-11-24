let provider = new ethers.providers.Web3Provider(window.ethereum)
let signer
totalGweiScore = 0;
async function connectMetamask() {
    await provider.send("eth_requestAccounts", []);
    signer = await provider.getSigner();
    console.log("Account address:", await signer.getAddress());

    const balance = await signer.getBalance()
    const convertToEth = 1e18;
    console.log("account's balance in ether:", balance.toString() / convertToEth);
}

async function claimTokens() {
    const runTokenContractAddress = "0x35d3d0372904e35e8e5b69c55d5c67adc2572637"; // input address
    const runTokenContractAbi = [
        "function mintTokens(address account, uint256 amount) public",
    ];
    const runTokenContract = new ethers.Contract(runTokenContractAddress, runTokenContractAbi, provider);
    let convertToWei = 1000000000
    // if amount claimed is >=1000 coins, will be error: "invalid BigNumber string"
    if (window.totalGweiScore >= 1000){
        window.totalGweiScore = 999.9999
    }
    let amountToClaim = window.totalGweiScore * convertToWei * convertToWei
    await runTokenContract.connect(signer).mintTokens(signer.getAddress(), amountToClaim.toString())
}

async function claimNft() {
    const nftContractAddress = "0xd7E9FeFb881196F647036971Fcde5c7E3CaF6Dd7"; // input address
    const mintContractAbi = [
        "function mint(uint256 amount) public",
    ];
    const nftContract = new ethers.Contract(nftContractAddress, mintContractAbi, provider);
    // await nftContract.connect(signer).mint(window.totalNFTScore.toString())
    await nftContract.connect(signer).mint(`1`.toString())
}