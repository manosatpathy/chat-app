"use client"
import React, { useState } from 'react'
import axios from "axios"
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const SignUp = () => {
    const router = useRouter()
    const [name, setName] = useState<string>("")
    const [userName, setUserName] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const onSignup = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const response = await axios.post("http://localhost:8082/auth/signup", {
                name: name,
                username: userName,
                password: password
            }, {
                withCredentials: true
            })
            router.push("/signin")
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
                            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">Sign up to your account</h2>
                        </div>
                        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                            <form className="space-y-6" onSubmit={onSignup} action="#" method="POST">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium leading-6 text-indigo-600">Full Name</label>
                                    <div className="mt-2">
                                        <input id="name" name="name" type="text" autoComplete="name" required value={name} onChange={(e) => setName(e.target.value)} className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-indigo-600">User Name</label>
                                    <div className="mt-2">
                                        <input id="email" name="username" type="username" autoComplete="email" required value={userName} onChange={(e) => setUserName(e.target.value)} className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex items-center justify-between">
                                        <label htmlFor="password" className="block text-sm font-medium leading-6 text-indigo-600">Password</label>
                                        <div className="text-sm">
                                        </div>
                                    </div>
                                    <div className="mt-2">
                                        <input id="password" name="password" type="password" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                    </div>
                                </div>
                                <div>
                                    <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign up</button>
                                </div>
                            </form>
                            <p className="mt-10 text-center text-sm text-gray-500">
                                Already a User ?
                                <Link href="signin" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 pl-2">Sign in</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default SignUp
