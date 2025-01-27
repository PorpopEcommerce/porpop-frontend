import Section from "@/components/dashboard/Section";
import Image from "next/image";
import Badge from "../Badge";
import { IconType } from "react-icons";
import { HiIdentification } from "react-icons/hi";
import { MdLocationOn, MdMail, MdPhoneAndroid } from "react-icons/md";
import { TbClockCheck, TbShoppingCartCheck } from "react-icons/tb";

export default function Profile() {
  return (
    <Section noPaddingX>
      <div className="space-y-6">
        <div className="-mt-4 relative pt-[32.5px]">
          <Image
            src="/Images/dashboard/customers/profileBg.png"
            height={150}
            width={150}
            alt="profile"
            className="w-full absolute top-0 left-0 z-0"
          />
          <div className="flex flex-col gap-2 items-center relative z-10">
            <Image
              src="/Images/dashboard/customers/profile.png"
              height={150}
              width={150}
              alt="profile"
              className="rounded-full"
            />
            <p className="text-white text-base font-semibold">Jass Blair</p>
            <Badge variant="active" />
          </div>
        </div>

        <hr className="mx-4 border-dark-400" />

        <div className="space-y-4 px-4">
          <Details
            title="Customer ID"
            body="ID0220304"
            Icon={HiIdentification}
          />
          <Details title="Email" body="lindablair@gmail.com" Icon={MdMail} />
          <Details
            title="Address"
            body="2843 Bel Meadow Drive, Fontana, California 92335, USA"
            Icon={MdLocationOn}
          />
          <Details
            title="Phone Number"
            body="0504248778"
            Icon={MdPhoneAndroid}
          />
          <Details
            title="Last Transaction"
            body="22 December 2022"
            Icon={TbShoppingCartCheck}
          />
          <Details title="Last Online" body="2 Days Ago" Icon={TbClockCheck} />
        </div>
      </div>
    </Section>
  );
}

function Details({
  title,
  body,
  Icon,
}: {
  title: string;
  body: string;
  Icon: IconType;
}) {
  return (
    <div className="relative z-10">
      <div className="flex items-start gap-2">
        <div className="p-2 rounded-full bg-dark-400">
          <Icon className="text-xl" />
        </div>
        <div className="space-y-2">
          <p className="text-sm text-grey-200">{title}</p>
          <p className="text-white">{body}</p>
        </div>
      </div>
    </div>
  );
}
