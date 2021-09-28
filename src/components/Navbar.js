import React, { Component } from 'react'

import './Navbar.css'

// import bank from '../bank.png'



class Navbar extends Component {



    render() {
        return(
            <nav className='navbar nav-bg sticky-top shadow p-0' style={{height: 70}}>
                {/* <img src={bank} className='d-inline-block align-top' width={65} height={35}  alt='bank' /> */}
                <a href='/' className='navbar-brand doppio-font col-sm-3 col-md-2 mr-0 ml-3' style={{color: 'white', fontSize: 25}}>
                    Decentralized Bank
                </a>
                <ul className='navbar-nav px-3'>
                    <li className='text-nowrap d-none nav-item d-sm-none d-sm-block mr-3'>
                        <small style={{color: 'white', fontSize: 15}}><strong className='doppio-font'style={{fontSize: 18, letterSpacing: 0.8}}>Account Number: </strong>{this.props.account}</small>
                    </li>
                </ul>
            </nav>
        )
    }
}

export default Navbar
