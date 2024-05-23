"use client"
import axios from "axios"
import React, { useState, } from 'react'
const SignIn = () => {

    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")

    const onSignIn = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const response = await axios.post("http://localhost:8080/auth/signin", {
                username: userName,
                password: password
            }, {
                withCredentials: true
            })
            alert(response.data.message)
        } catch (error: any) {
            if (error.response && error.response.data && error.response.data.message) {
                alert(error.response.data.message)
            } else {
                console.error("Error in signup: ", error)
                alert("An error occurred during signup. Please try again.")
            }
        }
    }

    return (
        <div>
            <div className='h-[100vh] flex w-[100vw] flex-col gap-3 justify-center items-center'>
                <div className='h-2/3 w-1/3 flex flex-col justify-end rounded-xl'>
                    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">Sign in to your account</h2>
                        </div>
                        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                            <form className="space-y-6" action="#" onSubmit={onSignIn} method="POST">
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-indigo-600">User Name</label>
                                    <div className="mt-2">
                                        <input id="email" name="userName" type="username" autoComplete="email" required value={userName} onChange={(e) => setUserName(e.target.value)} className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex items-center justify-between">
                                        <label htmlFor="password" className="block text-sm font-medium leading-6 text-indigo-600">Password</label>
                                        <div className="text-sm">
                                            <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
                                        </div>
                                    </div>
                                    <div className="mt-2">
                                        <input id="password" name="password" type="password" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                    </div>
                                </div>
                                <div>
                                    <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
                                </div>
                            </form>
                            <p className="mt-10 text-center text-sm text-gray-500">
                                Not a User ?
                                <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 pl-2">Sign up</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default SignIn