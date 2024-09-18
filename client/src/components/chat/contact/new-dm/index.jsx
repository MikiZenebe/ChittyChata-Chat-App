import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { animationDefaultOption } from "@/lib/utils";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import Lottie from "react-lottie";

export default function NewDM() {
  const [openNewContactModal, setOpenNewContactModal] = useState(false);
  const [searchedContact, setSearchedContact] = useState([]);

  const searchContacts = async (searchTerm) => {};

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <FaPlus
              className="text-neutral-400 font-light text-opacity-90 text-start hover:text-neutral-300 cursor-pointer transition-all duration-300"
              onClick={() => setOpenNewContactModal(true)}
            />
          </TooltipTrigger>
          <TooltipContent className="btn border-none mb-2 p-3 text-white">
            Select New Contact
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <Dialog open={openNewContactModal} onOpenChange={setOpenNewContactModal}>
        <DialogContent className="backdrop-blur-sm bg-white backdrop-brightness-200 border-none text-[#1c1b1e] w-[400px] h-[400px] flex flex-col">
          <DialogHeader>
            <DialogTitle className="text-center">
              Please select a contact
            </DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>

          <div>
            <Input
              placeholder="Search by username"
              className="rounded-lg p-6 transition-all duration-300 ease-out outline-none focus:outline-none focus:ring-2 focus:ring-[#4AD1F9] focus:border-transparent"
              onChange={(e) => searchContacts(e.target.value)}
            />
          </div>

          {searchedContact.length <= 0 && (
            <div className="flex-1 md:bg-white md:flex mt-5 flex-col justify-center items-center duration-1000 transition-all rounded-md my-2">
              <Lottie
                isClickToPauseDisabled={true}
                height={100}
                width={100}
                options={animationDefaultOption}
              />

              <div className="text-opacity-80 text-[#1b1c24] flex flex-col gap-5 items-center mt-5 lg:text-2xl text-xl transition-all duration-300 text-center font-semibold">
                <h3>
                  Hi<span className="txt">!</span> Search new{" "}
                  <span className="txt">Contact</span>.
                </h3>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
