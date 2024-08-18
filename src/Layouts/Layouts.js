import React from 'react'
import { Outlet } from 'react-router-dom';
import Sidebar from '../Components/Sidebar/Sidebar';
import Header from '../Components/Header/Header';
import Login from '../Auth/Login';


function Layout(props) {

    let tokenndata = localStorage.getItem('token')
    console.log(tokenndata, "iiiiuiui")
    if (!tokenndata)
        return <Login />



    return (
        <div className="dark:bg-meta-4 dark:text-white">
            <div className="flex h-screen overflow-hidden">
                <Sidebar />
                <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
                    <Header />
                    <main className='pt-4'>
                        <div className="mx-auto  max-w-screen-2xl  md:p-6 2xl:p-10">
                            <Outlet />
                        </div>
                    </main>
                </div>
            </div>
        </div>

    )
}

export default Layout;