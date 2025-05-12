/* eslint-disable no-unused-vars */
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { invoices } from "../Home/AssetTable";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserAssets } from "@/Redux/Assets/Action";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { getAllOrdersForUser } from "@/Redux/Order/Action";
import { calculateProfite } from "@/Util/calculateProfite";
import { readableDate } from "@/Util/readableDate";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { searchCoin } from "@/Redux/Coin/Action";
import { useNavigate } from "react-router-dom";
import SpinnerBackdrop from "@/components/custome/SpinnerBackdrop";

const SearchCoin = () => {
  const dispatch = useDispatch();
  const { asset, order,coin } = useSelector((store) => store);
  const [keyword, setKeyword] = useState("keyword");
  const navigate=useNavigate()

  const handleSearchCoin = () => {
    dispatch(searchCoin(keyword));
  };

  if(coin.loading){
    return <SpinnerBackdrop/>
  }

  return (
    <div className="p-10 lg:p=[50%]">
      <div className="flex items-center justify-center pb-16">
        <Input
          className="p-5 w-[90%] lg:w-[50%] rounded-r-none"
          placeholder="explore market..."
          onChange={(e) => setKeyword(e.target.value)}
        />
        <Button onClick={handleSearchCoin} className="p-5 rounded-l-none">
          <SearchIcon />
        </Button>
      </div>
      <Table className="px-5  relative">
        <TableHeader className="py-9">
          <TableRow className="sticky top-0 left-0 right-0 bg-background ">
            <TableHead className="py-3">Market Cap Rank</TableHead>
            <TableHead>Treading Pair</TableHead>
         
            <TableHead className="text-right">SYMBOL</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody className="">
          {coin.searchCoinList?.map((item) => (
            <TableRow onClick={()=>navigate(`/market/${item.id}`)} key={item.id}>
              <TableCell>
               
                <p className="">
                  {item.market_cap_rank}
                </p>
              </TableCell>
              <TableCell className="font-medium flex items-center gap-2">
                <Avatar className="-z-50">
                  <AvatarImage
                    src={item.large}
                    alt={""}
                  />
                </Avatar>
                <span> {item.name}</span>
              </TableCell>

              <TableCell className="text-right">${item.symbol}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default SearchCoin;
