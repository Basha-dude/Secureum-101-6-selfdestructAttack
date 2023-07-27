const {expect} = require("chai");
const {ethers} = require("hardhat");

  describe("EtherGame",  async function () {
    let etherGame,owner,attacker,attack
    beforeEach(async function() {
    const EtherGame = await ethers.getContractFactory("EtherGame");
        etherGame = await EtherGame.deploy();
        
        const Attack = await ethers.getContractFactory("Attack");
        attack = await Attack.deploy(etherGame.address);
        [owner,attacker] = await ethers.getSigners();
    })

    it("Deposite", async function () {
      //await etherGame.deposit({value: ethers.utils.parseEther("1.0 ether")})
      const valueInWei = ethers.utils.parseEther("1.0");

    // Call the contract function with the value in wei
    await etherGame.deposit({ value: valueInWei });
      //const balance = await ethers.getBalance(etherGame.address)
      await etherGame.connect(attacker).deposit({ value: valueInWei });
      const balance = await etherGame.balance();
      console.log(balance);
      //expect(await lock.owner()).to.equal(owner.address);
    });

    it("Attack",async () => {
      const valueInWei = ethers.utils.parseEther("5.0");
      await attack.connect(attacker).attack({ value: valueInWei }) 
      console.log(await etherGame.winner());
    })


   

  
    });

