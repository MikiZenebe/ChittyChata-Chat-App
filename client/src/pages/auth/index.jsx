import BG from "@/assets/login2.png";
import Victory from "@/assets/victory.svg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const handleLogin = async () => {};

  const handleSignup = async () => {};

  return (
    <div className="h-[100vh] w-[100vw] flex items-center justify-center">
      <div className="h-[90vh] bg-white border-2 border-slate-200 rounded-3xl text-opacity-90 w-[80vw] md:w-[90vw] lg:w-[70vw] xl:w-[60vw] grid xl:grid-cols-2 p-6">
        <div className="flex flex-col gap-5 items-center justify-center">
          <div className="flex items-center justify-center flex-col">
            <div className="flex items-center justify-center">
              <h1 className="text-4xl font-bold md:text-5xl">Welcome</h1>
              <img src={Victory} alt="Victory emoji" className="h-[100px]" />
            </div>

            <p className="font-medium text-center">
              Fill in the details to get started with the best chat app!
            </p>
          </div>

          <div className="flex items-center justify-center w-full">
            <Tabs className="w-3/4">
              <TabsList className="bg-transparent rounded-none w-full">
                <TabsTrigger
                  value="login"
                  className="data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:text-black data-[state=active]:font-semibold data-[state=active]:border-b-orange-400 p-3 transition-all duration-300"
                >
                  Login
                </TabsTrigger>
                <TabsTrigger
                  value="signup"
                  className="data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:text-black data-[state=active]:font-semibold data-[state=active]:border-b-orange-400 p-3 transition-all duration-300"
                >
                  Signup
                </TabsTrigger>
              </TabsList>
              <TabsContent className="flex flex-col gap-5 mt-5" value="login">
                <Input
                  placeholder="Email"
                  type="email"
                  className="rounded-full p-6 transition-all duration-300 ease-out outline-none focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <Input
                  placeholder="Password"
                  type="password"
                  className="rounded-full p-6 transition-all duration-300 ease-out outline-none focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <Button
                  onClick={handleLogin}
                  className="rounded-full p-6 bg-orange-400 transition-all duration-300 ease-out"
                >
                  Login
                </Button>
              </TabsContent>
              <TabsContent className="flex flex-col gap-5" value="signup">
                <Input
                  placeholder="Email"
                  type="email"
                  className="rounded-full p-6 transition-all duration-300 ease-out outline-none focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <Input
                  placeholder="Password"
                  type="password"
                  className="rounded-full p-6 transition-all duration-300 ease-out outline-none focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Input
                  placeholder="Confirm Password"
                  type="password"
                  className="rounded-full p-6 transition-all duration-300 ease-out outline-none focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                  value={confirmPass}
                  onChange={(e) => setConfirmPass(e.target.value)}
                />

                <Button
                  onClick={handleSignup}
                  className="rounded-full p-6 bg-orange-400 transition-all duration-300 ease-out"
                >
                  Signup
                </Button>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        <div className="justify-center items-center hidden xl:flex">
          <img src={BG} alt="background login" className="h-[500px]" />
        </div>
      </div>
    </div>
  );
}
