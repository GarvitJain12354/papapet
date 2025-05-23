"use client";
import { Consultdr, cardData } from "@/db/Card";
import { Divider, Slider } from "@mui/material";
import { Button, DatePicker, Modal } from "antd";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";
import { DesktopTimePicker } from "@mui/x-date-pickers/DesktopTimePicker";
import { StaticTimePicker } from "@mui/x-date-pickers/StaticTimePicker";
import { useDispatch } from "react-redux";
import { bookConsultation } from "@/store/Action/auth";
import { useRouter } from "next/navigation";
const Consultdr1 = ({ doctor, imgLink, percentage }) => {
  const [time, settime] = useState("");
  const [date, setdate] = useState("");
  const [open, setOpen] = useState(false);
const router = useRouter();
  const [detail, setdetail] = useState("");
  const showModal = (dets) => {
    setOpen(true);
    setdetail(dets);
  };
  const handleOk = () => {
    setOpen(false);
  };
  const handleCancel = () => {
    setOpen(false);
  };
  // const handleTime = (e) => {
  //   console.log(e.$H,e.$m,e, 796);
  // };
  const handleTime = (e) => {
    const formattedTime = e.format("hh:mm A");
    console.log(formattedTime, 796);
    settime(formattedTime);
  };
  const handleDate = (e) => {
    // console.log(e.$D,e.$M + 1,e.$y,e, 796);
    const t = e.format("DD-MM-YYYY");
    setdate(t);
  };

  
  const dispatch = useDispatch();
  const Onsubmit = (id, fees) => {
    const info = {
      time,
      date,
      fees:
        detail?.premium === 0
          ? Math.round(Number(detail?.fees) + (percentage / 100) * detail?.fees)
          : Number(detail?.fees) + Number(detail?.premium),
    };

    dispatch(bookConsultation(detail?._id, info));
    handleCancel();
  };
  const OnsubmitNow = (dets) => {
    const currentDate = new Date();
    const currentTime = currentDate.toLocaleTimeString();
    const formattedDate =
      currentDate.getDate().toString().padStart(2, "0") +
      "-" +
      (currentDate.getMonth() + 1).toString().padStart(2, "0") +
      "-" +
      currentDate.getFullYear();
    const formattedTime = currentDate.toLocaleString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    const info = {
      time: formattedTime,
      date: formattedDate,
      fees:
        dets?.premium === 0
          ? Math.round(Number(dets?.fees) + (percentage / 100) * dets?.fees)
          : Number(dets?.fees) + Number(dets?.premium),
    };

    dispatch(bookConsultation(dets?._id, info));
    // router.push("/mediensure/profile")
  };
  return (
    <>
      <div className="min-h-screen w-full  pt-20 pl-36 flex flex-col gap-3 max-md:pl-2">
        <div className="h-fit max-md:hidden w-fit flex gap-60 px-6 bg-white items-center justify-center rounded-xl border-gray-300 border-2">
          <input
            type="text"
            placeholder="Search by Doctor's name"
            className="input input-bordered rounded-xl w-full py-2 px-5"
          />
          <i className="ri-search-line"></i>
        </div>
        <div className="flex h-fit w-full gap-6 ">
          <div className=" w-[30%] rounded-lg  border-gray-300 border-2 max-md:hidden ">
            <div className="h-fit w-[100%] pt-6 pb-5 pl-10 gap-2 flex flex-col">
              <h1 className="text-base font-semibold">filter</h1>
              <h2 className="text-base font-semibold"> Avability</h2>
              <div className="h-20 w-full ">
                <div className="w-full flex gap-5 py-1">
                  <h1 className="bg-white px-4 rounded-xl text-xs py-1 border-gray-300 border-2">
                    NOW
                  </h1>
                  <h1 className="bg-white px-6 rounded-xl py-1 text-sm border-gray-300 border-2">
                    TODAY
                  </h1>
                </div>
                <div className="w-full  flex  gap-5 py-2">
                  <h1 className="bg-white px-6 py-1 rounded-xl text-sm border-gray-300 border-2">
                    TOMORROW
                  </h1>
                  <h1 className="bg-white px-4 py-1 rounded-xl text-sm border-gray-300 border-2">
                    All
                  </h1>
                </div>
              </div>
              <Divider
                style={{
                  borderBottomWidth: "2px",
                  marginTop: "12px",
                  marginRight: "17px",
                }}
              />
            </div>
            <div className="h-fit w-fit pl-10  gap-2 flex flex-col">
              <h1 className="text-base font-semibold">Gender</h1>
              <div className="h-fit w-fit flex items-center justify-center gap-5">
                <input type="radio" name="a" className="radio1" /> Male
                <input type="radio" name="a" className="radio2" /> Female
                <input type="radio" name="a" className="radio3" /> All
              </div>
              <Divider style={{ borderBottomWidth: "2px" }} />
            </div>

            <div className="h-fit w-full flex flex-col gap-2 px-10 py-2 ">
              <h1 className="text-base px-1 font-semibold">
                Experience (in Years)
              </h1>
              <div className="w-full">
                <Slider
                  className="w-full"
                  style={{ width: "100%" }}
                  size="small"
                  defaultValue={0}
                  aria-label="Small"
                  valueLabelDisplay="auto"
                />
                <Divider style={{ borderBottomWidth: "2px" }} />
              </div>
            </div>

            <div className="h-fit w-full flex flex-col gap-2 px-10 py-2 ">
              <h1 className="text-base px-1 font-semibold">
                Consultation Fee (in Rupees){" "}
              </h1>
              <div className="w-full">
                <Slider
                  className="w-full"
                  style={{ width: "100%" }}
                  size="small"
                  defaultValue={0}
                  aria-label="Small"
                  valueLabelDisplay="auto"
                />
                <Divider style={{ borderBottomWidth: "2px" }} />
              </div>
            </div>
          </div>
          <div className=" pb-10 flex flex-col gap-5 w-[45%]  max-md:w-full max-md:p-4 ">
            {doctor?.map((dets, index) =>
              dets?.isVerified === true ? (
                <div
                  key={index}
                  className="h-fit w-[40vw] rounded-lg  flex border-gray-300 border-2 max-md:w-full max-md:flex-col"
                >
                  <div className="h-fit w-[40%] shrink-0 py-5 px-5 max-md:pb-0 ">
                    <img
                      className="h-48 w-full object-contain shrink-0"
                      src={`${imgLink}/${dets?.img?.filename}/${dets?.img?.mimetype}`}
                      alt=""
                    />
                  </div>

                  <div className="h-fit w-full py-4  max-md:py-0 max-md:p-4">
                    <h1 className="text-sm font-semibold">{dets?.firstname} {dets?.lastname}</h1>
                    <h2 className="text-xs">  {dets?.type?.map((d, i) => (
                          <>{d} ,</>
                        ))}</h2>
                    <h2 className=" px-2 mt-4 py-1 bg-blue-200 w-fit text-xs rounded-xl">
                      {dets?.experience} year experience
                    </h2>
                    <div className="h-fit w-fit flex gap-5 py-2 ">
                      <h1 className="text-xs font-semibold">
                        {dets?.language?.map((d, i) => (
                          <>{d}, &nbsp;</>
                        ))}
                      </h1>
                      <h2
                        onClick={() => showModal(dets)}
                        className=" px-5 mt-4 py-2 bg-blue-400 text-white w-fit font-semibold text-xs rounded-lg"
                      >
                        {" "}
                        Schedule Consultation
                      </h2>
                    </div>

                    <Divider
                      style={{ borderBottomWidth: "2px", marginTop: "8px" }}
                    />

                    <div className="h-fit w-fit flex gap-24 items-center justify-center py-2 ">
                      <h1 className="text-xl font-semibold">
                        Rs.{" "}
                        {dets?.premium === 0
                          ? Math.round(
                              Number(dets?.fees) +
                                (percentage / 100) * dets?.fees
                            )
                          : Number(dets?.fees) + Number(dets?.premium)}
                      </h1>
                      <h2
                        className=" px-10 mt-4 py-2  text-white w-fit  font-semibold text-xs rounded-lg"
                        style={{ backgroundColor: "rgb(51 164 32)" }}
                        onClick={()=>OnsubmitNow(dets)}
                      >
                        {" "}
                        Consult Now
                      </h2>
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )
            )}
          </div>
        </div>
        <button
          class="ml-96 rounded-xl mb-16 w-fit  px-52 py-2 text-white font-medium  "
          style={{ backgroundColor: "#8da473" }}
        >
          See More
        </button>
      </div>
      <Modal
        open={open}
        title="Title"
        onOk={handleOk}
        centered
        onCancel={handleCancel}
        footer={(_, { OkBtn, CancelBtn }) => (
          <>
            <Button type="primary" className="bg-blue-500" onClick={Onsubmit}>
              Submit
            </Button>
            {/* <CancelBtn />
            <OkBtn /> */}
          </>
        )}
      >
        <div className="flex flex-col gap-5">
          <div className="flex flex-col">
            <h3>Select time for consultation </h3>
            <DatePicker onChange={(e) => handleDate(e)} className="w-fit" />
          </div>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["MobileTimePicker"]}>
              <DemoItem label="Select Time">
                <MobileTimePicker
                  value={time}
                  onChange={(e) => handleTime(e)}
                />
              </DemoItem>
            </DemoContainer>
          </LocalizationProvider>
        </div>
      </Modal>
    </>
  );
};

export default Consultdr1;
