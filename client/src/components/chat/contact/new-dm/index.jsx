import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { apiClient } from "@/lib/api-client";
import { animationDefaultOption, getColor } from "@/lib/utils";
import { HOST, SEARCH_CONTACTS_ROUTES } from "@/utils/constants";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import Lottie from "react-lottie";

export default function NewDM() {
  const [openNewContactModal, setOpenNewContactModal] = useState(false);
  const [searchedContact, setSearchedContact] = useState([]);

  const searchContacts = async (searchTerm) => {
    try {
      if (searchTerm.length > 0) {
        const res = await apiClient.post(
          SEARCH_CONTACTS_ROUTES,
          { searchTerm },
          { withCredentials: true }
        );

        if (res.status === 200 && res.data.contacts) {
          setSearchedContact(res.data.contacts);
        }
      } else {
        setSearchedContact([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

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

          <ScrollArea className="h-[250px]">
            <div className="flex flex-col gap-5">
              {searchedContact.map((contact) => {
                return (
                  <div
                    key={contact._id}
                    className="flex gap-3 items-center cursor-pointer"
                  >
                    <div className="w-10 h-10 relative ">
                      <Avatar className="w-10 h-10  object-cover rounded-full overflow-hidden transition-all duration-300 ease-out">
                        {contact.image ? (
                          <AvatarImage
                            src={`${HOST}/${contact.image}`}
                            alt="profile"
                            className="object-cover w-full h-full"
                          />
                        ) : (
                          <div
                            className={`uppercase h-10 w-10 text-lg border-[1px] flex items-center justify-center rounded-full ${getColor(
                              contact.color
                            )}`}
                          >
                            {contact.firstName
                              ? contact.firstName.split("").shift()
                              : contact.email.split("").shift()}
                            <span></span>
                          </div>
                        )}
                      </Avatar>
                    </div>
                    <div className="flex flex-col">
                      <span>
                        {contact.firstName && contact.lastName
                          ? `${contact.firstName} ${contact.lastName}`
                          : contact.email}{" "}
                        <span className="text-xs text-slate-400">
                          @{contact.username}
                        </span>
                      </span>
                      <span className="text-xs">{contact.email}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollArea>

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
