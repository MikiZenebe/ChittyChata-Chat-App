import logo from "@/assets/chat.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { toast } from "sonner";
import { apiClient } from "@/lib/api-client";
import { LOGIN_ROUTE, SIGUP_ROUTE } from "@/utils/constants";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "@/store";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const { setUserInfo } = useAppStore();
  const navigate = useNavigate();

  const validateSignup = () => {
    if (!email.length || !password.length) {
      toast.error("Check Email & Password", {
        classNames: {
          toast: "group-[.toaster]:bg-red-500 group-[.toaster]:text-white",
          closeButton: "group-[.toaster]:bg-primary",
        },
      });
      return false;
    }

    if (password !== confirmPass) {
      toast.error("Password & confirm password should be matched", {
        classNames: {
          toast: "group-[.toaster]:bg-red-500 group-[.toaster]:text-white",
          closeButton: "group-[.toaster]:bg-primary",
        },
      });
      return false;
    }

    return true;
  };
  const validateLogin = () => {
    if (!email.length || !password.length) {
      toast.error("Check Email & Password", {
        classNames: {
          toast: "group-[.toaster]:bg-red-500 group-[.toaster]:text-white",
          closeButton: "group-[.toaster]:bg-primary",
        },
      });
      return false;
    }

    return true;
  };

  const handleLogin = async () => {
    if (validateLogin()) {
      const res = await apiClient.post(
        LOGIN_ROUTE,
        { email, password },
        {
          withCredentials: true,
        }
      );
      if (res.data.user._id) {
        setUserInfo(res.data.user);
        if (res.data.profileSetup) navigate("/chat");
        else navigate("/profile");
      }

      toast.success("Logged in successfully 🚀🚀", {
        classNames: {
          toast: "group-[.toaster]:bg-green-500 group-[.toaster]:text-white",
          closeButton: "group-[.toaster]:bg-primary",
        },
      });
    }
  };

  const handleSignup = async () => {
    if (validateSignup()) {
      const res = await apiClient.post(
        SIGUP_ROUTE,
        { email, password },
        {
          withCredentials: true,
        }
      );

      if (res.status === 201) {
        setUserInfo(res.data.user);
        navigate("/profile");
      }

      toast.success("Registerd successfully 🚀🚀", {
        classNames: {
          toast: "group-[.toaster]:bg-green-500 group-[.toaster]:text-white",
          closeButton: "group-[.toaster]:bg-primary",
        },
      });
    }
  };

  return (
    <div className="h-[100vh] w-[100vw] flex items-center justify-center">
      <div className="h-auto bg-white border-2 border-slate-200 rounded-3xl text-opacity-90 w-[80vw] md:w-[90vw] lg:w-[50vw]   p-6 py-8 mx-auto">
        <div className="flex flex-col gap-5 items-center justify-center ">
          <div className="flex items-center justify-center flex-col gap-3">
            <div className="flex items-center justify-center gap-2">
              <img src={logo} alt="Victory emoji" className="h-[40px]" />
              <h1 className="text-4xl font-bold md:text-5xl">ቡና ሰዓት</h1>
              <img src={logo} alt="Victory emoji" className="h-[40px]" />
            </div>

            <p className="font-medium text-center">
              Welcome and get start to with the best chat app!
            </p>
          </div>

          <div className="flex items-center justify-center w-full">
            <Tabs className="w-3/4" defaultValue="login">
              <TabsList className="bg-transparent rounded-none w-full">
                <TabsTrigger
                  value="login"
                  className="data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:text-black data-[state=active]:font-semibold data-[state=active]:border-b-[#23B9F6] p-3 transition-all duration-300"
                >
                  Login
                </TabsTrigger>
                <TabsTrigger
                  value="signup"
                  className="data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:text-black data-[state=active]:font-semibold data-[state=active]:border-b-[#23B9F6] p-3 transition-all duration-300"
                >
                  Signup
                </TabsTrigger>
              </TabsList>
              <TabsContent className="flex flex-col gap-5 mt-5" value="login">
                <Input
                  placeholder="Email"
                  type="email"
                  className="input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <Input
                  placeholder="Password"
                  type="password"
                  className="input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <Button onClick={handleLogin} className="btn">
                  Login
                </Button>
              </TabsContent>
              <TabsContent className="flex flex-col gap-5" value="signup">
                <Input
                  placeholder="Email"
                  type="email"
                  className="input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <Input
                  placeholder="Password"
                  type="password"
                  className="input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Input
                  placeholder="Confirm Password"
                  type="password"
                  className="input"
                  value={confirmPass}
                  onChange={(e) => setConfirmPass(e.target.value)}
                />

                <Button onClick={handleSignup} className="btn">
                  Signup
                </Button>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
