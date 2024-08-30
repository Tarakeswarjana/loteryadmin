import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useLocation, useNavigate } from "react-router-dom";

// import Select from 'react-select';
import {
    addCategory,
    addLiveUrl,
    deleteCategory,
    fetchAllLiveUrl,
    getAllTime,
    viewAllCategory,
} from "../../Utils/AllApiCals";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import Loader from "../../Loader/Loader";



function LiveUrl() {
    const location = useLocation()
    console.log(location, "lurllllllllll")

    const [liveurl, setLiveurl] = useState("");
    const [drawobject, setdrawObject] = useState(null);
    const [gtime, setGtime] = useState(null);
    const [gname, setGname] = useState(null);


    const [categorydata, setCategoryData] = useState([]);
    const [isLoading, setisLoading] = useState(true);
    const [allTime, setAllTime] = useState([]);
    const [lurl, setlurl] = useState("")
    const navigate = useNavigate();

    //table row and collumn
    const columns = [
        {
            name: "Id",
            selector: (row) => row.sl,
        },

        {
            name: "Game_date",
            selector: (row) => row.game_date,
        },
        {
            name: "Game_name",
            selector: (row) => row.game_name,
        },
        {
            name: "Result_value",
            selector: (row) => row.result_value,
        },

        {
            name: "First Digit",
            selector: (row) => row.first_digit,
        },
        {
            name: "Second Digit",
            selector: (row) => row.second_digit,
        },

        {
            name: "Action",
            selector: (row) => {
                console.log("noon", row)
                return (
                    <div className="w-[400px] overflow-scroll">
                        <button
                            onClick={() => {
                                handleDelete(row.id);
                            }}
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                        >
                            Delete
                        </button>
                        <button
                            onClick={(e) => {
                                navigate(`/frontendView/${row.game_name}`, { state: { row } });
                                // handleEdit(row.sl)
                                // console.log("RowData:", row);
                            }}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 ml-1 rounded"
                        >
                            view
                        </button>
                    </div>
                );
            },
        },
    ];

    const fetcallDrawTime = async () => {
        try {
            let res = await getAllTime()
            if (res && res.status) {
                setAllTime(res.data)
            }
            console.log("timess", res);
        } catch (error) {
            console.log("errorrrrr", error);
        }
    };

    function isDateInFuture(dateString) {
        const [day, month, year] = dateString.split('-').map(Number);
        const inputDate = new Date(year, month - 1, day);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        inputDate.setHours(0, 0, 0, 0);
        return inputDate == today;
    }



    //ValidationFunction

    const handleValidation = () => {
        if (!liveurl) {
            toast.error("Enter LiveUrl");
            return false;
        }
        if (!gtime) {
            toast.error("Enter DrawTime");
            return false;
        }
        if (!gname) {
            toast.error("Enter DrawName");
            return false;
        }



        return true;
    };

    function getRandomDateIn2022() {
        // Start and end dates for 2022
        const startOf2022 = new Date("2022-01-01T00:00:00Z");
        const endOf2022 = new Date("2022-12-31T23:59:59Z");

        // Generate a random timestamp within the range
        const randomTimestamp =
            startOf2022.getTime() +
            Math.random() * (endOf2022.getTime() - startOf2022.getTime());

        // Create a new Date object with the random timestamp
        return new Date(randomTimestamp);
    }

    function getCurrentDateFormatted() {
        // Get the current date
        // const now = new Date();
        const now = getRandomDateIn2022();

        // Extract day, month, and year
        const day = String(now.getDate()).padStart(2, "0");
        const month = String(now.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
        const year = now.getFullYear();

        // Format the date as 'dd-mm-yyyy'
        const formattedDate = `${day}-${month}-${year}`;
        console.log(formattedDate, "iii");
        return formattedDate;
    }

    const handleSubmit = async () => {
        const currentDate = getCurrentDateFormatted();
        // if (!handleValidation()) return;
        let Gname = allTime.filter((ele, id) => ele.game_name === location.state.row.game_name)
        console.log(isDateInFuture(location.state.row.game_date), "6666666")


        try {
            const senddata = {
                gname: Gname[0].game_name,
                gdate: Gname[0].game_time,
                liveurl: liveurl
            }

            let res = await addLiveUrl(senddata);
            if (res) {
                toast.success("Data Added sucsessfully");
                setLiveurl("")
                fetchAllCategory();
            } else {
                if (res === 3) {
                    toast.error("Data Already Exist");
                }
            }
        } catch (err) {
            console.log(err);
        }
    };

    const handleDelete = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                (async () => {
                    let res = await deleteCategory(id);
                    if (res && res.status) {
                        fetchAllCategory();
                        toast.success(res.message);
                    }
                })();
            } else {
            }
        });
    };

    const fetchAllCategory = async () => {

        try {
            setisLoading(true);
            const res = await fetchAllLiveUrl("Morning");

            if (res) {

                console.log(res.data, "resss")
                const newArr = res?.data?.map((ele, id) => {
                    console.log("ele", ele)
                    return {
                        sl: id + 1,
                        game_date: ele?.game_date,
                        game_name: ele?.game_name,
                        result_value: ele?.result_value,

                    };
                });
                setCategoryData(newArr);
                setisLoading(false);
            } else {
                setisLoading(false);
            }
        } catch (err) {
            setisLoading(false);
            console.log(err);
        }
    };


    useEffect(() => {
        fetchAllCategory();
        fetcallDrawTime()
    }, []);



    return (
        <>
            {isLoading && <Loader />}
            <section className="mt-4">
                <div className="border-b-4 border-solid border-indigo-500 ">

                    {/* <form class="flex justify-between items-center gap-1 w-800 mx-auto p-1 border border-gray-300 rounded-lg shadow-md">
                        <div className="flex gap-4"> */}
                    {/* 
                            <label className="flex flex-col w-40 font-semibold text-gray-800">
                                Game Time
                                <select
                                    onChange={(e) => {


                                        setGtime(e.target.value);
                                    }}
                                >
                                    <option value="">--Select--</option>
                                    {allTime.map((ele, id) => (
                                        <option key={id} value={ele.game_time}>{ele.game_time}</option>
                                    ))}
                                </select>
                            </label> */}
                    {/* <label className="flex flex-col w-40 font-semibold text-gray-800">
                                Game Name
                                <select
                                    onChange={(e) => {


                                        setGname(e.target.value);
                                    }}
                                >
                                    <option value="">--Select--</option>
                                    {allTime.map((ele, id) => (
                                        <option key={id} value={ele.game_name}>{ele.game_name}</option>
                                    ))}
                                </select>
                            </label> */}

                    {/* <label class="flex flex-col w-40 font-semibold text-gray-800">
                                Live Url:
                                <input
                                    onChange={(e) => { setLiveurl(e.target.value) }}
                                    type="text"
                                    class="mt-1 p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none"
                                />
                            </label>
                            <button onClick={(e) => { e.preventDefault(); handleSubmit() }}>Submit</button>
                        </div> */}

                    {/* </form> */}


                    <form class="bg-white p-6 rounded-lg shadow-md  mx-auto">
                        <label class="block mb-4">
                            <span class="text-gray-700 font-semibold">Live URL:</span>
                            <input
                                disabled={!isDateInFuture(location.state.row.game_date)}
                                onChange={(e) => setLiveurl(e.target.value)}
                                type="text"
                                class="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:outline-none transition duration-200 ease-in-out"
                                placeholder="Enter live URL"
                            />
                        </label>
                        <button
                            onClick={(e) => { e.preventDefault(); handleSubmit() }}
                            class="w-[100px] bg-blue-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200 ease-in-out"
                        >
                            Submit
                        </button>
                    </form>


                    <DataTable
                        columns={columns}
                        data={categorydata}
                        pagination
                    />
                </div>

            </section>
        </>
    );
}

export default LiveUrl;
