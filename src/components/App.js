import React, { Component } from 'react';

import Web3 from 'web3'

import Navbar from './Navbar'
import Main from './Main'

import Tether from '../build/contracts/Tether.json'
import RWD from '../build/contracts/RWD.json'
import DecentralBank from '../build/contracts/DecentralBank.json'

class App extends Component{

    async UNSAFE_componentWillMount(){
        await this.loadWeb3()
        await this.loadBlockchainData()
    }

    async loadWeb3() {
        //connect to web3 and account
        if(window.ethereuem){
            window.web3 = new Web3(window.ethereuem)
            await window.ethereuem.enable()
        } else if(window.web3){
            window.web3 = new Web3(window.web3.currentProvider)
        } else {
            window.alert('No ethereum browser detected! You can try out MetaMask!')
        }
    }

    async loadBlockchainData(){
        //load account
        const web3 = await window.web3
        const [account] = await web3.eth.getAccounts()
        this.setState({account})

        //Get network id
        const networkId = await web3.eth.net.getId()

        //load contracts
        const tetherData = Tether.networks[networkId]
        if(tetherData) {
            const tether = new web3.eth.Contract(Tether.abi, tetherData.address)
            this.setState({ tether })
            let tetherBalance = await tether.methods.balanceOf(this.state.account).call()
            this.setState({tetherBalance: tetherBalance.toString()})
            
        } else {
            window.alert('Error! Tether contract not deployed - No detected network!')
        }

        const rwdData = RWD.networks[networkId]
        if(rwdData){
            const rwd = new web3.eth.Contract(RWD.abi, rwdData.address)
            this.setState({rwd})
            let rwdBalance = await rwd.methods.balanceOf(this.state.account).call()
            this.setState({rwdBalance: rwdBalance.toString()})
        } else {
            window.alert('Error! Reward contract not deployed - No detected network!')
        }

        const decentralBankData = DecentralBank.networks[networkId]
        if(decentralBankData){
            const decentralBank = new web3.eth.Contract(DecentralBank.abi, decentralBankData.address)
            this.setState({decentralBank})
            let stakingBalance = await decentralBank.methods.stakingBalance(this.state.account).call()
            this.setState({stakingBalance: stakingBalance.toString()})
        } else {
            window.alert('Error! DecentralBank contract not deployed - No detected network!')
        }
        this.setState({loading: false})
    }

    //two functions, one that stakes, one that unstakes
    stakeTokens = (amount) => {
        this.setState({loading: true})
        this.state.tether.methods.approve(this.state.decentralBank._address, amount).send({from: this.state.account}).on('transactionHash', (hash)=> {
            this.state.decentralBank.methods.depositTokens(amount).send({from: this.state.account}).on('transactionHash', (hash) => {
                this.setState({loading: false})
            })
        })
    }

    unstakeTokens = () => {
        this.setState({loading: true})
        this.state.decentralBank.methods.unstakeTokens().send({from: this.state.account}).on('transactionHash', (hash)=> {
            this.setState({loading: false})
        })
    }

    constructor(props){
        super(props)
        this.state = {
            account: '0x0',
            tether: {},
            rwd: {},
            decentralBank: {},
            tetherBalance: '0',
            rwdBalance: '0',
            stakingBalance: '0',
            loading: true,
        }
    }

    render() {
        let content
        {this.state.loading ? content = <p id='loader' className='text-center' style={{margin: 30}}>Loading Please...</p> : content = <Main tetherBalance={this.state.tetherBalance} rwdBalance={this.state.rwdBalance} stakingBalance={this.state.stakingBalance} stakeTokens={this.stakeTokens} unstakeTokens={this.unstakeTokens}/>}

        return (
            <div>
                <Navbar account={this.state.account}/>
                <div className='container-fluid mt-5'>
                    <div className='row'>
                        <main role='main' className='col-lg-12 ml-auto mr-auto' style={{maxWidth: 600, minHeight: '100wm'}}>
                            <div>
                                {content}
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        )
    }
}

export default App
