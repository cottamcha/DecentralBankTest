import React, {Component} from 'react'
import tetherLogo from '../tether.png'

class Main extends Component {
    render() {
        return (
            <div id='content' className='mt-3'>
                <table className='table text-muted text-center'>
                    <thead>
                        <tr style={{color: 'black'}}>
                            <th scope='col'>Staking Balance</th>
                            <th scope='col'>Reward Balance</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr style={{color: 'black'}}>
                            <td>{window.web3.utils.fromWei(this.props.stakingBalance, 'Ether')} USDT</td>
                            <td>{window.web3.utils.fromWei(this.props.rwdBalance, 'Ether')} RWD</td>
                        </tr>
                    </tbody>
                </table>
                <div className='card mb-2' style={{opacity: 0.9}}>
                    <form className='mb-3' onSubmit={(event) => {
                        event.preventDefault();
                        let amount
                        amount = this.input.value.toString()
                        amount = window.web3.utils.toWei(amount, 'Ether')
                        this.props.stakeTokens(amount)
                    }}>
                        <div style={{borderSpacing: '0.1rem'}}>
                            <label className='float-left' style={{marginLeft: 15}}><strong>Stake Tokens</strong></label>
                            <span className='float-right' style={{marginRight: 8}}>
                                Balance: {window.web3.utils.fromWei(this.props.tetherBalance, 'Ether')}
                            </span>
                            <div className='input-group mb-4'>
                                <input ref={(input)=>this.input = input} type='text' placeholder='0' required />
                                <div className='input-group-open'>
                                    <div className='input-group-text'>
                                        <img src={tetherLogo} alt='tether' height={32}/>
                                        &nbsp; USDT
                                    </div>
                                </div>
                            </div>
                            
                            <button type='submit' className='btn btn-primary btn-lg btn-block'>Deposit</button>
                        </div>
                    </form>
                    <button className='btn btn-success btn-lg btn-block' onClick={this.props.unstakeTokens}>Withdraw</button>
                    <div className='card-body text-center' style={{color: 'blue'}}>
                        AIRDROP
                    </div>
                </div>
            </div>
        )
    }
}

export default Main