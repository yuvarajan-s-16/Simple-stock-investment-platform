/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from "react";
import { AssetTable } from "./AssetTable";
import { Button } from "@/components/ui/button";
import StockChart from "../StockDetails/StockChart";
import {
  ChatBubbleIcon,
  ChevronLeftIcon,
  Cross1Icon,
  DotIcon,
} from "@radix-ui/react-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCoinDetails,
  fetchCoinList,
  fetchTreadingCoinList,
  getTop50CoinList,
} from "@/Redux/Coin/Action";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
} from "@/components/ui/pagination";
import { MessageCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { sendMessage } from "@/Redux/Chat/Action";
import { ScrollArea } from "@/components/ui/scroll-area";
import SpinnerBackdrop from "@/components/custome/SpinnerBackdrop";

const Home = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState("all");
  const { coin, chatBot, auth } = useSelector((store) => store);
  const [isBotRelease, setIsBotRelease] = useState(false); //

  useEffect(() => {
    dispatch(fetchCoinList(page));
  }, [page]);

  useEffect(() => {
    dispatch(fetchCoinDetails({
      coinId: "bitcoin",
      jwt: auth.jwt || localStorage.getItem("jwt"),
    }))
    
  }, []);

  useEffect(() => {
    if (category == "top50") {
      dispatch(getTop50CoinList());
    }else if( category == "trading"){
      dispatch(fetchTreadingCoinList())
    }
  }, [category]);

  const handlePageChange = (page) => {
    setPage(page);
  };

  const handleBotRelease = () => setIsBotRelease(!isBotRelease);

  const [inputValue, setInputValue] = useState("");

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      console.log("Enter key pressed:", inputValue);
      dispatch(
        sendMessage({
          prompt: inputValue,
          jwt: auth.jwt || localStorage.getItem("jwt"),
        })
      );
      setInputValue("");
    }
  };

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatBot.messages]);

  

  if (coin.loading) {
    return <SpinnerBackdrop />;
  }

  return (
    <div className="relative">
      <div className="lg:flex ">
        <div className="lg:w-[50%] border-r">
          <div className="p-3 flex items-center gap-4 ">
            <Button
              variant={category == "all" ? "default" : "outline"}
              onClick={() => setCategory("all")}
              className="rounded-full"
            >
              All
            </Button>
            <Button
              variant={category == "top50" ? "default" : "outline"}
              onClick={() => setCategory("top50")}
              className="rounded-full"
            >
              Top 50
            </Button>
            
           
          </div>
          <AssetTable
            category={category}
            coins={category == "all" ? coin.coinList : coin.top50}
          />
          {category == "all" && (
            <Pagination className="border-t py-3">
              <PaginationContent>
                <PaginationItem>
                  <Button
                    variant="ghost"
                    disabled={page == 1}
                    onClick={() => handlePageChange(page - 1)}
                  >
                    <ChevronLeftIcon className="h-4 w-4 mr-1" />
                    Previous
                  </Button>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink
                    onClick={() => handlePageChange(1)}
                    isActive={page == 1}
                  >
                    1
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink
                    onClick={() => handlePageChange(2)}
                    isActive={page == 2}
                  >
                    2
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink
                    onClick={() => handlePageChange(3)}
                    isActive={page == 3}
                  >
                    3
                  </PaginationLink>
                </PaginationItem>
                {page > 3 && (
                  <PaginationItem>
                    <PaginationLink
                      onClick={() => handlePageChange(3)}
                      isActive
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                )}
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext
                    className="cursor-pointer"
                    onClick={() => handlePageChange(page + 1)}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </div>

        <div className="hidden lg:block lg:w-[50%] p-5">
          <StockChart coinId={"bitcoin"} />
          <div className="flex gap-5 items-center">
            <div>
              <Avatar>
                <AvatarImage src={coin.coinDetails?.image?.large} />
              </Avatar>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <p>{coin.coinDetails?.symbol?.toUpperCase()}</p>
                <DotIcon className="text-gray-400" />
                <p className="text-gray-400">{coin.coinDetails?.name}</p>
              </div>
              <div className="flex items-end gap-2">
                <p className="text-xl font-bold">
                  {coin.coinDetails?.market_data.current_price.usd}
                </p>
                <p
                  className={`${
                    coin.coinDetails?.market_data.market_cap_change_24h < 0
                      ? "text-red-600"
                      : "text-green-600"
                  }`}
                >
                  <span className="">
                    {coin.coinDetails?.market_data.market_cap_change_24h}
                  </span>
                  <span>
                    (
                    {
                      coin.coinDetails?.market_data
                        .market_cap_change_percentage_24h
                    }
                    %)
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="absolute bottom-5 right-5 z-40 flex flex-col justify-end items-end gap-2">
        {isBotRelease && (
          <div className="rounded-md w-[20rem]  md:w-[25rem] lg:w-[25rem] h-[70vh] bg-slate-900">
            <div className="flex justify-between items-center border-b px-6 h-[12%]">
              <p>Chat Bot</p>
              <Button onClick={handleBotRelease} size="icon" variant="ghost">
                <Cross1Icon />
              </Button>
            </div>

            <div className="h-[76%]  flex flex-col overflow-y-auto  gap-5 px-5 py-2 scroll-container">
            <div
                 
                  
                  className={`${ "self-start"
                  } pb-5 w-auto`}
                >
                  <div className="justify-end self-end px-5 py-2 rounded-md bg-slate-800 w-auto">
                      {`hi, ${auth.user?.fullName}`}
                      <p>you can ask crypto related any question</p>
                      <p>like, price, market cap extra...</p>
                    </div>
                  
                </div>
              {chatBot.messages.map((item, index) => (
                <div
                  ref={chatContainerRef}
                  key={index}
                  className={`${
                    item.role == "user" ? "self-end" : "self-start"
                  } pb-5 w-auto`}
                >
                 
                  {item.role == "user" ? (
                    <div className="justify-end self-end px-5 py-2 rounded-full bg-slate-800 w-auto">
                      {item.prompt}
                    </div>
                  ) : (
                    <div className="w-full">
                      <div className="bg-slate-700 flex gap-2 py-4 px-4 rounded-md min-w-[15rem] w-full">
                        <p className="">{item.ans}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
              {chatBot.loading && <p>fetchin data...</p>}
            </div>

            <div className="h-[12%] border-t">
              <Input
                className="w-full h-full border-none outline-none"
                placeholder="write prompt"
                onChange={handleChange}
                value={inputValue}
                onKeyPress={handleKeyPress}
              />
            </div>
          </div>
        )}
        <div
          onClick={handleBotRelease}
          className="relative w-[10rem] cursor-pointer group"
        >
          <Button  className="w-full h-[3rem] gap-2 items-center">
            
            <MessageCircle
            fill=""
            className="fill-[#1e293b] -rotate-[90deg] stroke-none group-hover:fill-[#1a1a1a] "
            size={30}
          />
          
          <span className=" text-2xl">
            Chat Bot
          </span>
          </Button>
          
        </div>
      </section>
    </div>
  );
};

export default Home;
