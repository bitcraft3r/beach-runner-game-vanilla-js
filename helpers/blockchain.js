let provider = new ethers.providers.Web3Provider(window.ethereum)
let signer
totalGweiScore = 0 // however if 0 score, click Claim Tokens will error

async function connectMetamask() {
    await provider.send("eth_requestAccounts", []);
    signer = await provider.getSigner();
    console.log("Account address:", await signer.getAddress());

    const balance = await signer.getBalance()
    const convertToEth = 1e18;
    console.log("account's balance in ether:", balance.toString() / convertToEth);
}

async function claimTokens() {
    const runTokenContractAddress = "0x729B0845f63C9ea57dE0b194ECEc453C19c7206D"; // input address
    const runTokenContractAbi = [
        "function mintTokens(address account, uint256 amount) public",
    ];
    const runTokenContract = new ethers.Contract(runTokenContractAddress, runTokenContractAbi, provider);
    let convertToWei = 1000000000
    // let amountToClaim = window.totalGweiScore * convertToWei
    let amountToClaim = window.totalGweiScore * convertToWei * convertToWei
    // let amountToClaim = 100000000000 * 1000000000 // 1
    await runTokenContract.connect(signer).mintTokens(signer.getAddress(), amountToClaim.toString())
}

async function claimNft() {
    const nftContractAddress = "0xD06aA67849b3EEb12D52683b95aF271724c094A0"; // input address
    const mintContractAbi = [
        "function mint(uint256 amount) public",
    ];
    const nftContract = new ethers.Contract(nftContractAddress, mintContractAbi, provider);
    // await nftContract.connect(signer).mint(window.totalNFTScore.toString())
    await nftContract.connect(signer).mint(`1`.toString())
}