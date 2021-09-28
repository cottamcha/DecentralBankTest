// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import './RWD.sol';
import './Tether.sol';

contract DecentralBank {
    string public name = 'Decentral Bank';
    address public owner;
    Tether public tether;
    RWD public rwd;

    address[] public stakers;

    mapping(address => uint) public stakingBalance;
    mapping(address => bool) public hasStaked;
    mapping(address => bool) public isStaked;

    constructor(RWD _rwd, Tether _tether) public {
        rwd = _rwd;
        tether = _tether;
        owner = msg.sender;
    }

    function depositTokens(uint _amount) public {
        require(_amount > 0, 'amount cannot be 0');

        //transfer tether tokens to this address for staking
        tether.transferFrom(msg.sender, address(this), _amount);

        //update staking balance
        stakingBalance[msg.sender] = stakingBalance[msg.sender] + _amount;

        if(!hasStaked[msg.sender]){
            stakers.push(msg.sender);
        }

        //update staking balance
        isStaked[msg.sender] = true;
        hasStaked[msg.sender] = true;
    }

    //untake tokens
    function unstakeTokens() public{
        uint balance = stakingBalance[msg.sender];
        //require the maount greater than 0
        require(balance > 0, 'Staking balance cannot be less than 0');
        //transfer the tokens to specified contract address from our bank
        tether.transfer(msg.sender, balance);
        //reset staking balance
        stakingBalance[msg.sender] = 0;
        //update staking status
        isStaked[msg.sender] = false;
    }

    //issue rewards
    function issueTokens() public{
        require(msg.sender == owner, 'Caller must be owner.');

        for(uint i=0; i < stakers.length; i++){
            address recipient = stakers[i];
            uint balance = stakingBalance[recipient] / 9;
            if(balance > 0){
                rwd.transfer(recipient, balance);
            }
        }
    }
}
